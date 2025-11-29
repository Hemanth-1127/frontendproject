import { useState, useEffect } from 'react';
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
import StudentPortfolio from './StudentPortfolio';
import AchievementCategories from './AchievementCategories';
import AchievementTabs from './AchievementTabs';

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
  const [viewAs, setViewAs] = useState<'student' | 'advisor'>('student');

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
      <Header user={user} viewAs={viewAs} setViewAs={setViewAs} />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <StudentPortfolio user={user} />
        <AchievementCategories />
        <AchievementTabs />
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
