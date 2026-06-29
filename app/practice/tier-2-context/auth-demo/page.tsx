'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  password: string;
  role: 'admin' | 'staff';
  tenantSlug: string;
}
interface Patient {
  id: number;
  name: string;
  tenantSlug: string;
}

const users: User[] = [
  { email: 'admin@patan.com', password: '1234', role: 'admin', tenantSlug: 'patan-hos' },
  { email: 'staff@smile.com', password: '1234', role: 'staff', tenantSlug: 'smile-dental' },
];

const patients: Patient[] = [
  { id: 1, name: 'Ram Shrestha', tenantSlug: 'patan-hos' },
  { id: 2, name: 'Sita Gurung', tenantSlug: 'patan-hos' },
  { id: 3, name: 'Hari Tamang', tenantSlug: 'smile-dental' },
  { id: 4, name: 'Gita Rai', tenantSlug: 'smile-dental' },
];

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function login(email: string, password: string) {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return false;
    setUser(found);
    return true;
  }
  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!login(email, password)) setError('Invalid email or password');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Try: admin@patan.com / 1234 — or — staff@smile.com / 1234</p>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Log in</button>
    </form>
  );
}

function Header() {
  const { user, logout } = useAuth();
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 12 }}>
      <span>Logged in — Tenant: {user?.tenantSlug} ({user?.role})</span>
      <button onClick={logout}>Logout</button>
    </header>
  );
}

function Sidebar() {
  const { user } = useAuth();
  return (
    <aside style={{ padding: 12, width: 160 }}>
      <p>Patients</p>
      {user?.role === 'admin' && <p>Manage Staff</p>}
    </aside>
  );
}

function PatientList() {
  const { user } = useAuth();
  const tenantPatients = patients.filter(p => p.tenantSlug === user?.tenantSlug);
  return (
    <div style={{ padding: 12 }}>
      <h2>Patients for {user?.tenantSlug}</h2>
      <ul>{tenantPatients.map(p => <li key={p.id}>{p.name}</li>)}</ul>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  if (!user) return <LoginForm />;
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main><PatientList /></main>
      </div>
    </>
  );
}

export default function AuthDemoPage() {
  return (
    <AuthProvider>
      <h1 style={{ padding: 12 }}>Exercise 10a: Auth context</h1>
      <Dashboard />
    </AuthProvider>
  );
}