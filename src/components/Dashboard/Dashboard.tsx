import { useEffect, useState } from 'react';
import { Trophy, Award, FileText, Star, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Achievement, Activity, Certificate } from '../../lib/supabase';
import Header from './Header';
import StatsCard from './StatsCard';
import AchievementCard from './AchievementCard';
import ActivityCard from './ActivityCard';
import CertificateCard from './CertificateCard';
import AddAchievementModal from '../Modals/AddAchievementModal';
import AddActivityModal from '../Modals/AddActivityModal';
import AddCertificateModal from '../Modals/AddCertificateModal';

export default function Dashboard() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'achievements' | 'upcoming' | 'completed' | 'certificates'>('achievements');
  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showAddCertificate, setShowAddCertificate] = useState(false);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  async function loadData() {
    try {
      const [achievementsRes, activitiesRes, certificatesRes] = await Promise.all([
        supabase.from('achievements').select('*').eq('user_id', user!.id).order('date_achieved', { ascending: false }),
        supabase.from('activities').select('*').eq('user_id', user!.id).order('date', { ascending: false }),
        supabase.from('certificates').select('*').eq('user_id', user!.id).order('issue_date', { ascending: false }),
      ]);

      if (achievementsRes.data) setAchievements(achievementsRes.data);
      if (activitiesRes.data) setActivities(activitiesRes.data);
      if (certificatesRes.data) setCertificates(certificatesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  const totalPoints = achievements.reduce((sum, a) => sum + a.points, 0);
  const awardCount = achievements.filter(a => a.type === 'award').length;
  const certificateCount = certificates.length;
  const upcomingCount = activities.filter(a => a.status === 'upcoming').length;
  const completedCount = activities.filter(a => a.status === 'completed').length;

  const getCategoryStats = () => {
    const stats: Record<string, number> = {};
    achievements.forEach(a => {
      stats[a.category] = (stats[a.category] || 0) + 1;
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Trophy className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-800">Achievement Portfolio</h2>
              </div>
              <p className="text-gray-600">Track and showcase your extracurricular achievements</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatsCard
              label="Achievements"
              value={achievements.length}
              icon={Trophy}
              bgColor="bg-blue-50"
              textColor="text-blue-600"
            />
            <StatsCard
              label="Awards"
              value={awardCount}
              icon={Award}
              bgColor="bg-yellow-50"
              textColor="text-yellow-600"
            />
            <StatsCard
              label="Certificates"
              value={certificateCount}
              icon={FileText}
              bgColor="bg-orange-50"
              textColor="text-orange-600"
            />
            <StatsCard
              label="Total Points"
              value={totalPoints}
              icon={Star}
              bgColor="bg-green-50"
              textColor="text-green-600"
            />
            <StatsCard
              label="Upcoming"
              value={upcomingCount}
              icon={Calendar}
              bgColor="bg-purple-50"
              textColor="text-purple-600"
            />
            <StatsCard
              label="Completed"
              value={completedCount}
              icon={CheckCircle}
              bgColor="bg-blue-50"
              textColor="text-blue-600"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Trophy className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Achievement Categories</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(categoryStats).map(([category, count]) => (
              <span key={category} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {category}: {count}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  activeTab === 'achievements'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Recent Achievements
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  activeTab === 'upcoming'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Upcoming Activities
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  activeTab === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed Activities
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  activeTab === 'certificates'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Certificates
              </button>
            </div>

            <div className="flex space-x-2">
              {activeTab === 'achievements' && (
                <button
                  onClick={() => setShowAddAchievement(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  + Add Achievement
                </button>
              )}
              {(activeTab === 'upcoming' || activeTab === 'completed') && (
                <button
                  onClick={() => setShowAddActivity(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  + Add Activity
                </button>
              )}
              {activeTab === 'certificates' && (
                <button
                  onClick={() => setShowAddCertificate(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  + Add Certificate
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.length === 0 ? (
                  <div className="col-span-2 text-center py-12 text-gray-500">
                    No achievements yet. Start adding your accomplishments!
                  </div>
                ) : (
                  achievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))
                )}
              </div>
            )}

            {activeTab === 'upcoming' && (
              <div className="space-y-3">
                {activities.filter(a => a.status === 'upcoming').length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No upcoming activities scheduled.
                  </div>
                ) : (
                  activities
                    .filter(a => a.status === 'upcoming')
                    .map(activity => <ActivityCard key={activity.id} activity={activity} />)
                )}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="space-y-3">
                {activities.filter(a => a.status === 'completed').length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No completed activities yet.
                  </div>
                ) : (
                  activities
                    .filter(a => a.status === 'completed')
                    .map(activity => <ActivityCard key={activity.id} activity={activity} />)
                )}
              </div>
            )}

            {activeTab === 'certificates' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates.length === 0 ? (
                  <div className="col-span-3 text-center py-12 text-gray-500">
                    No certificates yet. Add your earned certificates!
                  </div>
                ) : (
                  certificates.map(certificate => (
                    <CertificateCard key={certificate.id} certificate={certificate} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {showAddAchievement && (
        <AddAchievementModal
          onClose={() => setShowAddAchievement(false)}
          onSuccess={() => {
            setShowAddAchievement(false);
            loadData();
          }}
        />
      )}

      {showAddActivity && (
        <AddActivityModal
          onClose={() => setShowAddActivity(false)}
          onSuccess={() => {
            setShowAddActivity(false);
            loadData();
          }}
        />
      )}

      {showAddCertificate && (
        <AddCertificateModal
          onClose={() => setShowAddCertificate(false)}
          onSuccess={() => {
            setShowAddCertificate(false);
            loadData();
          }}
        />
      )}
    </div>
  );
}
