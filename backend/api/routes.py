from fastapi import APIRouter
from services.interviewer import generate_questions
from services.evaluator import evaluate_answer
from api.schemas import CandidateProfile, QAInput
from fastapi import UploadFile, File
from utils.audio import transcribe_audio
from fastapi.responses import FileResponse
from utils.tts import generate_tts
from fastapi import Body
from services.report_generator import generate_report
from pydantic import BaseModel
import tempfile
import os
from services.ats import evaluate_resume, extract_skills
from utils.resume_reader import read_resume_file
from fastapi import Form
from firebase import save_profile_to_firestore
from services.pdf_uploader import convert_md_to_pdf, upload_pdf_to_firebase
from fastapi import UploadFile, File, Form
from fastapi import APIRouter, UploadFile, File
from utils.cloudinary import cloudinary
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/generate-questions/")
def get_questions(profile: CandidateProfile):
    questions = generate_questions(**profile.dict())
    return {"questions": questions.split("\n")}

@router.post("/evaluate/")
def get_evaluation(data: QAInput):
    feedback = evaluate_answer(data.question, data.answer)
    return {"feedback": feedback}

@router.post("/transcribe-audio")
async def transcribe_audio_route(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        contents = await file.read()
        tmp.write(contents)
        tmp_path = tmp.name

    print("✅ Received audio file:", tmp_path)
    print("✅ Size (bytes):", os.path.getsize(tmp_path))
    text = transcribe_audio(tmp_path)
    return {"transcription": text}




class TTSInput(BaseModel):
    text: str

@router.post("/text-to-speech")
def text_to_speech_endpoint(input: TTSInput):
    audio_path = generate_tts(input.text)
    return FileResponse(audio_path, media_type="audio/mpeg", filename="output.mp3")



@router.post("/generate-report")
def generate_report_endpoint(
    name: str = Body(...),
    email: str = Body(...),
    role: str = Body(...),
    skills: str = Body(...),
    experience: str = Body(...),
    achievements: str = Body(...),
    notes: str = Body(...),
    qa_feedback: list = Body(...)
):
    path = generate_report(name, email, role, skills, experience, achievements, notes, qa_feedback)
    return {"message": "Report generated", "path": path}

@router.post("/upload-report")
def upload_interview_report(name: str = Body(...)):
    md_path = "interview_report.md"
    pdf_path = f"{name.replace(' ', '_')}_Interview_Report.pdf"

    convert_md_to_pdf(md_path, pdf_path)
    public_url = upload_pdf_to_firebase(pdf_path)

    return {"message": "Report uploaded", "url": public_url}


@router.post("/ats-evaluate/")
async def ats_evaluate_endpoint(
    job_description: str = Form(...),
    resume_file: UploadFile = File(...)
):
    # Read uploaded file
    content = await resume_file.read()
    resume_text = read_resume_file(resume_file.filename, content)

    # Get AI evaluation
    evaluation_result = evaluate_resume(job_description, resume_text)

    return {
        "evaluation": evaluation_result
    }


@router.post("/save-profile/")
def save_profile(profile: CandidateProfile):
    profile_dict = profile.dict()
    success = save_profile_to_firestore(profile_dict)
    return {"success": success}


@router.post("/upload-profile")
async def upload_profile_image(file: UploadFile = File(...)):
    try:
        result = cloudinary.uploader.upload(file.file, folder="profile_images")
        return {"url": result["secure_url"]}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})