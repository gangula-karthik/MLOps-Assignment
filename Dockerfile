# Use the official Python 3.10 image
FROM python:3.10

# Set working directory inside the container
WORKDIR /app

# Copy the entire project
COPY . /app

# Install dependencies (adjust path based on actual location)
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Change into the backend folder
WORKDIR /app/backend

# Expose the port
ENV PORT 8000

# Run FastAPI
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT}