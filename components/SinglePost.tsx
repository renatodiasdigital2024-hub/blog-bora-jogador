
import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import ShareButtons from './ShareButtons';
import Sidebar from './Sidebar';
import AdSensePlaceholder from './AdSensePlaceholder';
// Fix: Added MessageCircle to the imports
import { Clock, User, Calendar, MessageCircle } from 'lucide-react';

interface SinglePostProps {
  post: {
    title: string;
    category: string;
    subCategory: string;
    author: string;
    date: string;
    readTime: string;
    imageUrl: string;
  };
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Content */}
        <article className="lg:w-2/3">
          <Breadcrumbs 
            category={post.category} 
            subCategory={post.subCategory} 
            title={post.title} 
          />

          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest border-y border-zinc-900 py-4">
              <div className="flex items-center gap-2">
                <User size={14} className="text-green-500" />
                <span>Por <span className="text-white">{post.author}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-green-500" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-green-500" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <ShareButtons />
          </header>

          <div className="relative aspect-video mb-10 overflow-hidden rounded-xl">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 text-lg leading-relaxed font-normal">
            <p>
              O futebol brasileiro vive um momento de transição tática sem precedentes. Com a chegada de técnicos estrangeiros e a modernização dos processos de treinamento nacionais, o que vemos em campo hoje é muito diferente do que víamos há uma década.
            </p>
            
            <p>
              A principal mudança reside na ocupação de espaços e na velocidade de transição. Não se trata apenas de "correr mais", mas de correr de forma inteligente. O posicionamento do meio-campo tornou-se a chave para desbloquear defesas cada vez mais compactas e organizadas.
            </p>

            {/* In-Article Ad Slot */}
            <div className="my-10">
               <AdSensePlaceholder type="infeed" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mt-12 mb-4">
               A Evolução do Camisa 10
            </h2>
            
            <p>
              O antigo "meia clássico" está sendo substituído por jogadores mais versáteis. Hoje, espera-se que o criador também seja o primeiro a pressionar a saída de bola adversária. Essa dualidade exige um preparo físico de elite e uma leitura de jogo periférica que poucos possuem.
            </p>

            <blockquote className="border-l-4 border-green-500 pl-6 py-2 my-10 italic text-xl font-medium text-white bg-zinc-900/50 rounded-r-lg">
              "A tática sem talento é burocracia, mas o talento sem tática é desperdício. O equilíbrio é o que define o campeão."
            </blockquote>

            <p>
              Ao analisarmos as estatísticas da última rodada, percebemos que as equipes que mantiveram mais de 55% de posse de bola no terço final do campo tiveram 70% mais chances reais de gol. Isso reforça a tese de que o controle do jogo através do passe curto ainda é a arma mais letal.
            </p>

            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mt-12 mb-4">
               Conclusão da Rodada
            </h2>

            <p>
              Fiquem atentos aos próximos jogos. A tendência é que vejamos variações do 4-3-3 para o 3-2-5 em momentos ofensivos, uma estratégia que tem deixado as defesas adversárias completamente desorientadas. O Bora Jogador continuará acompanhando cada detalhe dessa evolução.
            </p>
          </div>

          {/* Post Footer */}
          <footer className="mt-16 pt-8 border-t border-zinc-900">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-black text-black">BJ</div>
              <div>
                <p className="text-white font-black uppercase text-sm">Equipe Bora Jogador</p>
                <p className="text-zinc-500 text-xs">Apaixonados por futebol, tática e a história do esporte mais amado do mundo.</p>
              </div>
            </div>

            {/* Related Posts Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                <span className="w-2 h-6 bg-green-500 inline-block"></span>
                Veja Também
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-video bg-zinc-900 rounded overflow-hidden mb-3">
                       <img src={`https://picsum.photos/id/${i+100}/400/250`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="text-sm font-bold text-zinc-300 group-hover:text-green-500 transition-colors leading-tight">
                      Título de um post relacionado muito importante para leitura
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Placeholder */}
            <div className="mt-16 bg-zinc-900/30 p-8 border border-zinc-900 rounded-xl text-center">
               <MessageCircle className="mx-auto text-zinc-700 mb-4" size={48} />
               <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest mb-4">Seção de Comentários</p>
               <button className="bg-white text-black px-6 py-2 font-black text-[10px] uppercase tracking-widest hover:bg-green-500 transition-colors">
                  Fazer Login para Comentar
               </button>
            </div>
          </footer>
        </article>

        {/* Sidebar */}
        <aside className="lg:w-1/3">
          <div className="sticky top-24 space-y-12">
            <Sidebar />
            <div className="hidden lg:block pt-4">
               <AdSensePlaceholder type="rectangle" />
               <div className="mt-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest text-center italic">Conteúdo Patrocinado</div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default SinglePost;
