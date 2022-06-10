import express from 'express';
import dotenv from 'dotenv';
import makeCallback from './express-callback';
import { getComments } from './controllers';

dotenv.config();

const app = express();
app.use(express.json());

app.use((_, res, next) => {
  res.set({ Tk: '!' });
  next();
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

app.get('/comments', makeCallback(getComments));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

export default app;
