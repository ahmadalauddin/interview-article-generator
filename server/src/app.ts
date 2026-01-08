import express from 'express';
import cors from 'cors';
import { config } from './config';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`AI Mode: ${config.isOpenAIEnabled ? 'OpenAI' : 'Mock'}`);
  });
}

export default app;
