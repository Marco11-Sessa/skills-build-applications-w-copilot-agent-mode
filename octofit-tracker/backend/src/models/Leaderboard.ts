import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    rank: { type: Number, required: true },
    user: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { collection: 'leaderboard', timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);