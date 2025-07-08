import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import { HomePage, SucursalDetalle, Sucursales } from './pages';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/sucursal/:nombre" element={<SucursalDetalle />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
