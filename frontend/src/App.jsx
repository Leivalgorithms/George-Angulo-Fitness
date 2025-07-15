import { Route, Routes } from "react-router-dom";
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';


function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/blog" element={<Blog />}/>
        <Route path="/blog/:id" element={<BlogDetail />}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
