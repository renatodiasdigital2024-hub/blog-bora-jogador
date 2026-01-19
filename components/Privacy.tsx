import React from 'react';

const Privacy = () => {
    return (
        <div className="bg-black text-white min-h-screen font-sans">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-black uppercase mb-8 text-green-500">Política de Privacidade</h1>

                <div className="space-y-6 text-zinc-400 text-sm leading-relaxed text-justify">
                    <p>A sua privacidade é importante para nós. É política do Bora Jogador respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Bora Jogador, e outros sites que possuímos e operamos.</p>

                    <h2 className="text-xl font-bold text-white mt-6">Google AdSense</h2>
                    <p>O Google, como fornecedor de terceiros, utiliza cookies para exibir anúncios. Com o cookie DART, o Google pode exibir anúncios para seus usuários com base nas visitas feitas ao nosso site e a outros sites na Internet. Os usuários podem desativar o cookie DART visitando a Política de privacidade da rede de conteúdo e dos anúncios do Google.</p>

                    <h2 className="text-xl font-bold text-white mt-6">Cookies</h2>
                    <p>Utilizamos cookies para armazenar informações, tais como as suas preferências pessoais quando visita o nosso website. Isto poderá incluir um simples popup, ou uma ligação em vários serviços que providenciamos, tais como fóruns.</p>

                    <h2 className="text-xl font-bold text-white mt-6">Compromisso do Usuário</h2>
                    <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Bora Jogador oferece no site e com caráter enunciativo, mas não limitativo:
                        A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
                        B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou casas de apostas ilegais, apologia ao terrorismo ou contra os direitos humanos.</p>

                    <p className="mt-8 pt-8 border-t border-zinc-800">Esta política é efetiva a partir de <strong>Janeiro/2026</strong>.</p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
