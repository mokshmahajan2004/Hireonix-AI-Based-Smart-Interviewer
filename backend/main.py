from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as api_router

app = FastAPI()

# ✅ CORS configuration for both local and deployed frontend
origins = [
    "http://localhost:3000",
    "https://hireonix-ai-based-smart-interviewer-b5ylij7ym.vercel.app",
    "https://hireonix-ai-based-smart-i-git-0d0a5d-mokshmahajan2004s-projects.vercel.app/"
    "https://hireonix-ai-based-smart-interviewer.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # 🔒 Only these 2 origins are allowed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "AI Interviewer Backend is running!"}
