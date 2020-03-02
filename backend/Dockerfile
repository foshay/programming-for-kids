FROM python:buster
ARG USER
WORKDIR /backend
ADD ../users/${USER}/pcode/script.py /
CMD ["python", "/script.py"]
