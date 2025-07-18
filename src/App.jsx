import { Route, Routes } from "react-router-dom";
import Header from './components/Header';
import { HomePage, Sucursales, SucursalDetalle, TrabajaConNosotrso, Contactanos } from './pages';
import Footer from './components/Footer';


function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/sucursales" element={<Sucursales />}/>
        <Route path="/sucursales/:nombre" element={<SucursalDetalle />} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotrso />} />
        <Route path="/contactos" element={<Contactanos />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
