import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui entra a lógica de envio real depois
        setSubmitted(true);
    };

    return (
        <div className="bg-white min-h-screen pb-12">
            {/* Banner Topo */}
            <div className="bg-black text-white py-16 text-center border-b-4 border-green-600">
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">
                    Fale com a <span className="text-green-500">Gente</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto px-4">
                    Quer sugerir uma pauta, criticar uma análise ou anunciar no Bora Jogador?
                    Mande sua mensagem que a gente responde na lata.
                </p>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-12">

                    {/* Informações de Contato */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 uppercase italic">
                            Canais de Atendimento
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full text-green-700">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">E-mail</h3>
                                    <p className="text-gray-600">contato@borajogador.com.br</p>
                                    <p className="text-gray-500 text-sm">Parcerias e Publicidade</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full text-green-700">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">WhatsApp</h3>
                                    <p className="text-gray-600">(21) 99999-9999</p>
                                    <p className="text-gray-500 text-sm">Seg a Sex, das 9h às 18h</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full text-green-700">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Redação</h3>
                                    <p className="text-gray-600">Barra da Tijuca, Rio de Janeiro - RJ</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulário */}
                    <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="text-green-500 text-5xl mb-4">✓</div>
                                <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
                                <p className="text-gray-600">Obrigado pelo contato, Renato. Em breve te respondemos.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-green-600 font-bold hover:underline"
                                >
                                    Enviar outra mensagem
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Seu Nome</label>
                                    <input required type="text" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition" placeholder="Ex: Renato Dias" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
                                    <input required type="email" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition" placeholder="seu@email.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Assunto</label>
                                    <select className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition">
                                        <option>Sugestão de Pauta</option>
                                        <option>Publicidade</option>
                                        <option>Reportar Erro</option>
                                        <option>Outros</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mensagem</label>
                                    <textarea required rows={4} className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition" placeholder="Escreva sua mensagem aqui..."></textarea>
                                </div>

                                <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded hover:bg-green-600 transition duration-300 uppercase tracking-wide">
                                    Enviar Mensagem
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
