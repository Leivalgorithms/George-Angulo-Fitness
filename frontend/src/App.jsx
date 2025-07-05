import { Route, Routes } from "react-router-dom";
import Header from './components/Header';
import { HomePage, Sucursales } from './pages';
import Footer from './components/Footer';


function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/sucursales" element={<Sucursales />}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
