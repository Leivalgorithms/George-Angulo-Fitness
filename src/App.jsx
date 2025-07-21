import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import { Contactanos, HomePage, Servicios, SucursalDetalle, Sucursales, TrabajaConNosotrso } from './pages';
import ConfirmPage from './pages/confirm';


function App() {

  return (
    <>
      <Header/>
      <main className="main-content">
        <Routes>
          <Route path="/pages/confirm" element={<ConfirmPage />} />
          <Route path="/" element={<HomePage />}/>
          <Route path="/sucursales" element={<Sucursales />}/>
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/sucursales/:nombre" element={<SucursalDetalle />} />
          <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotrso />} />
          <Route path="/contactos" element={<Contactanos />} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App;
