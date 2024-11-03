import React from 'react';
import { Eye, Ear, Hand, Cloud, Coffee } from 'lucide-react';
import type { SensoryExperience } from '../types';

interface SensoryLogProps {
  experiences: SensoryExperience[];
  onAdd: (experience: SensoryExperience) => void;
}

export function SensoryLog({ experiences, onAdd }: SensoryLogProps) {
  const [isAdding, setIsAdding] = React.useState(false);
  const [newExperience, setNewExperience] = React.useState<SensoryExperience>({
    type: 'visual',
    intensity: 5,
    isPositive: true,
    notes: '',
  });

  const icons = {
    visual: <Eye className="w-5 h-5" />,
    auditory: <Ear className="w-5 h-5" />,
    tactile: <Hand className="w-5 h-5" />,
    olfactory: <Cloud className="w-5 h-5" />,
    taste: <Coffee className="w-5 h-5" />,
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              exp.isPositive ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-center gap-2">
              {icons[exp.type]}
              <span className="capitalize">{exp.type}</span>
            </div>
            <div className="mt-2">
              <div className="text-sm">Intensity: {exp.intensity}/10</div>
              <p className="text-sm mt-1">{exp.notes}</p>
            </div>
          </div>
        ))}
      </div>

      {isAdding ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAdd(newExperience);
            setIsAdding(false);
          }}
          className="p-4 bg-white rounded-lg shadow-sm"
        >
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={newExperience.type}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    type: e.target.value as SensoryExperience['type'],
                  })
                }
                className="w-full rounded-md border-gray-300 shadow-sm"
              >
                {Object.keys(icons).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Intensity (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={newExperience.intensity}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    intensity: Number(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Experience Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={newExperience.isPositive}
                    onChange={() =>
                      setNewExperience({ ...newExperience, isPositive: true })
                    }
                    className="mr-2"
                  />
                  Positive
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!newExperience.isPositive}
                    onChange={() =>
                      setNewExperience({ ...newExperience, isPositive: false })
                    }
                    className="mr-2"
                  />
                  Challenging
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={newExperience.notes}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, notes: e.target.value })
                }
                className="w-full rounded-md border-gray-300 shadow-sm"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Experience
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Sensory Experience
        </button>
      )}
    </div>
  );
}