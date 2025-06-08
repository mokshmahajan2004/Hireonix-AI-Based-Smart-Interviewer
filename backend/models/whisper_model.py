import whisper
import tempfile
import sounddevice as sd
import numpy as np
import scipy.io.wavfile

model = whisper.load_model("base")

def transcribe_audio():
    fs = 16000
    duration = 60
    recording = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='int16')
    sd.wait()
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
        scipy.io.wavfile.write(f.name, fs, recording)
        result = model.transcribe(f.name)
        return result["text"]
