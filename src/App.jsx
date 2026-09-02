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
import PatientProfile from './pages/patient/PatientProfile';

// Care Center pages
import CareCenterDashboard from './pages/careCenter/CareCenterDashboard';
import ReviewRequest from './pages/careCenter/ReviewRequest';  
import PatientDetail from './pages/careCenter/PatientDetail';

// Engineer pages
import EngineerDashboard from './pages/engineer/EngineerDashboard';
import EngineerCase from './pages/engineer/EngineerCase';

//Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagePatients from './pages/admin/ManagePatients';
import AddPatient from './pages/admin/AddPatient';
import ManageCareCenters from './pages/admin/ManageCareCenters';
import AddCareCenter from './pages/admin/AddCareCenter';
import ManageEngineers from './pages/admin/ManageEngineers';
import AddEngineer from './pages/admin/AddEngineer';
import AllRequests from './pages/admin/AllRequests';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* Public */}
         <Route path="/" element={<><Navbar /> <Home /></> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/request/new" element={<NewRequest />} />
        <Route path="/patient/request/:id" element={<RequestDetails />} />
        <Route path="/patient/profile" element={<PatientProfile />} /> 

        {/* Care Center */}
        <Route path="/care-center" element={<CareCenterDashboard />} />
        <Route path="/care-center/requests" element={<CareCenterDashboard />} />
        <Route path="/care-center/patients" element={<CareCenterDashboard />} />
        <Route path="/care-center/request/:id" element={<ReviewRequest />} />
        <Route path="/care-center/patient/:id" element={<PatientDetail />} />

        {/* Engineer */}
        <Route path="/engineer" element={<EngineerDashboard />} />
        <Route path="/engineer/case/:id" element={<EngineerCase />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/patients" element={<ManagePatients />} />
        <Route path="/admin/patients/add" element={<AddPatient />} />
        <Route path="/admin/centers" element={<ManageCareCenters />} />
        <Route path="/admin/centers/add" element={<AddCareCenter />} />
        <Route path="/admin/engineers" element={<ManageEngineers />} />
        <Route path="/admin/engineers/add" element={<AddEngineer />} />
        <Route path="/admin/requests" element={<AllRequests />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;