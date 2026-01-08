import { GenerateQuestionsResponse, GenerateArticleResponse, TranscriptEntry } from '../types';

const API_BASE = '/api';

export async function generateQuestions(topic: string): Promise<string[]> {
  const response = await fetch(`${API_BASE}/interview/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate questions');
  }

  const data: GenerateQuestionsResponse = await response.json();
  return data.questions;
}

export async function generateArticle(
  topic: string,
  transcript: TranscriptEntry[]
): Promise<string> {
  const response = await fetch(`${API_BASE}/article/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic, transcript }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate article');
  }

  const data: GenerateArticleResponse = await response.json();
  return data.article;
}
