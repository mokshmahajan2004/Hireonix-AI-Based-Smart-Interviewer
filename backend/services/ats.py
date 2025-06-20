# services/ats.py
from models.openrouter_client import client

def evaluate_resume(job_description: str, resume_text: str) -> str:
    prompt = f"""
You are an aggressive, brutally honest ATS (Applicant Tracking System) resume evaluator.

Your job is to criticize this resume harshly and help the candidate improve.

Respond in beautifully formatted Markdown using:
- Bold section titles
- Emojis
- Bullet points
- Line spacing
- Professional tone with a direct voice

Respond with four clearly separated sections:
1. 🎯 Match Score
2. ❌ Missing or Weak Skills
3. 🧠 How to Improve
4. 📝 Summary

-- JOB DESCRIPTION --
{job_description}

-- RESUME --
{resume_text}
"""

    response = client.chat.completions.create(
        model="mistralai/mixtral-8x7b-instruct",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=1500,
    )
    return response.choices[0].message.content


def extract_skills(jd_text: str):
    import re

    # Expanded list of common skills
    common_skills = {
        "python", "java", "c++", "javascript", "typescript", "react", "node", "express",
        "html", "css", "sql", "postgresql", "mysql", "mongodb", "firebase",
        "fastapi", "flask", "django", "aws", "azure", "gcp", "docker", "kubernetes",
        "machine learning", "deep learning", "nlp", "pytorch", "tensorflow",
        "git", "github", "jira", "excel", "powerbi", "data analysis", "rest api", "graphql"
    }

    # Lowercase JD and tokenize
    jd_text = jd_text.lower()
    tokens = set(re.findall(r'\\b[a-zA-Z0-9\\+\\-\\.]+\\b', jd_text))

    # Match by exact or partial presence in tokens
    matched = []
    for skill in common_skills:
        # Split multi-word skills to ensure any part exists
        parts = skill.lower().split()
        if all(any(part in token for token in tokens) for part in parts):
            matched.append(skill)

    return matched


