import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactMediaRecorder } from "react-media-recorder";
import "../../index.css";

const StartInterview = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [phase, setPhase] = useState("prep");
  const [timer, setTimer] = useState(30);
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const startRecordingRef = useRef(null);
  const stopRecordingRef = useRef(null);
  const audioBlobRef = useRef(null);

  // ✅ Store start time once on load
  useEffect(() => {
    if (!localStorage.getItem("interviewStart")) {
      localStorage.setItem("interviewStart", Date.now().toString());
    }
  }, []);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("interviewQuestions")) || [];
    setQuestions(storedQuestions);
  }, []);

  useEffect(() => {
    if (questions.length === 0 || isEvaluating) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);

          if (phase === "prep") {
            setPhase("answer");
            setTimer(90);
            startRecordingRef.current?.();
            setIsRecording(true);
          } else if (phase === "answer") {
            stopRecordingRef.current?.();
            setIsRecording(false);
            setIsEvaluating(true);
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [phase, currentIndex, questions, isEvaluating]);

  const handleRecordingStop = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");

    try {
      const transcriptRes = await axios.post("http://localhost:8000/transcribe-audio", formData);
      const transcription = transcriptRes.data.transcription;

      const evalRes = await axios.post("http://localhost:8000/evaluate/", {
        question: questions[currentIndex],
        answer: transcription,
      });

      const feedback = evalRes.data.feedback;
      const updatedResponses = [
        ...responses,
        {
          question: questions[currentIndex],
          status: "answered",
          answer: transcription,
          feedback,
          score: extractScore(feedback),
        },
      ];

      if (currentIndex < questions.length - 1) {
        setResponses(updatedResponses);
        setCurrentIndex((prev) => prev + 1);
        setPhase("prep");
        setTimer(30);
        setIsEvaluating(false);
      } else {
        // ✅ Interview end time saved here
        localStorage.setItem("interviewEnd", Date.now().toString());
        localStorage.setItem("interviewResponses", JSON.stringify(updatedResponses));
        navigate("/summary");
      }
    } catch (error) {
      console.error("Evaluation error:", error);
      setIsEvaluating(false);
    }
  };

  const extractScore = (feedback) => {
    const match = feedback.match(/Score: (\d+)/i);
    return match ? parseInt(match[1]) : null;
  };

  const handleSkip = () => {
    const updatedResponses = [
      ...responses,
      {
        question: questions[currentIndex],
        status: "unanswered",
        answer: "",
        feedback: "",
        score: null,
      },
    ];

    if (currentIndex < questions.length - 1) {
      setResponses(updatedResponses);
      setCurrentIndex((prev) => prev + 1);
      setPhase("prep");
      setTimer(30);
    } else {
      // ✅ Interview end time saved here as well for skip case
      localStorage.setItem("interviewEnd", Date.now().toString());
      localStorage.setItem("interviewResponses", JSON.stringify(updatedResponses));
      navigate("/summary");
    }
  };

  const playQuestionTTS = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/text-to-speech",
        { text: questions[currentIndex] },
        { responseType: "blob" }
      );
      const audioUrl = URL.createObjectURL(new Blob([res.data]));
      new Audio(audioUrl).play();
    } catch (err) {
      console.error("TTS Error:", err);
    }
  };

  if (questions.length === 0) {
    return <div className="text-white text-center mt-20">Loading questions...</div>;
  }

  return (
    <ReactMediaRecorder
      audio
      blobPropertyBag={{ type: "audio/webm" }}
      onStop={(blobUrl, blob) => {
        audioBlobRef.current = blob;
        handleRecordingStop(blob);
      }}
      render={({ startRecording, stopRecording }) => {
        startRecordingRef.current = startRecording;
        stopRecordingRef.current = stopRecording;

        return (
          <div className="min-h-screen bg-[#020617] text-white px-4 py-10 md:px-10">
            <div className="max-w-6xl mx-auto bg-[#0f172a] border border-[#334155] p-8 md:p-12 rounded-2xl shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-6">
                🎤 Mock Interview Session
              </h2>

              <div className="text-center mb-2 text-sm text-cyan-400 uppercase">
                {phase === "prep" ? "🟡 Preparation Phase" : "🔴 Answering Phase"}
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="h-[400px] bg-black border border-gray-700 rounded-2xl overflow-hidden">
                  <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                    videoConstraints={{ width: 400, height: 300, facingMode: "user" }}
                  />
                </div>

                <div className="flex flex-col justify-between h-[400px] bg-[#0f1c2f] border border-blue-800 rounded-2xl p-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Question {currentIndex + 1} of {questions.length}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-blue-300">
                        {questions[currentIndex]}
                      </h3>
                      <button
                        onClick={playQuestionTTS}
                        className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
                      >
                        🔊
                      </button>
                    </div>

                    <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
                      <div
                        className="absolute top-0 left-0 h-full bg-yellow-400"
                        style={{ width: `${(timer / (phase === "prep" ? 30 : 90)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-yellow-300 text-right">
                      ⏱ {timer}s remaining
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 mt-6">
  {phase === "prep" && (
    <button
      onClick={() => {
        setPhase("answer");
        setTimer(90);
        startRecordingRef.current?.();
        setIsRecording(true);
      }}
      className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-full text-white font-semibold"
    >
      ⏩ Skip Prep & Start Answering
    </button>
  )}

  {phase === "answer" && (
    <button
      onClick={() => {
        if (isRecording) {
          stopRecordingRef.current?.();
          setIsRecording(false);
          setTimer(0);
          setIsEvaluating(true);
        }
      }}
      disabled={!isRecording || isEvaluating}
      className={`px-5 py-2 rounded-full text-white font-semibold ${
        isRecording ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 cursor-not-allowed"
      }`}
    >
      {isEvaluating ? "⏳ Evaluating..." : "⏹ Stop & Submit"}
    </button>
  )}

  <button
    onClick={handleSkip}
    disabled={isEvaluating}
    className="bg-gray-500 hover:bg-gray-600 px-5 py-2 rounded-full text-white font-semibold"
  >
    Skip ❌
  </button>
</div>
                </div>
              </div>

              <p className="text-center text-sm text-gray-400 italic mt-10">
                💡 Tip: Answer naturally. Maintain eye contact and speak clearly and confidently.
              </p>
            </div>
          </div>
        );
      }}
    />
  );
};

export default StartInterview;