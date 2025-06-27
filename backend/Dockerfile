# Use official lightweight Python image
FROM python:3.10-slim

# Set working directory in the container
WORKDIR /app

# Install required system packages
RUN apt-get update && apt-get install -y git ffmpeg && apt-get clean

# Set environment variables for writable model cache paths
ENV TRANSFORMERS_CACHE=/tmp/hf_cache
ENV TORCH_HOME=/tmp/torch_cache

# Copy all project files
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose port used by FastAPI
EXPOSE 7860

# Run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]