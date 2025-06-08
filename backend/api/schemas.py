from pydantic import BaseModel

class CandidateProfile(BaseModel):
    name: str
    email: str
    role: str
    skills: str
    experience: str
    achievements: str
    notes: str

class QAInput(BaseModel):
    question: str
    answer: str
