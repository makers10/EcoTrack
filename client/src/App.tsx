import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { EcoAdvicePage } from './pages/EcoAdvicePage';
import { ChallengesPage } from './pages/ChallengesPage';
import { GroupsPage } from './pages/GroupsPage';
import { GreenPrintPage } from './pages/GreenPrintPage';
import { ProfilePage } from './pages/ProfilePage';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="register" />} />

        {/* App Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="greenprint" element={<GreenPrintPage />} />
          <Route path="advice" element={<EcoAdvicePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
