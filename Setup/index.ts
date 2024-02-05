import express from 'express';
const app = express();
import cors from 'cors';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send('Error: malformatted parameters');
  } else {
    res.send(calculateBmi(height, weight));
  }
});

app.post('/exercises', (req, res) => {
  const {daily_exercises , target} = req.body;
  if (!target || !daily_exercises) {
    return res.status(400).json({error: "parameters missing"});
  }
  try {
    return res.json(calculateExercises(daily_exercises as number[], Number(target)));
  } catch (error) {
    return res.status(400).json({error: "malformatted parameters"});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});