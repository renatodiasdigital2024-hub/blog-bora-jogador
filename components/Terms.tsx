import React from 'react';

const Terms = () => {
    return (
        <div className="bg-black text-white min-h-screen font-sans">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-black uppercase mb-8 text-green-500">Termos de Uso</h1>

                <div className="space-y-6 text-zinc-400 text-sm leading-relaxed text-justify">
                    <h2 className="text-xl font-bold text-white">1. Termos</h2>
                    <p>Ao acessar ao site Bora Jogador, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.</p>

                    <h2 className="text-xl font-bold text-white mt-6">2. Uso de Licença</h2>
                    <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Bora Jogador , apenas para visualização transitória pessoal e não comercial.</p>

                    <h2 className="text-xl font-bold text-white mt-6">3. Isenção de responsabilidade</h2>
                    <p>Os materiais no site da Bora Jogador são fornecidos 'como estão'. Bora Jogador não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização.</p>

                    <h2 className="text-xl font-bold text-white mt-6">4. Limitações</h2>
                    <p>Em nenhum caso o Bora Jogador ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Bora Jogador.</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
