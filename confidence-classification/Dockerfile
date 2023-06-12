# Use an official Python runtime as a parent image
FROM python:3.10.9-bullseye

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

RUN apt-get update && apt-get install -y cmake
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y

# Install any needed packages specified in requirements.txt
RUN python -m pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
# ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]