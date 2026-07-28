import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const processVoiceAudio = async (audioBlob, language) => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'voice_input.webm');
  formData.append('language', language);

  const response = await axios.post(`${API_BASE_URL}/process-voice`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};