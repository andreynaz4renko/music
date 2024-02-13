# Используем базовый образ Python
FROM python:3.11

EXPOSE 8000

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем остальные файлы в контейнер
COPY . .

# Устанавливаем зависимости
RUN pip install -r requirements.txt

# Команда для запуска приложения
CMD ["python", "manage.py", "runserver"]
