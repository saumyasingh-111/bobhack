import { useState, useRef } from 'react';
import { useKiosk } from '../context/KioskContext';
import { processVoiceAudio } from '../services/api';
import { Mic, Square, Loader2 } from 'lucide-react';

export default function VoiceRecorder() {
  const { language, setTranscript, setLegalDraft, setPdfPath, setStep, isLoading, setIsLoading } = useKiosk();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setIsLoading(true);

        try {
          const res = await processVoiceAudio(blob, language);
          setTranscript(res.transcript || res.raw_transcript);
          setLegalDraft(res.data || res.draft);
          setPdfPath(res.pdf_url);
          setStep('REVIEW_DRAFT');
        } catch (err) {
          alert('Error processing recording. Please try again or check backend server.');
        } finally {
          setIsLoading(false);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert('Microphone access denied or unavailable.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] p-6 text-center">
      <span className="text-lg font-bold text-nyaya-blue uppercase tracking-wider mb-2">
        Step 2 of 3 • Voice Ingestion
      </span>
      <h2 className="text-3xl font-extrabold text-slate-800 mb-8 max-w-xl">
        {isRecording
          ? 'हम आपकी बात सुन रहे हैं... (Recording in progress)'
          : 'बोलने के लिए माइक बटन दबाएं (Press to Start Recording)'}
      </h2>

      {isLoading ? (
        <div className="flex flex-col items-center py-12">
          <Loader2 className="w-20 h-20 text-nyaya-blue animate-spin mb-4" />
          <p className="text-xl font-bold text-slate-700">Analyzing statement & drafting legal petition...</p>
          <p className="text-sm text-slate-500 mt-1">Generating BNS sections and structured facts</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-52 h-52 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 border-8 ${
              isRecording
                ? 'bg-red-600 border-red-300 animate-pulse ring-8 ring-red-100'
                : 'bg-nyaya-navy border-slate-200 hover:border-amber-500 hover:scale-105 active:scale-95'
            }`}
          >
            {isRecording ? (
              <>
                <Square className="w-20 h-20 text-white fill-white mb-2" />
                <span className="text-white font-bold text-sm tracking-widest uppercase">STOP</span>
              </>
            ) : (
              <>
                <Mic className="w-24 h-24 text-amber-400 mb-2" />
                <span className="text-white font-bold text-sm tracking-widest uppercase">SPEAK</span>
              </>
            )}
          </button>

          <p className="mt-8 text-slate-600 max-w-md font-medium">
            Speak naturally about what happened, who was involved, and what action you require.
          </p>
        </div>
      )}
    </div>
  );
}