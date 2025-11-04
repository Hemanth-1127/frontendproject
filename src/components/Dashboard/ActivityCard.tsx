import { Calendar } from 'lucide-react';
import { Activity } from '../../lib/supabase';

type ActivityCardProps = {
  activity: Activity;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const isUpcoming = activity.status === 'upcoming';

  return (
    <div className={`rounded-lg border-2 p-4 transition hover:shadow-md ${
      isUpcoming ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-1">{activity.title}</h4>
          {activity.description && (
            <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
          )}
          <div className="flex items-center space-x-3 text-xs">
            <span className={`px-2 py-1 rounded-full font-medium ${
              isUpcoming ? 'bg-blue-200 text-blue-700' : 'bg-green-200 text-green-700'
            }`}>
              {activity.category}
            </span>
            <span className="flex items-center text-gray-600">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(activity.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isUpcoming ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
        }`}>
          {isUpcoming ? 'Upcoming' : 'Completed'}
        </div>
      </div>
    </div>
  );
}
