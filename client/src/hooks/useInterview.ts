import { useState, useCallback } from 'react';
import { InterviewState, TranscriptEntry, InterviewPhase } from '../types';
import * as api from '../services/api';

const initialState: InterviewState = {
  phase: 'topic',
  topic: '',
  questions: [],
  currentQuestionIndex: 0,
  transcript: [],
  article: '',
  isLoading: false,
  error: null,
};

export function useInterview() {
  const [state, setState] = useState<InterviewState>(initialState);

  const setPhase = useCallback((phase: InterviewPhase) => {
    setState(prev => ({ ...prev, phase }));
  }, []);

  const setTopic = useCallback((topic: string) => {
    setState(prev => ({ ...prev, topic }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  }, []);

  const startInterview = useCallback(async (topic: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null, topic }));

    try {
      const questions = await api.generateQuestions(topic);
      setState(prev => ({
        ...prev,
        questions,
        phase: 'interview',
        isLoading: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to generate questions',
        isLoading: false,
      }));
    }
  }, []);

  const submitAnswer = useCallback((answer: string) => {
    setState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      const newEntry: TranscriptEntry = {
        question: currentQuestion,
        answer: answer.trim(),
      };

      const newTranscript = [...prev.transcript, newEntry];
      const nextIndex = prev.currentQuestionIndex + 1;
      const isComplete = nextIndex >= prev.questions.length;

      return {
        ...prev,
        transcript: newTranscript,
        currentQuestionIndex: nextIndex,
        phase: isComplete ? 'generating' : 'interview',
      };
    });
  }, []);

  const generateArticle = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const article = await api.generateArticle(state.topic, state.transcript);
      setState(prev => ({
        ...prev,
        article,
        phase: 'article',
        isLoading: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to generate article',
        isLoading: false,
        phase: 'interview',
      }));
    }
  }, [state.topic, state.transcript]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const currentQuestion = state.questions[state.currentQuestionIndex] || null;
  const progress = state.questions.length > 0
    ? Math.round((state.currentQuestionIndex / state.questions.length) * 100)
    : 0;

  return {
    ...state,
    currentQuestion,
    progress,
    setPhase,
    setTopic,
    setError,
    startInterview,
    submitAnswer,
    generateArticle,
    reset,
  };
}
