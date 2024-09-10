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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
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

  return (
    <Router>
      {isAuthenticated === null ? (
<div style={{display: "flex",justifyContent: "center",alignItems: "center",height: "100vh"}} ><Circular/></div>
      ) : (
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/TelaInicial" /> : <Navigate to="/Login" />} />
          <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route element={isAuthenticated ? <Home /> : <Navigate to="/Login" />}>
            <Route path="TelaInicial" element={<TelaInicial />} />
            <Route path="Scrap" element={<Scrap />} />
            <Route path="EntregaEPI" element={<EntregaEPI />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
