from fastapi import APIRouter
from services.interviewer import generate_questions
from services.evaluator import evaluate_answer
from api.schemas import CandidateProfile, QAInput

router = APIRouter()

@router.post("/generate-questions/")
def get_questions(profile: CandidateProfile):
    questions = generate_questions(**profile.dict())
    return {"questions": questions.split("\n")}

@router.post("/evaluate/")
def get_evaluation(data: QAInput):
    feedback = evaluate_answer(data.question, data.answer)
    return {"feedback": feedback}
