import { Request, Response } from 'express';
import { getAIService } from '../services/ai.service';
import { GenerateArticleRequest, GenerateArticleResponse } from '../types';

export async function generateArticle(
  req: Request<{}, {}, GenerateArticleRequest>,
  res: Response<GenerateArticleResponse | { error: string }>
) {
  try {
    const { topic, transcript } = req.body;

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (!transcript || !Array.isArray(transcript) || transcript.length === 0) {
      return res.status(400).json({ error: 'Transcript is required and must not be empty' });
    }

    for (const entry of transcript) {
      if (!entry.question || !entry.answer) {
        return res.status(400).json({
          error: 'Each transcript entry must have a question and answer'
        });
      }
    }

    const aiService = getAIService();
    const article = await aiService.generateArticle(topic.trim(), transcript);

    return res.json({ article });
  } catch (error) {
    console.error('Error generating article:', error);
    return res.status(500).json({ error: 'Failed to generate article' });
  }
}
