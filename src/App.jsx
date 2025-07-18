import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import { HomePage, Sucursales } from './pages';

function App() {
  return (
    <>
      <Header/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/sucursales" element={<Sucursales />}/>
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App;