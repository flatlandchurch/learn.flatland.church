import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RequireUser from './auth/RequireUser';
import AuthProvider from './auth/Auth';
import RequireAdmin from './auth/RequireAdmin';
import Login from './routes/Login';

const App = () => {
  return (
    <BrowserRouter>
      <>
        {/* @ts-ignore */}
        <AuthProvider>
          <Routes>
            <Route path="/" element={<div>Welcome home, sir</div>} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <>
                  {/* @ts-ignore */}
                  <RequireAdmin>
                    <div>Admin</div>
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
            {/* Class Routes */}
            <Route path="/classes" element={<div>Hello</div>} />
            <Route
              path="/classes/:id"
              element={
                <>
                  {/* @ts-ignore */}
                  <RequireUser>
                    <div>Hello</div>
                  </RequireUser>
                </>
              }
            >
              <Route path=":sessionID" />
              <Route path=":sessionID/:contentID" />
            </Route>
          </Routes>
        </AuthProvider>
      </>
    </BrowserRouter>
  );
};

export default App;
