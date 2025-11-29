import { Layers } from 'lucide-react';

export default function AchievementCategories() {
  const categories = [
    { name: 'sports', count: 1, color: 'bg-blue-100 text-blue-700' },
    { name: 'community', count: 1, color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Layers size={20} className="text-gray-700" />
        <h3 className="text-lg font-bold text-gray-900">Achievement Categories</h3>
      </div>

      <div className="flex gap-3 flex-wrap">
        {categories.map((cat, idx) => (
          <span key={idx} className={`${cat.color} px-3 py-1 rounded-full text-sm font-medium`}>
            {cat.name}: {cat.count}
          </span>
        ))}
      </div>
    </div>
  );
}
