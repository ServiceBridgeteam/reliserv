import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { mockData } from "../mock/mockData";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import CreateJob from "../pages/CreateJob";
import Emergency from "../pages/Emergency";
import MapView from "../pages/MapView";
import Profile from "../pages/Profile";
import LiveJob from "../pages/LiveJob";
import Completion from "../pages/Completion";

import WorkerOnboarding from "../pages/worker/WorkerOnboarding";
import WorkerDashboard from "../pages/worker/WorkerDashboard";
import WorkerRequests from "../pages/worker/WorkerRequests";
import WorkerLiveJob from "../pages/worker/WorkerLiveJob";
import WorkerCompletion from "../pages/worker/WorkerCompletion";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(mockData.user);
  const [workerProfile, setWorkerProfile] = useState(mockData.workerProfile);

  const onRoleChange = (role: "customer" | "worker") => setUser((p) => ({ ...p, role }));

  return (
    <AppLayout isAuthenticated={isAuthenticated} user={user} onRoleChange={onRoleChange}>
      <Routes>
        <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />

        {/* Customer */}
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/" replace />} />
        <Route path="/post-job" element={isAuthenticated ? <CreateJob /> : <Navigate to="/" replace />} />
        <Route path="/emergency" element={isAuthenticated ? <Emergency user={user} /> : <Navigate to="/" replace />} />
        <Route path="/map" element={isAuthenticated ? <MapView /> : <Navigate to="/" replace />} />
        <Route path="/profile" element={isAuthenticated ? <Profile user={user} /> : <Navigate to="/" replace />} />
        <Route path="/live-job" element={isAuthenticated ? <LiveJob /> : <Navigate to="/" replace />} />
        <Route path="/completion" element={isAuthenticated ? <Completion /> : <Navigate to="/" replace />} />

        {/* Worker */}
        <Route
          path="/worker/onboarding"
          element={
            isAuthenticated ? (
              <WorkerOnboarding workerProfile={workerProfile} setWorkerProfile={setWorkerProfile} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/worker/dashboard"
          element={
            isAuthenticated ? (
              <WorkerDashboard user={user} workerProfile={workerProfile} setWorkerProfile={setWorkerProfile} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/worker/requests"
          element={isAuthenticated ? <WorkerRequests user={user} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/worker/live-job/:jobId"
          element={isAuthenticated ? <WorkerLiveJob /> : <Navigate to="/" replace />}
        />
        <Route
          path="/worker/completion"
          element={isAuthenticated ? <WorkerCompletion /> : <Navigate to="/" replace />}
        />

        {/* Catch-all */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to={user.role === "worker" ? "/worker/dashboard" : "/dashboard"} replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </AppLayout>
  );
}