# backend/resume_api/services/resume_analyzer.py

import os
import pdfplumber
import docx
import io
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")
API_URL = "https://openrouter.ai/api/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://yourdomain.com",  # Replace with your site if required
    "X-Title": "ResumeScreening"  # Optional: name of your app
}

async def extract_text_from_pdf(file_bytes):
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        return "\n".join([page.extract_text() or "" for page in pdf.pages])

async def extract_text_from_docx(file_bytes):
    doc = docx.Document(io.BytesIO(file_bytes))
    return "\n".join([p.text for p in doc.paragraphs])

async def analyze_resume(resume_file, job_description):
    content = await resume_file.read()

    if resume_file.filename.endswith(".pdf"):
        resume_text = await extract_text_from_pdf(content)
    elif resume_file.filename.endswith(".docx"):
        resume_text = await extract_text_from_docx(content)
    else:
        return {"error": "Unsupported file format"}

    prompt = f"""
You are an expert ATS (Applicant Tracking System) evaluator.

Evaluate the following resume for the job description below.
Give an ATS match score (out of 100) and provide:
- Keyword match analysis
- Formatting suggestions
- Overall feedback to improve ATS friendliness.

--- Job Description ---
{job_description}

--- Resume ---
{resume_text}
"""

    payload = {
        "model": "mixtral-8x7b-32768",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        return {"result": result['choices'][0]['message']['content']}
    except requests.exceptions.HTTPError as e:
        return {"error": f"HTTP error: {str(e)} - {response.text}"}
    except Exception as e:
        return {"error": str(e)}
