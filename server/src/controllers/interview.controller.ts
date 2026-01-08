import { Request, Response } from 'express';
import { getAIService } from '../services/ai.service';
import { GenerateQuestionsRequest, GenerateQuestionsResponse } from '../types';

export async function generateQuestions(
  req: Request<{}, {}, GenerateQuestionsRequest>,
  res: Response<GenerateQuestionsResponse | { error: string }>
) {
  try {
    const { topic } = req.body;

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const aiService = getAIService();
    const questions = await aiService.generateQuestions(topic.trim());

    return res.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    return res.status(500).json({ error: 'Failed to generate questions' });
  }
}
