import { Router } from 'express';
import { generateQuestions } from '../controllers/interview.controller';
import { generateArticle } from '../controllers/article.controller';

const router = Router();

router.post('/interview/questions', generateQuestions);
router.post('/article/generate', generateArticle);
router.get('/health', (_, res) => res.json({ status: 'ok' }));

export default router;
