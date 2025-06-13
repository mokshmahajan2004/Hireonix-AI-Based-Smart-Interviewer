from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as api_router


app = FastAPI()

# CORS (adjust for frontend origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "AI Interviewer Backend is running!"}
