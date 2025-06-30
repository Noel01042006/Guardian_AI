import React, { useState, useRef } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  onAudioData?: (audioBlob: Blob) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscript, onAudioData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { speechEnabled } = useApp();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);

  const startRecording = async () => {
    if (!speechEnabled) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        onAudioData?.(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      // Web Speech API for transcription
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          if (event.results[event.results.length - 1].isFinal) {
            onTranscript(transcript);
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      }

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      setTimeout(() => setIsProcessing(false), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={!speechEnabled || isProcessing}
        className={`relative p-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isProcessing ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : isRecording ? (
          <Square className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </button>
      
      <div className="text-center">
        {isProcessing && (
          <p className="text-sm text-gray-600 animate-pulse">Processing...</p>
        )}
        {isRecording && (
          <p className="text-sm text-red-600 font-medium">Recording... Click to stop</p>
        )}
        {!isRecording && !isProcessing && (
          <p className="text-sm text-gray-600">Click to start voice input</p>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;