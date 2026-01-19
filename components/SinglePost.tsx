import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanityClient, urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { Calendar, Clock, Share2, Twitter, Link as LinkIcon, Search, ChevronRight, Home as HomeIcon, MessageCircle } from "lucide-react";

interface Post {
  title: string;
  mainImage: any;
  body: any;
  content: any;
  publishedAt: string;
  _createdAt: string;
  author: { name: string };
  categories: { title: string }[];
  related: { title: string; mainImage: any; slug: string }[];
}

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const query = `*[slug.current == $slug][0]{
        title, mainImage, body, content, publishedAt, _createdAt,
        author->{name}, categories[]->{title},
        "related": *[_type == "post" && slug.current != $slug][0..2]{
          title, mainImage, "slug": slug.current
        }
      }`;
      const data = await sanityClient.fetch(query, { slug });
      setPost(data);
    };
    if (slug) fetchPost();
  }, [slug]);

  if (!post) return <div className="bg-black min-h-screen flex items-center justify-center text-white font-bold uppercase tracking-widest">Carregando Notícia...</div>;

  const displayDate = new Date(post.publishedAt || post._createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const textContent = post.body || post.content;
  const categoryName = post.categories?.[0]?.title || "Notícias";

  return (
    <div className="bg-black min-h-screen text-white font-sans pt-10 pb-20">

      <div className="container mx-auto px-4">

        {/* --- BREADCRUMBS --- */}
        <div className="flex items-center text-[10px] font-bold uppercase text-zinc-500 mb-6 tracking-widest">
          <a href="/" className="hover:text-green-500 flex items-center transition"><HomeIcon size={12} className="mr-2 mb-[1px]" /> INÍCIO</a>
          <ChevronRight size={10} className="mx-2" />
          <span className="text-zinc-400 hover:text-green-500 cursor-pointer transition">{categoryName}</span>
          <ChevronRight size={10} className="mx-2" />
          <span className="text-green-600 truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* --- TÍTULO --- */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black italic uppercase leading-none mb-8 text-white max-w-5xl tracking-tight">
          {post.title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center border-t border-b border-zinc-800 py-6 mb-10 gap-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold text-black uppercase mr-3 shadow-[0_0_10px_rgba(22,163,74,0.5)]">
              {post.author?.name?.charAt(0) || "R"}
            </div>
            <div>
              <span className="text-[9px] font-bold text-zinc-500 uppercase block tracking-wider">Por</span>
              <span className="text-xs font-bold text-white uppercase tracking-wide">{post.author?.name || "Redação Bora Jogador"}</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-zinc-800"></div>

          <div className="flex items-center gap-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <div className="flex items-center"><Calendar size={14} className="mr-2 text-green-500" /> {displayDate}</div>
            <div className="flex items-center"><Clock size={14} className="mr-2 text-green-500" /> 5 min de leitura</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* --- CONTEÚDO --- */}
          <div className="lg:col-span-8">

            {/* BOTÕES */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="bg-[#25D366] hover:brightness-110 text-white px-5 py-3 rounded font-black text-[10px] uppercase flex items-center transition tracking-widest"><Share2 size={16} className="mr-2" /> WhatsApp</button>
              <button className="bg-[#1DA1F2] hover:brightness-110 text-white px-5 py-3 rounded font-black text-[10px] uppercase flex items-center transition tracking-widest"><Twitter size={16} className="mr-2" /> Tweetar</button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-3 rounded font-black text-[10px] uppercase flex items-center transition tracking-widest"><LinkIcon size={16} className="mr-2" /> Copiar Link</button>
            </div>

            {/* IMAGEM CAPA */}
            <div className="w-full rounded-xl overflow-hidden mb-12 shadow-2xl border border-zinc-800 relative group">
              {post.mainImage ? (
                <img src={urlFor(post.mainImage).width(1200).url()} alt={post.title} className="w-full h-auto object-cover group-hover:scale-105 transition duration-700" />
              ) : (
                <div className="w-full h-96 bg-zinc-900 flex items-center justify-center text-zinc-600 font-bold uppercase">Sem Imagem de Capa</div>
              )}
            </div>

            {/* TEXTO */}
            <article className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-300 prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-green-500 prose-strong:text-white">
              {textContent ? (
                <PortableText
                  value={textContent}
                  components={{
                    types: { image: ({ value }: any) => <img src={urlFor(value).url()} alt="Imagem interna" className="w-full rounded-lg my-8 border border-zinc-800" /> }
                  }}
                />
              ) : (
                <div className="p-8 border border-dashed border-zinc-800 bg-zinc-900/30 text-zinc-500 rounded text-center"><p>Conteúdo em atualização...</p></div>
              )}
            </article>

            {/* VEJA TAMBÉM */}
            <div className="mt-16 border-t border-zinc-800 pt-10">
              <h3 className="text-xl font-black italic uppercase mb-8 border-l-4 border-green-500 pl-4 text-white">Veja <span className="text-green-500">Também</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {post.related?.map((item: any, idx: number) => (
                  <a key={idx} href={`/post/${item.slug}`} className="group block">
                    <div className="h-40 overflow-hidden rounded mb-3 border border-zinc-800">
                      {item.mainImage ? (<img src={urlFor(item.mainImage).width(400).url()} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />) : <div className="w-full h-full bg-zinc-800" />}
                    </div>
                    <h4 className="font-bold text-xs uppercase leading-tight group-hover:text-green-500 transition line-clamp-2">{item.title}</h4>
                  </a>
                ))}
              </div>
            </div>

            {/* COMENTÁRIOS */}
            <div className="mt-16 bg-zinc-900/30 border border-zinc-800 rounded-lg p-10 text-center">
              <MessageCircle size={40} className="mx-auto text-zinc-600 mb-4" />
              <h3 className="text-lg font-bold text-white uppercase mb-2">Seção de Comentários</h3>
              <p className="text-zinc-500 text-sm mb-6">Faça login para participar da discussão.</p>
              <button className="bg-white text-black font-black uppercase text-xs px-8 py-3 hover:bg-green-500 transition">Fazer Login</button>
            </div>
          </div>

          {/* --- SIDEBAR DIREITA (Anúncios Aqui) --- */}
          <div className="lg:col-span-4 space-y-10">
            {/* PESQUISAR */}
            <div className="bg-[#0a0a0a] p-6 rounded-lg border border-zinc-800 shadow-lg">
              <h3 className="text-xs font-black text-green-500 uppercase mb-4 border-l-4 border-green-500 pl-3 tracking-widest">Pesquisar</h3>
              <div className="relative">
                <input type="text" placeholder="Ex: Tática..." className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded focus:outline-none focus:border-green-500 text-sm" />
                <Search className="absolute right-4 top-4 text-zinc-500" size={18} />
              </div>
            </div>

            {/* ESPAÇO ADSENSE 2 */}
            <div className="bg-zinc-900/20 p-6 rounded border border-zinc-800 flex flex-col items-center justify-center">
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mb-3">Publicidade</span>
              <div className="w-[300px] h-[250px] bg-zinc-900 flex items-center justify-center text-zinc-700 font-bold border border-zinc-800 uppercase tracking-widest text-xs">Espaço Google Ads</div>
            </div>

            {/* MAIS LIDAS */}
            <div>
              <h3 className="text-xl font-black italic uppercase mb-8 border-l-4 border-green-500 pl-4">Mais <span className="text-green-500">Lidas</span></h3>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex items-center group cursor-pointer border-b border-zinc-900/50 pb-4 last:border-0">
                    <span className="text-4xl font-black text-zinc-800 mr-5 leading-none group-hover:text-green-900 transition">0{num}</span>
                    <div><h4 className="font-bold leading-tight text-xs text-zinc-300 group-hover:text-green-500 transition uppercase">Análise Tática: Como o Palmeiras dominou</h4></div>
                  </div>
                ))}
              </div>
            </div>

            {/* ADSENSE VERTICAL */}
            <div className="bg-zinc-900/20 p-4 rounded border border-zinc-800 min-h-[400px] flex flex-col items-center justify-center">
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mb-3">Publicidade Vertical</span>
              <div className="w-full h-full flex-1 bg-zinc-900 flex items-center justify-center text-zinc-700 font-bold border border-zinc-800 uppercase text-xs">AdSense Vertical</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;