export type MoodType = 'great' | 'good' | 'okay' | 'difficult' | 'overwhelming';

export interface SensoryExperience {
  type: 'visual' | 'auditory' | 'tactile' | 'olfactory' | 'taste';
  intensity: number;
  isPositive: boolean;
  notes: string;
}

export interface DailyLog {
  date: string;
  mood: MoodType;
  sensoryExperiences: SensoryExperience[];
  activities: string[];
  notes: string;
  energyLevel: number;
  sleepQuality: number;
}