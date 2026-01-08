import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useEffect } from 'react';

interface VoiceRecorderProps {
  onTranscriptChange: (transcript: string) => void;
  disabled?: boolean;
}

export function VoiceRecorder({
  onTranscriptChange,
  disabled,
}: VoiceRecorderProps) {
  const {
    transcript,
    interimTranscript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error,
  } = useSpeechRecognition();

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

  if (!isSupported) {
    return (
      <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="text-amber-800 text-sm">
          Voice input is not supported in your browser. Please use Chrome or Edge, or switch to text mode.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Recording Status Banner */}
      {isListening && (
        <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-red-700">Recording...</p>
              <p className="text-xs text-red-500">Speak now</p>
            </div>
          </div>

          {/* Animated Waveform */}
          <div className="flex items-center gap-0.5 h-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-red-400 rounded-full"
                style={{
                  animation: 'waveform 0.5s ease-in-out infinite',
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          disabled={disabled}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          } disabled:bg-slate-300 disabled:cursor-not-allowed`}
        >
          {isListening ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              Stop Recording
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              Start Recording
            </>
          )}
        </button>

        {transcript && (
          <button
            type="button"
            onClick={resetTranscript}
            className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-xl">
          {error}
        </div>
      )}

      {(transcript || interimTranscript) && (
        <div className="bg-slate-50 rounded-xl p-4 min-h-[100px]">
          <p className="text-slate-700">
            {transcript}
            {interimTranscript && (
              <span className="text-slate-400">{interimTranscript}</span>
            )}
          </p>
        </div>
      )}

      {isListening && !transcript && !interimTranscript && (
        <div className="bg-slate-50 rounded-xl p-4 min-h-[100px] flex items-center justify-center">
          <p className="text-slate-400 text-sm">Listening... Start speaking</p>
        </div>
      )}
    </div>
  );
}
