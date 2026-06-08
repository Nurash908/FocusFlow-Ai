import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Workspace } from './pages/Workspace';
import { StudySessionPage } from './pages/StudySession';
import { AssessmentPage } from './pages/Assessment';
import { FeatureDeepUnderstanding } from './pages/FeatureDeepUnderstanding';
import { FeatureFocusMode } from './pages/FeatureFocusMode';
import { FeatureMastery } from './pages/FeatureMastery';
import { AIFocusTracking } from './pages/AIFocusTracking';
import { LockInFocusMode } from './pages/LockInFocusMode';
import { GamifiedProductivity } from './pages/GamifiedProductivity';
import { NEXAIAssistant } from './pages/NEXAIAssistant';
import { SmartStudyChallenges } from './pages/SmartStudyChallenges';
import { SmartStudyPlanner } from './pages/SmartStudyPlanner';
import { AchievementRewards } from './pages/AchievementRewards';
import { StreakTracking } from './pages/StreakTracking';
import { HealthScoreSystem } from './pages/HealthScoreSystem';
import { ClassroomAnalytics } from './pages/ClassroomAnalytics';
import { ParentInsights } from './pages/ParentInsights';
import { ExamPrepMode } from './pages/ExamPrepMode';
import { AdaptiveFocusEnvironment } from './pages/AdaptiveFocusEnvironment';
import { CommunityDashboard } from './pages/CommunityDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AIAnalyticsDashboard } from './pages/AIAnalyticsDashboard';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { initStorage } from './services/storage';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        
        {/* Feature Pages */}
        <Route path="/features/deep-understanding" element={<FeatureDeepUnderstanding />} />
        <Route path="/features/focus-mode" element={<FeatureFocusMode />} />
        <Route path="/features/mastery" element={<FeatureMastery />} />
        <Route path="/features/ai-focus-tracking" element={<AIFocusTracking />} />
        <Route path="/features/lock-in-focus" element={<LockInFocusMode />} />
        <Route path="/features/gamified-productivity" element={<GamifiedProductivity />} />
        <Route path="/features/nex-ai" element={<NEXAIAssistant />} />
        <Route path="/features/smart-study-challenges" element={<SmartStudyChallenges />} />
        <Route path="/features/smart-study-planner" element={<SmartStudyPlanner />} />
        <Route path="/features/achievement-rewards" element={<AchievementRewards />} />
        <Route path="/features/streak-tracking" element={<StreakTracking />} />
        <Route path="/features/health-score" element={<HealthScoreSystem />} />
        <Route path="/parent/insights" element={<ParentInsights />} />
        <Route path="/features/exam-prep" element={<ExamPrepMode />} />
        <Route path="/features/adaptive-focus" element={<AdaptiveFocusEnvironment />} />
        <Route path="/community/dashboard" element={<CommunityDashboard />} />
        <Route path="/teacher/classroom-analytics" element={<ClassroomAnalytics />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/dashboard/analytics" element={<AIAnalyticsDashboard />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/workspace/:id" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
        <Route path="/study/:id" element={<ProtectedRoute><StudySessionPage /></ProtectedRoute>} />
        <Route path="/assessment/:id" element={<ProtectedRoute><AssessmentPage /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
}

const App: React.FC = () => {
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <AuthProvider>
        <HashRouter>
            <ScrollToTop />
            <AppRoutes />
        </HashRouter>
    </AuthProvider>
  );
}

export default App;