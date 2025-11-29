import { User } from 'lucide-react';

interface HeaderUser {
  name: string;
}

interface HeaderProps {
  user: HeaderUser | null;
  viewAs: string;
  setViewAs: (view: 'student' | 'advisor') => void;
}

export default function Header({ user, viewAs, setViewAs }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">EduAchieve</h1>
            <p className="text-xs text-gray-500">Student Achievement Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">View as:</span>
            <select
              value={viewAs}
              onChange={(e) => setViewAs(e.target.value as 'student' | 'advisor')}
              className="text-sm border border-gray-300 rounded px-3 py-1"
            >
              <option value="student">Student</option>
              <option value="advisor">Advisor</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Student:</span>
            <select className="text-sm border border-gray-300 rounded px-3 py-1">
              <option>{user?.name}</option>
            </select>
          </div>

          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">
            <User size={16} />
            Student Mode
          </button>
        </div>
      </div>
    </header>
  );
}
