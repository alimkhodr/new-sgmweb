import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Scrap from './pages/Manufatura/Scrap';
import NotFoundPage from './pages/NotFoundPage';
import TelaInicial from './pages/TelaInicial';
import { checkTokenValidity } from './utils/checkTokenValidity';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
  
      const isValid = await checkTokenValidity(token);
      setIsAuthenticated(isValid);
    };
  
    validateToken();
  }, []);

  return (
    <Router>
      {isAuthenticated === null ? (
        // Mostre um carregando ou uma tela em branco enquanto verifica a autenticação
        <div>Loading...</div>
      ) : (
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
      )}
    </Router>
  );
}

export default App;
