import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user',
};

function StartInterview() {
  const webcamRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 px-6 py-20 font-sans">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-2">
          🎤 Live AI Interview
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Your camera and microphone are active. Answer the questions naturally as if you're in a real interview.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Webcam
            audio={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-lg shadow-lg w-full md:w-1/2"
          />
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Question 1:
            </h3>
            <p className="text-gray-700 mb-4">
              Tell me about a time when you faced a challenge at work and how you handled it.
            </p>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition w-full">
              Submit Response
            </button>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          Tip: Look at the camera, speak clearly, and keep your answers structured.
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
