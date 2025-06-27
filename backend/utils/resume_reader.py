# utils/resume_reader.py

import fitz  # PyMuPDF

def read_resume_file(filename: str, content: bytes) -> str:
    if filename.endswith(".pdf"):
        with fitz.open("pdf", content) as doc:
            return "\\n".join([page.get_text() for page in doc])
    elif filename.endswith(".txt"):
        return content.decode("utf-8")
    else:
        return "Unsupported file format"