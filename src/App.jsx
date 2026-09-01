import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Patient pages
import PatientDashboard from './pages/patient/PatientDashboard';
import NewRequest from './pages/patient/NewRequest';
import RequestDetails from './pages/patient/RequestDetails';

// Care Center pages
import CareCenterDashboard from './pages/careCenter/CareCenterDashboard';
import ReviewRequest from './pages/careCenter/ReviewRequest';  

// Engineer pages
import EngineerDashboard from './pages/engineer/EngineerDashboard';

//Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/request/new" element={<NewRequest />} />
        <Route path="/patient/request/:id" element={<RequestDetails />} />

        {/* Care Center */}
        <Route path="/care-center" element={<CareCenterDashboard />} />
        <Route path="/care-center/request/:id" element={<ReviewRequest />} />

        {/* Engineer */}
        <Route path="/engineer" element={<EngineerDashboard />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;