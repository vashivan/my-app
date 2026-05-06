import { Routes, Route } from 'react-router-dom';
import Home from './compomnents/home/Home';
import Contact from './compomnents/contact/Contact';
import Navbar from './compomnents/navbar/Navbar';
import Footer from './compomnents/footer/Footer';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;