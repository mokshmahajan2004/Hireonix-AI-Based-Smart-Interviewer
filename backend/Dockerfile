# Use official lightweight Python image
FROM python:3.10-slim

# Set working directory in the container
WORKDIR /app

# Copy all files from your repo into the container
COPY . .

# Upgrade pip and install required packages
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose the port FastAPI will use
EXPOSE 7860

# Run the FastAPI app using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
