import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Category from './components/Category'; // <--- IMPORTANTE: Importe o arquivo novo
import Contact from './components/Contact';
import About from './components/About';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black font-sans text-white flex flex-col"> {/* Mudei para bg-black aqui também para garantir */}
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />

            {/* Rota Dinâmica para Categorias */}
            <Route path="/categoria/:slug" element={<Category />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
