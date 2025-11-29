import { Trophy, Award, FileText, Zap, Clock, CheckCircle } from 'lucide-react';

interface PortfolioUser {
  name: string;
  studentId: string;
}

interface StudentPortfolioProps {
  user: PortfolioUser | null;
}

export default function StudentPortfolio({ user }: StudentPortfolioProps) {
  const stats = [
    { label: 'Achievements', value: '2', icon: Trophy, color: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Awards', value: '1', icon: Award, color: 'bg-yellow-50', textColor: 'text-yellow-600' },
    { label: 'Certificates', value: '1', icon: FileText, color: 'bg-orange-50', textColor: 'text-orange-600' },
    { label: 'Total Points', value: '85', icon: Zap, color: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Upcoming', value: '2', icon: Clock, color: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Completed', value: '2', icon: CheckCircle, color: 'bg-blue-50', textColor: 'text-blue-600' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={20} className="text-gray-700" />
          <h2 className="text-xl font-bold text-gray-900">{user?.name}'s Achievement Portfolio</h2>
        </div>
        <p className="text-sm text-gray-500">Student ID: {user?.studentId}</p>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.color} rounded-lg p-4 text-center`}>
              <Icon size={24} className={`${stat.textColor} mx-auto mb-2`} />
              <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
