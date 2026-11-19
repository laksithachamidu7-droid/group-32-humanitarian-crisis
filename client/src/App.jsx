import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar               from './components/Navbar';
import Home                 from './pages/Home';
import CitizenRequestForm   from './pages/CitizenRequestForm';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import RequestDetails       from './pages/RequestDetails';
import SignIn               from './pages/SignIn';
import VolunteerRegister    from './pages/VolunteerRegister';
import CitizenDashboard     from './pages/CitizenDashboard';
import VolunteerDashboard   from './pages/VolunteerDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            {/* Public */}
            <Route path="/"                    element={<Home />} />
            <Route path="/request"             element={<CitizenRequestForm />} />
            <Route path="/sign-in"             element={<SignIn />} />
            <Route path="/volunteer-register"  element={<VolunteerRegister />} />

            {/* Dashboards */}
            <Route path="/dashboard"           element={<CoordinatorDashboard />} />
            <Route path="/request/:id"         element={<RequestDetails />} />
            <Route path="/citizen-dashboard"   element={<CitizenDashboard />} />
            <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />

            {/* Catch-all */}
            <Route path="*"                    element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
