let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let isPaused = false;

const startButton = document.getElementById('start-record');
const pauseButton = document.getElementById('pause-record');
const resumeButton = document.getElementById('resume-record');
const stopButton = document.getElementById('stop-record');
const videoElement = document.getElementById('recorded-video');

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      recordedChunks = [];
      videoElement.src = URL.createObjectURL(blob);
    };

    mediaRecorder.start();
    isRecording = true;
  } catch (err) {
    console.error('Error accessing screen:', err);
  }
}

function pauseRecording() {
  if (isRecording) {
    mediaRecorder.pause();
    isPaused = true;
  }
}

function resumeRecording() {
  if (isRecording && isPaused) {
    mediaRecorder.resume();
    isPaused = false;
  }
}

function stopRecording() {
  if (isRecording) {
    mediaRecorder.stop();
    isRecording = false;
    isPaused = false;
  }
}

startButton.addEventListener('click', startRecording);
pauseButton.addEventListener('click', pauseRecording);
resumeButton.addEventListener('click', resumeRecording);
stopButton.addEventListener('click', stopRecording);
