# Use the official Python 3.10 image
FROM python:3.10

# Set working directory inside the container
WORKDIR /app

# Copy the entire project
COPY . /app

# Ensure we are in the correct working directory
# WORKDIR /app/server

# Install dependencies (adjust path based on actual location)
RUN pip install --no-cache-dir -r /app/server/requirements.txt

# Expose the port
# EXPOSE 8000
ENV PORT 8000

# Run FastAPI
CMD exec uvicorn backend.main:app --host 0.0.0.0 --port ${PORT}