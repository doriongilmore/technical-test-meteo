import express, { type Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Weather API' });
});

export default app;
