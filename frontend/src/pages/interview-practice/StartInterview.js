import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const [timer, setTimer] = useState(60);
  const [isRecording, setIsRecording] = useState(false);

  const audioBlobRef = useRef(null);

  useEffect(() => {
    const storedQuestions =
      JSON.parse(localStorage.getItem("interviewQuestions")) || [];
    setQuestions(storedQuestions);
    console.log("✅ Loaded questions:", storedQuestions);
  }, []);

  const goToNextQuestion = useCallback(
    (updatedResponses) => {
      if (currentIndex < questions.length - 1) {
        setResponses(updatedResponses);
        setCurrentIndex(currentIndex + 1);
        setTimer(60);
        console.log("➡️ Moving to question:", currentIndex + 2);
      } else {
        localStorage.setItem(
          "interviewResponses",
          JSON.stringify(updatedResponses)
        );
        console.log("✅ Interview complete. Redirecting to summary.");
        navigate("/summary");
      }
    },
    [currentIndex, navigate, questions.length]
  );

  const handleSkip = useCallback(() => {
    console.log("⏭️ Skipped question:", questions[currentIndex]);
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
    goToNextQuestion(updatedResponses);
  }, [currentIndex, questions, responses, goToNextQuestion]);

  useEffect(() => {
    if (questions.length === 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          handleSkip();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentIndex, questions, handleSkip]);

  const handleRecordingStop = async (blob) => {
    console.log("🎙️ Recording stopped. Sending blob to backend...");
    console.log("📦 Blob size (bytes):", blob.size);

    const formData = new FormData();
    formData.append("file", blob, "recording.webm");

    try {
      const transcriptRes = await axios.post(
        "http://localhost:8000/transcribe-audio",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const transcription = transcriptRes.data.transcription;
      console.log("✅ Transcription received:", transcription);

      const evalRes = await axios.post("http://localhost:8000/evaluate/", {
        question: questions[currentIndex],
        answer: transcription,
      });

      const feedback = evalRes.data.feedback;
      console.log("✅ Evaluation feedback:", feedback);

      const updatedResponses = [
        ...responses,
        {
          question: questions[currentIndex],
          status: "answered",
          answer: transcription,
          feedback: feedback,
          score: extractScore(feedback),
        },
      ];

      setResponses(updatedResponses);
      goToNextQuestion(updatedResponses);
    } catch (error) {
      console.error("❌ Transcription or evaluation failed:", error);
    }
  };

  const extractScore = (feedback) => {
    const match = feedback.match(/Score: (\d+)/i);
    return match ? parseInt(match[1]) : null;
  };

  const playQuestionTTS = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/text-to-speech",
        { text: questions[currentIndex] },
        { responseType: "blob" }
      );
      const audioUrl = URL.createObjectURL(new Blob([res.data]));
      const audio = new Audio(audioUrl);
      audio.play();
      console.log("🔊 Playing TTS audio...");
    } catch (err) {
      console.error("❌ Failed to generate TTS:", err);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-white flex justify-center items-center min-h-screen text-xl">
        Loading interview questions...
      </div>
    );
  }

  return (
    <ReactMediaRecorder
      audio
      blobPropertyBag={{ type: "audio/webm" }}
      onStop={(blobUrl, blob) => {
        audioBlobRef.current = blob;
        handleRecordingStop(blob);
      }}
      render={({ startRecording, stopRecording }) => (
        <div className="min-h-screen bg-[#020617] px-4 py-12 md:px-10 text-white">
          <div className="max-w-6xl mx-auto bg-[#020617] p-8 md:p-12 rounded-3xl border border-[#334155] shadow-[0_0_25px_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-400 mb-4">
              🎤 Mock Interview Session
            </h2>
            <p className="text-center text-gray-300 mb-10 text-sm md:text-base">
              You will be{" "}
              <span className="text-yellow-400 font-semibold">
                recorded live
              </span>
              . Speak confidently within the 60-second timer.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Webcam */}
              <div className="bg-black border border-gray-700 rounded-2xl overflow-hidden shadow-lg h-[400px] w-full">
                <Webcam
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: 400,
                    height: 300,
                    facingMode: "user",
                  }}
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>

              {/* Question Box */}
              <div className="bg-[#0f172a] border border-blue-800 rounded-2xl p-6 md:p-8 shadow-lg h-[400px] flex flex-col justify-between w-full">
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    Question {currentIndex + 1} of {questions.length}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-300">
                      {questions[currentIndex]}
                    </h3>
                    <button
                      onClick={playQuestionTTS}
                      className="text-lg bg-purple-600 px-3 py-1 rounded hover:bg-purple-700"
                    >
                      🔊
                    </button>
                  </div>

                  <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-yellow-400 transition-all duration-1000 ease-linear"
                      style={{ width: `${(timer / 60) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-yellow-300 text-right mb-4">
                    ⏱️ {timer}s remaining
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center mt-4 mb-2">
                  <button
                    onClick={() => {
                      if (!isRecording) {
                        startRecording();
                        setIsRecording(true);
                        console.log("🎬 Recording started...");
                      } else {
                        stopRecording();
                        setIsRecording(false);
                        console.log("⏹ Stopping recording...");
                      }
                    }}
                    className={`${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    } px-5 py-2 rounded-full text-white font-semibold`}
                  >
                    {isRecording ? "⏹ Stop & Transcribe" : "🎙 Start Recording"}
                  </button>

                  <button
                    onClick={handleSkip}
                    className="bg-gray-500 hover:bg-gray-600 px-5 py-2 rounded-full text-white font-semibold"
                  >
                    Skip ❌
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center text-sm text-gray-400 italic">
              💡 Tip: Answer naturally. Maintain eye contact, and speak clearly
              and confidently.
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default StartInterview;
