import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white border-t border-zinc-900 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Logo e Resumo */}
                    <div className="md:col-span-1">
                        <h2 className="text-2xl font-black italic tracking-tighter mb-4">
                            BORA <span className="text-green-500">JOGADOR</span>
                        </h2>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            O melhor do futebol brasileiro e mundial analisado com seriedade, paixão e tática.
                        </p>
                    </div>

                    {/* Links 1: Categorias que EXISTEM de verdade */}
                    <div>
                        <h3 className="font-bold text-sm uppercase text-white mb-4 tracking-wider">Destaques</h3>
                        <ul className="space-y-2 text-sm text-zinc-500 font-medium">
                            <li><a href="/categoria/ultimas" className="hover:text-green-500 transition">Brasileirão - Últimas</a></li>
                            <li><a href="/categoria/bola-cheia-bola-murcha" className="hover:text-green-500 transition">Bola Cheia / Bola Murcha</a></li>
                            <li><a href="/categoria/craques-do-passado" className="hover:text-green-500 transition">Só Lendas</a></li>
                            <li><a href="/categoria/formacao-tatica" className="hover:text-green-500 transition">Olho no Lance (Tática)</a></li>
                        </ul>
                    </div>

                    {/* Links 2: Institucional (Agora Funcionam) */}
                    <div>
                        <h3 className="font-bold text-sm uppercase text-white mb-4 tracking-wider">Institucional</h3>
                        <ul className="space-y-2 text-sm text-zinc-500 font-medium">
                            <li><a href="/sobre" className="hover:text-green-500 transition">Sobre Nós</a></li>
                            <li><a href="/sobre" className="hover:text-green-500 transition">Nossa História</a></li>
                            <li><a href="/contato" className="hover:text-green-500 transition">Contato & Anuncie</a></li>
                            <li><a href="/privacidade" className="hover:text-green-500 transition">Política de Privacidade</a></li>
                            <li><a href="/termos" className="hover:text-green-500 transition">Termos de Uso</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="font-bold text-sm uppercase text-white mb-4 tracking-wider">Siga a Resenha</h3>
                        <div className="flex space-x-3">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-zinc-900 p-3 rounded-full hover:bg-green-600 hover:text-black transition text-zinc-400"><Instagram size={18} /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-zinc-900 p-3 rounded-full hover:bg-green-600 hover:text-black transition text-zinc-400"><Twitter size={18} /></a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-zinc-900 p-3 rounded-full hover:bg-green-600 hover:text-black transition text-zinc-400"><Youtube size={18} /></a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-zinc-900 p-3 rounded-full hover:bg-green-600 hover:text-black transition text-zinc-400"><Facebook size={18} /></a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 font-bold uppercase tracking-widest">
                    <p>© 2026 Bora Jogador. Todos os direitos reservados.</p>
                    <p className="mt-2 md:mt-0">Desenvolvido com Paixão</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
