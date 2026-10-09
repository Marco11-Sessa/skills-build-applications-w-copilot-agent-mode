import express from 'express';
import './config/database.js';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_request, response, next) => {
  try {
    const users = await User.find().sort({ name: 1 });
    response.json({ users, apiBaseUrl });
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_request, response, next) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    response.json({ teams, apiBaseUrl });
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_request, response, next) => {
  try {
    const activities = await Activity.find().sort({ activityDate: -1 });
    response.json({ activities, apiBaseUrl });
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_request, response, next) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 });
    response.json({ leaderboard, apiBaseUrl });
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ name: 1 });
    response.json({ workouts, apiBaseUrl });
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});