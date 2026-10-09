import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany([
      { name: 'Velocity Vipers', city: 'Seattle', coach: 'Morgan Lee', members: 12 },
      { name: 'Summit Sprinters', city: 'Denver', coach: 'Priya Nair', members: 9 },
      { name: 'Harbor Hustlers', city: 'Boston', coach: 'Elena Cruz', members: 11 },
    ]);

    await User.insertMany([
      { name: 'Avery Johnson', email: 'avery.johnson@example.com', age: 29, fitnessGoal: 'Improve endurance', team: 'Velocity Vipers' },
      { name: 'Sam Rivera', email: 'sam.rivera@example.com', age: 34, fitnessGoal: 'Build strength', team: 'Summit Sprinters' },
      { name: 'Jordan Patel', email: 'jordan.patel@example.com', age: 26, fitnessGoal: 'Train for a 10K', team: 'Harbor Hustlers' },
    ]);

    await Activity.insertMany([
      { user: 'Avery Johnson', type: 'Cycling', durationMinutes: 45, caloriesBurned: 420, activityDate: new Date('2026-10-01') },
      { user: 'Sam Rivera', type: 'Strength training', durationMinutes: 50, caloriesBurned: 360, activityDate: new Date('2026-10-02') },
      { user: 'Jordan Patel', type: 'Running', durationMinutes: 38, caloriesBurned: 410, activityDate: new Date('2026-10-03') },
    ]);

    await Leaderboard.insertMany([
      { rank: 1, user: 'Avery Johnson', team: 'Velocity Vipers', points: 1280 },
      { rank: 2, user: 'Jordan Patel', team: 'Harbor Hustlers', points: 1195 },
      { rank: 3, user: 'Sam Rivera', team: 'Summit Sprinters', points: 1110 },
    ]);

    await Workout.insertMany([
      { name: 'Endurance Builder', focus: 'Cardio', difficulty: 'Intermediate', durationMinutes: 40, exercises: ['Warm-up jog', 'Tempo intervals', 'Cooldown walk'] },
      { name: 'Core Stability Circuit', focus: 'Core strength', difficulty: 'Beginner', durationMinutes: 25, exercises: ['Plank', 'Dead bug', 'Side plank'] },
      { name: 'Power Legs', focus: 'Lower body strength', difficulty: 'Advanced', durationMinutes: 45, exercises: ['Goblet squat', 'Reverse lunge', 'Romanian deadlift'] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
