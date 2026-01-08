import request from 'supertest';
import app from '../app';

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    it('returns health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('POST /api/interview/questions', () => {
    it('generates questions for valid topic', async () => {
      const res = await request(app)
        .post('/api/interview/questions')
        .send({ topic: 'Machine Learning' });

      expect(res.status).toBe(200);
      expect(res.body.questions).toBeDefined();
      expect(Array.isArray(res.body.questions)).toBe(true);
      expect(res.body.questions.length).toBeGreaterThanOrEqual(3);
      expect(res.body.questions.length).toBeLessThanOrEqual(5);
    }, 15000);

    it('returns 400 for missing topic', async () => {
      const res = await request(app)
        .post('/api/interview/questions')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('returns 400 for empty topic', async () => {
      const res = await request(app)
        .post('/api/interview/questions')
        .send({ topic: '   ' });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/article/generate', () => {
    it('generates article for valid transcript', async () => {
      const res = await request(app)
        .post('/api/article/generate')
        .send({
          topic: 'Technology',
          transcript: [
            { question: 'What is your experience?', answer: 'I have 5 years of experience.' },
            { question: 'What challenges did you face?', answer: 'Learning new technologies.' },
          ],
        });

      expect(res.status).toBe(200);
      expect(res.body.article).toBeDefined();
      expect(typeof res.body.article).toBe('string');
      expect(res.body.article.length).toBeGreaterThan(100);
    }, 15000);

    it('returns 400 for missing topic', async () => {
      const res = await request(app)
        .post('/api/article/generate')
        .send({
          transcript: [{ question: 'Q?', answer: 'A' }],
        });

      expect(res.status).toBe(400);
    });

    it('returns 400 for empty transcript', async () => {
      const res = await request(app)
        .post('/api/article/generate')
        .send({ topic: 'Test', transcript: [] });

      expect(res.status).toBe(400);
    });

    it('returns 400 for invalid transcript entries', async () => {
      const res = await request(app)
        .post('/api/article/generate')
        .send({
          topic: 'Test',
          transcript: [{ question: 'Q?' }], // missing answer
        });

      expect(res.status).toBe(400);
    });
  });
});
