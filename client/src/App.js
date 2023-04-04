import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Private from './components/Routes/Private';
import Dashboard from './pages/user/Dashboard';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Private />}>
          <Route path='user' element={<Dashboard />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/forget-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
