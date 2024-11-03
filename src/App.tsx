import React from 'react';
import { MoodSelector } from './components/MoodSelector';
import { SensoryLog } from './components/SensoryLog';
import { Activity, Moon, Battery } from 'lucide-react';
import type { DailyLog, MoodType, SensoryExperience } from './types';

function App() {
  const [log, setLog] = React.useState<DailyLog>({
    date: new Date().toISOString().split('T')[0],
    mood: 'okay',
    sensoryExperiences: [],
    activities: [],
    notes: '',
    energyLevel: 5,
    sleepQuality: 5,
  });

  const handleMoodChange = (mood: MoodType) => {
    setLog((prev) => ({ ...prev, mood }));
  };

  const handleSensoryAdd = (experience: SensoryExperience) => {
    setLog((prev) => ({
      ...prev,
      sensoryExperiences: [...prev.sensoryExperiences, experience],
    }));
  };

  const handleActivityAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value.trim()) {
      setLog((prev) => ({
        ...prev,
        activities: [...prev.activities, event.currentTarget.value.trim()],
      }));
      event.currentTarget.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Daily Autism Tracker</h1>
          <p className="text-indigo-600">Track your experiences, moods, and activities</p>
        </header>

        <div className="space-y-8">
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
            <MoodSelector value={log.mood} onChange={handleMoodChange} />
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sensory Experiences</h2>
            <SensoryLog
              experiences={log.sensoryExperiences}
              onAdd={handleSensoryAdd}
            />
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Daily Activities</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {log.activities.map((activity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4" />
                    {activity}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add an activity (press Enter)"
                onKeyDown={handleActivityAdd}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Battery className="w-5 h-5" /> Energy Level
              </h2>
              <input
                type="range"
                min="1"
                max="10"
                value={log.energyLevel}
                onChange={(e) =>
                  setLog((prev) => ({
                    ...prev,
                    energyLevel: Number(e.target.value),
                  }))
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Low</span>
                <span>High</span>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5" /> Sleep Quality
              </h2>
              <input
                type="range"
                min="1"
                max="10"
                value={log.sleepQuality}
                onChange={(e) =>
                  setLog((prev) => ({
                    ...prev,
                    sleepQuality: Number(e.target.value),
                  }))
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </section>
          </div>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
            <textarea
              value={log.notes}
              onChange={(e) => setLog((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Any other thoughts or experiences you'd like to record..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
            />
          </section>

          <div className="flex justify-end">
            <button
              onClick={() => console.log('Saving log:', log)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Daily Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;