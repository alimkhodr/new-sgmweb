import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import TelaInicial from './pages/TelaInicial';
import Login from './components/Login/Login';
import Scrap from './pages/Manufatura/Scrap';
import { checkTokenValidity } from './utils/checkTokenValidity';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkTokenValidity();
      setIsAuthenticated(isValid);
    };

    validateToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/TelaInicial" /> : <Navigate to="/Login" />} />
        <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route element={isAuthenticated ? <Home /> : <Navigate to="/Login" />}>
          <Route path="TelaInicial" element={<TelaInicial />} />
          <Route path="Scrap" element={<Scrap />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
