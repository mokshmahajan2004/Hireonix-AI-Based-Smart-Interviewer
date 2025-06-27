from transformers import pipeline
import subprocess
import os

pipe = pipeline("automatic-speech-recognition", model="openai/whisper-base", framework="pt")

def transcribe_audio(file_path: str) -> str:
    wav_path = file_path.replace(".webm", ".wav")
    command = [
        "ffmpeg", "-y", "-i", file_path,
        "-ar", "16000", "-ac", "1", "-f", "wav", wav_path
    ]
    try:
        completed = subprocess.run(command, capture_output=True, check=True)
        print("✅ FFmpeg Output:", completed.stdout.decode())
    except subprocess.CalledProcessError as e:
        print("❌ FFmpeg STDERR:", e.stderr.decode())
        raise RuntimeError(f"FFmpeg failed: {e.stderr.decode()}")

    result = pipe(wav_path)
    os.remove(wav_path)
    return result["text"]