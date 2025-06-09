# backend/resume_screening/main.py
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from services.resume_analyzer import analyze_resume


app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(resume: UploadFile = File(...), job_description: str = Form(...)):
    result = await analyze_resume(resume, job_description)
    return result
