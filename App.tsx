import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Category from './components/Category';
import SinglePost from './components/SinglePost'; // <--- IMPORTANTE: Importar o novo arquivo
import Contact from './components/Contact';
import About from './components/About';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black font-sans text-white flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* ROTA DAS NOTÍCIAS (Isso estava faltando!) */}
            <Route path="/post/:slug" element={<SinglePost />} />

            <Route path="/categoria/:slug" element={<Category />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
