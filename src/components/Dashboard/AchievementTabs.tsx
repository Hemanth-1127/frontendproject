import { useState } from 'react';
import { Eye } from 'lucide-react';

export default function AchievementTabs() {
  const [activeTab, setActiveTab] = useState('recent-achievements');

  const tabs = [
    { id: 'recent-achievements', label: 'Recent Achievements' },
    { id: 'upcoming-activities', label: 'Upcoming Activities' },
    { id: 'completed-activities', label: 'Completed Activities' },
    { id: 'certificates', label: 'Certificates' },
  ];

  const achievements = [
    {
      title: 'Regional Swimming Championship - First Place',
      tags: ['sports', 'award', 'state', 'Certificate'],
      points: 50,
      views: 0,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex border-b border-gray-200 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-6 py-4 text-sm font-medium text-center transition ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg">📅</span>
          <h4 className="text-lg font-bold text-gray-900">Recent Achievements</h4>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-3">{achievement.title}</h5>
                  <div className="flex gap-2 flex-wrap">
                    {achievement.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          tag === 'sports'
                            ? 'bg-blue-100 text-blue-700'
                            : tag === 'award'
                            ? 'bg-yellow-100 text-yellow-700'
                            : tag === 'state'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    <span className="text-sm text-gray-600">{achievement.points} pts</span>
                  </div>
                  <Eye size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
