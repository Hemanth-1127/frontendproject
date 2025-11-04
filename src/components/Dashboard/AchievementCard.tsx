import { MapPin, FileText, Eye } from 'lucide-react';
import { Achievement } from '../../lib/supabase';

type AchievementCardProps = {
  achievement: Achievement;
};

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      sports: 'bg-blue-100 text-blue-700',
      community: 'bg-gray-100 text-gray-700',
      academic: 'bg-green-100 text-green-700',
      arts: 'bg-pink-100 text-pink-700',
      leadership: 'bg-orange-100 text-orange-700',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      award: 'bg-yellow-100 text-yellow-700',
      certificate: 'bg-blue-100 text-blue-700',
      achievement: 'bg-green-100 text-green-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">{achievement.title}</h3>
        <div className="flex items-center space-x-2 ml-4">
          {achievement.has_certificate && (
            <FileText className="w-5 h-5 text-blue-600" />
          )}
          <Eye className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {achievement.description && (
        <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement.category)}`}>
          {achievement.category}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(achievement.type)}`}>
          {achievement.type}
        </span>
        {achievement.level && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {achievement.level}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {new Date(achievement.date_achieved).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
        <span className="flex items-center text-green-600 font-semibold">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {achievement.points}
        </span>
      </div>
    </div>
  );
}
