import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import { Contactanos, HomePage, Servicios, SucursalDetalle, Sucursales, TrabajaConNosotrso } from './pages';
import ConfirmPage from './pages/confirm';

const ScrollToTopOnMount = ({ children }) => {
  const location = useLocation();
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

function App() {
  return (
    <>
        <Header/>
        <main className="main-content">
          <ScrollToTopOnMount>
          <Routes>
            <Route path="/pages/confirm" element={<ConfirmPage />} />
            <Route path="/" element={<HomePage />}/>
            <Route path="/sucursales" element={<Sucursales />}/>
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/sucursales/:nombre" element={<SucursalDetalle />} />
            <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotrso />} />
            <Route path="/contactos" element={<Contactanos />} />
          </Routes>
          </ScrollToTopOnMount>
        </main>
        <Footer/>
    </>
  )
}

export default App;