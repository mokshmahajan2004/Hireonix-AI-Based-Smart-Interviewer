import pyttsx3
import tempfile
import os

def generate_tts(text):
    engine = pyttsx3.init()
    fd, path = tempfile.mkstemp(suffix=".wav")
    os.close(fd)  # Close the open file descriptor so pyttsx3 can write to it

    engine.save_to_file(text, path)
    engine.runAndWait()  # This blocks until audio is fully written

    return path
