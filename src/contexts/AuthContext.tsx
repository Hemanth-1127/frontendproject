import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  role: 'student' | 'advisor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    studentId: 'STU001',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('AuthContext initialized with user:', user);
  }, []);

  const login = (email: string, password: string) => {
    console.log('Login called with:', email);
    setUser({
      id: '1',
      name: 'Alex Johnson',
      email,
      studentId: 'STU001',
      role: 'student'
    });
  };

  const logout = () => {
    console.log('Logout called');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
