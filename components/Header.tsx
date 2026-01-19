import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { sanityClient } from "../lib/sanity";

interface Category {
  title: string;
  slug: string;
  group: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `*[_type == "category"]{title, "slug": slug.current, group} | order(title asc)`;
        const result = await sanityClient.fetch(query);
        setCategories(result);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  const brasileirao = categories.filter(c => c.group === 'brasileirao');
  const soLendas = categories.filter(c => c.group === 'so-lendas');
  const olhoNoLance = categories.filter(c => c.group === 'olho-no-lance');

  return (
    // Aumentei a altura base do header no Desktop (md:h-24) para caber a logo maior
    <header className="bg-black text-white sticky top-0 z-50 border-b border-zinc-800 shadow-2xl font-sans transition-all duration-300">
      <nav className="container mx-auto px-4 h-20 md:h-24 flex justify-between items-center relative">

        {/* --- LOGO AJUSTADA --- 
            Mudanças:
            1. h-12 (Mobile) -> md:h-16 (Desktop): Ficou bem maior.
            2. rounded-xl: Cantos suaves (não espreme mais a imagem como o rounded-full).
            3. bg-white: Garante que o fundo branco fique uniforme.
        */}
        <a href="/" className="flex items-center hover:scale-105 transition transform py-2">
          <img
            src="/images/logo.png"
            alt="Bora Jogador"
            className="h-12 md:h-16 w-auto rounded-xl shadow-lg shadow-green-900/20 border-2 border-transparent hover:border-green-500 transition-all duration-300"
          />
        </a>

        {/* --- MENU DESKTOP --- */}
        <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center font-bold text-sm uppercase tracking-wide">
          <a href="/" className="hover:text-green-400 transition">Home</a>

          {/* Dropdown: Brasileirão */}
          <div className="group relative h-full flex items-center cursor-pointer">
            <span className="flex items-center hover:text-green-400 transition py-8">
              Brasileirão <ChevronDown size={14} className="ml-1" />
            </span>
            <div className="absolute top-full left-0 w-56 bg-zinc-900 border-t-2 border-green-500 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {brasileirao.map((cat) => (
                <a key={cat.slug} href={`/categoria/${cat.slug}`} className="block px-6 py-4 hover:bg-zinc-800 hover:text-green-400 border-b border-zinc-800 last:border-0 text-gray-300">
                  {cat.title}
                </a>
              ))}
            </div>
          </div>

          {/* Dropdown: Só Lendas */}
          <div className="group relative h-full flex items-center cursor-pointer">
            <span className="flex items-center hover:text-green-400 transition py-8">
              Só Lendas <ChevronDown size={14} className="ml-1" />
            </span>
            <div className="absolute top-full left-0 w-56 bg-zinc-900 border-t-2 border-green-500 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {soLendas.map((cat) => (
                <a key={cat.slug} href={`/categoria/${cat.slug}`} className="block px-6 py-4 hover:bg-zinc-800 hover:text-green-400 border-b border-zinc-800 last:border-0 text-gray-300">
                  {cat.title}
                </a>
              ))}
            </div>
          </div>

          {/* Dropdown: Olho no Lance */}
          <div className="group relative h-full flex items-center cursor-pointer">
            <span className="flex items-center hover:text-green-400 transition py-8">
              Olho no Lance <ChevronDown size={14} className="ml-1" />
            </span>
            <div className="absolute top-full left-0 w-56 bg-zinc-900 border-t-2 border-green-500 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {olhoNoLance.map((cat) => (
                <a key={cat.slug} href={`/categoria/${cat.slug}`} className="block px-6 py-4 hover:bg-zinc-800 hover:text-green-400 border-b border-zinc-800 last:border-0 text-gray-300">
                  {cat.title}
                </a>
              ))}
            </div>
          </div>

          <a href="/contato" className="hover:text-green-400 transition">Contato</a>

          <button className="hover:text-green-500 transition">
            <Search size={20} />
          </button>
        </div>

        {/* BOTÃO MENU MOBILE */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white focus:outline-none p-2">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* --- MENU MOBILE DRAWER --- */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-black border-l border-zinc-800 shadow-2xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 overflow-y-auto lg:hidden`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
            {/* Logo no Mobile também ajustada */}
            <img src="/images/logo.png" alt="Logo Mobile" className="h-12 w-auto rounded-lg shadow-sm" />
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col space-y-4 font-bold uppercase text-sm">
            <a href="/" className="block py-3 border-b border-zinc-900 hover:text-green-500 text-lg">HOME</a>

            <div className="py-2 border-b border-zinc-900">
              <span className="text-green-500 text-xs mb-3 block tracking-widest font-black">BRASILEIRÃO</span>
              {brasileirao.map((cat) => (
                <a key={cat.slug} href={`/categoria/${cat.slug}`} className="block py-3 pl-4 text-zinc-400 hover:text-white font-normal capitalize text-base">
                  {cat.title}
                </a>
              ))}
            </div>

            <div className="py-2 border-b border-zinc-900">
              <span className="text-green-500 text-xs mb-3 block tracking-widest font-black">SÓ LENDAS</span>
              {soLendas.map((cat) => (
                <a key={cat.slug} href={`/categoria/${cat.slug}`} className="block py-3 pl-4 text-zinc-400 hover:text-white font-normal capitalize text-base">
                  {cat.title}
                </a>
              ))}
            </div>

            <div className="py-2 border-b border-zinc-900">
              <span className="text-green-500 text-xs mb-3 block tracking-widest font-black">OLHO NO LANCE</span>
              {olhoNoLance.map((cat) => (
                <a key={cat.slug} href={`/categoria/${cat.slug}`} className="block py-3 pl-4 text-zinc-400 hover:text-white font-normal capitalize text-base">
                  {cat.title}
                </a>
              ))}
            </div>

            <a href="/contato" className="block py-3 hover:text-green-500 mt-2 text-lg">Fale Conosco</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
