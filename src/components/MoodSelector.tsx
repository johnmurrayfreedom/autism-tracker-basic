import React from 'react';
import { Smile, Meh, Frown, Cloud, CloudLightning } from 'lucide-react';
import type { MoodType } from '../types';

interface MoodSelectorProps {
  value: MoodType;
  onChange: (mood: MoodType) => void;
}

const moods: { type: MoodType; icon: React.ReactNode; label: string }[] = [
  { type: 'great', icon: <Smile className="w-8 h-8" />, label: 'Great' },
  { type: 'good', icon: <Smile className="w-8 h-8" />, label: 'Good' },
  { type: 'okay', icon: <Meh className="w-8 h-8" />, label: 'Okay' },
  { type: 'difficult', icon: <Frown className="w-8 h-8" />, label: 'Difficult' },
  { type: 'overwhelming', icon: <CloudLightning className="w-8 h-8" />, label: 'Overwhelming' },
];

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {moods.map(({ type, icon, label }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`flex flex-col items-center p-4 rounded-lg transition-all ${
            value === type
              ? 'bg-indigo-100 text-indigo-600 scale-110'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          {icon}
          <span className="mt-2 text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
}