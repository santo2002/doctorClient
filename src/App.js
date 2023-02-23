/* ****************************************************************************** */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePages from './pages/HomePages';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './Components/Spinner';
import ProtctedRoute from './Components/ProtctedRoute';
import PublicRoute from './Components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctor/DoctorAppointments';



const App = () => {
  const { loading } = useSelector(state => state.alerts);

  return (
    <>
      <BrowserRouter>
        {loading ? <Spinner /> :
          <Routes>
            <Route path='/' element={
              <ProtctedRoute>
                <HomePages />
              </ProtctedRoute>
            } />
            <Route path='/apply-doctor' element={
              <ProtctedRoute>
                <ApplyDoctor />
              </ProtctedRoute>
            } />
            <Route path='/admin/users' element={
              <ProtctedRoute>
                <Users />
              </ProtctedRoute>
            } />
            <Route path='/admin/doctors' element={
              <ProtctedRoute>
                <Doctors />
              </ProtctedRoute>
            } />
            <Route path='/doctor/profile/:id' element={
              <ProtctedRoute>
                <Profile />
              </ProtctedRoute>
            } />
            <Route path='/doctor/book-appointment/:id' element={
              <ProtctedRoute>
                <BookingPage />
              </ProtctedRoute>
            } />
            <Route path='/notification' element={
              <ProtctedRoute>
                <NotificationPage />
              </ProtctedRoute>
            } />
            <Route path='/login' element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path='/register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path='/appointments' element={
              <ProtctedRoute>
                <Appointments />
              </ProtctedRoute>
            } />
            <Route path='/doctor-appointments' element={
              <ProtctedRoute>
                <DoctorAppointments />
              </ProtctedRoute>
            } />
          </Routes>
        }
      </BrowserRouter>
    </>
  )
}


export default App;
