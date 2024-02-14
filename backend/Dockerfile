FROM python:3.11
EXPOSE 8000
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
