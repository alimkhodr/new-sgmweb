import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Scrap from './pages/Manufatura/Scrap';
import NotFoundPage from './pages/NotFoundPage';
import TelaInicial from './pages/TelaInicial';
import { checkTokenValidity } from './utils/checkTokenValidity';
import Circular from './components/Progress/Circular';
import Cookies from 'js-cookie';
import EntregaEPI from './pages/Seguranca/EntregaEPI';
import api from './config/axiosConfig';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredTelaId: number;
  telas: number[];
}

function ProtectedRoute({ children, requiredTelaId, telas }: ProtectedRouteProps) {
  return telas.includes(requiredTelaId) ? children : <Navigate to="*?error=403" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [telas, setTelas] = useState<number[]>([]);

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      const isValid = await checkTokenValidity(token);
      setIsAuthenticated(isValid);
    };

    validateToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchTelas = async () => {
        try {
          const token = Cookies.get('token');
          const response = await api.get('/auth/ace_telas', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTelas(response.data.map((tela: string) => parseInt(tela, 10)));
        } catch (error) {
          console.error('Erro ao buscar telas:', error);
        }
      };

      fetchTelas();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      {isAuthenticated === null ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Circular />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/TelaInicial" /> : <Navigate to="/Login" />} />
          <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route element={isAuthenticated ? <Home /> : <Navigate to="/Login" />}>
            <Route path="TelaInicial" element={<TelaInicial />} />
            <Route
              path="Scrap"
              element={
                <ProtectedRoute requiredTelaId={101 && 99} telas={telas}>
                  <Scrap />
                </ProtectedRoute>
              }
            />
            <Route
              path="EntregaEPI"
              element={
                <ProtectedRoute requiredTelaId={250 && 99} telas={telas}>
                  <EntregaEPI />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
