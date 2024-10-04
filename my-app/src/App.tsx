import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Scrap from './pages/Manufatura/Scrap/Scrap';
import AvaDesempenho from './pages/Manufatura/AvaDesenpenho/AvaDesempenho';
import NotFoundPage from './pages/NotFoundPage';
import TelaInicial from './pages/TelaInicial';
import { checkTokenValidity } from './utils/checkTokenValidity';
import Circular from './components/Progress/Circular';
import Cookies from 'js-cookie';
import EntregaEPI from './pages/Seguranca/EntregaEPI';
import api from './config/axiosConfig';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredTelaIds: number[];
  telas: number[];
}

function ProtectedRoute({ children, requiredTelaIds, telas }: ProtectedRouteProps) {
  if (!telas.length) {
    return <Circular />;
  }
  const hasAccess = requiredTelaIds.some((id) => telas.includes(id));
  return hasAccess ? children : <Navigate to="*?error=403" />;
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

  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Circular />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/TelaInicial" /> : <Navigate to="/Login" />} />
        <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route element={isAuthenticated ? <Home /> : <Navigate to="/Login" />}>
          <Route path="TelaInicial" element={<TelaInicial />} />
          <Route
            path="Scrap"
            element={
              <ProtectedRoute requiredTelaIds={[101, 99]} telas={telas}>
                <Scrap />
              </ProtectedRoute>
            }
          />
          <Route
            path="AvaDesempenho"
            element={
              <ProtectedRoute requiredTelaIds={[1104, 99]} telas={telas}>
                <AvaDesempenho />
              </ProtectedRoute>
            }
          />
          <Route
            path="EntregaEPI"
            element={
              <ProtectedRoute requiredTelaIds={[250, 99]} telas={telas}>
                <EntregaEPI />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;