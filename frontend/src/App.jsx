import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ReportEmergency from './pages/student/ReportEmergency.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx'; // Navbar ইম্পোর্ট করা হলো

function App() {
  return (
    <>
      {/* Routes এর ঠিক উপরে Navbar যুক্ত করা হলো, যেন সব পেজেই এটি দেখা যায় */}
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Student Routes */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute roleRequired="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/report-emergency" 
          element={
            <ProtectedRoute roleRequired="student">
              <ReportEmergency />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;