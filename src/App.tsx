import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RequireUser from './auth/RequireUser';
import AuthProvider from './auth/Auth';
import RequireAdmin from './auth/RequireAdmin';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Classes from './routes/classes';
import Class from './routes/class';
import Admin from './routes/admin/Admin';
import AdminClasses from './routes/admin/classes';
import AdminClass from './routes/admin/class';

const App = () => {
  return (
    <BrowserRouter>
      <>
        {/* @ts-ignore */}
        <AuthProvider>
          <Routes>
            <Route path="/" element={<div>Welcome home, sir</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route
              path="/admin"
              element={
                <>
                  {/* @ts-ignore */}
                  <RequireAdmin>
                    <Admin />
                  </RequireAdmin>
                </>
              }
            />
            <Route
              path="/admin/classes"
              element={
                <>
                  {/* @ts-ignore */}
                  <RequireAdmin>
                    <AdminClasses />
                  </RequireAdmin>
                </>
              }
            />
            <Route
              path="/admin/classes/new"
              element={
                <>
                  {/* @ts-ignore */}
                  <RequireAdmin>
                    <AdminClass new />
                  </RequireAdmin>
                </>
              }
            />
            <Route
              path="/admin/classes/:id"
              element={
                <>
                  {/* @ts-ignore */}
                  <RequireAdmin>
                    <AdminClass />
                  </RequireAdmin>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {/* @ts-ignore */}
                  <RequireUser>
                    <div>Hello</div>
                  </RequireUser>
                </>
              }
            />
            <Route path="/classes" element={<Classes />} />
            <Route path="/classes/:id" element={<Class />} />
          </Routes>
        </AuthProvider>
      </>
    </BrowserRouter>
  );
};

export default App;
