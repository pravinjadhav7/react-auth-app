import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Auth from './components/Auth';
import ApplicationPage from './components/ApplicationPage';
import Unauthorized from './components/Unauthorized';
import { RootState } from './store/reducers';
import { autoLogin } from './store/actions/authActions';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(autoLogin(token) as any);
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/application"
            element={isAuthenticated ? <ApplicationPage /> : <Navigate to="/auth" />}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/application" : "/auth"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
