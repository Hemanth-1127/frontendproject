import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  student_id: string;
  role: 'student' | 'admin';
  created_at: string;
  updated_at: string;
};

export type Achievement = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: 'sports' | 'community' | 'academic' | 'arts' | 'leadership';
  type: 'award' | 'certificate' | 'achievement';
  level: 'school' | 'district' | 'state' | 'national' | 'international' | null;
  points: number;
  date_achieved: string;
  has_certificate: boolean;
  certificate_url: string | null;
  created_at: string;
};

export type Activity = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  status: 'upcoming' | 'completed';
  date: string;
  created_at: string;
};

export type Certificate = {
  id: string;
  user_id: string;
  achievement_id: string | null;
  title: string;
  issued_by: string;
  issue_date: string;
  certificate_url: string | null;
  created_at: string;
};
