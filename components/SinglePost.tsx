import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanityClient, urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { Calendar, User, Clock, Share2, Twitter, Link as LinkIcon, Search, ChevronRight, Home as HomeIcon } from "lucide-react";

interface Post {
  title: string;
  mainImage: any;
  body: any;
  content: any;
  publishedAt: string;
  _createdAt: string;
  author: { name: string };
  categories: { title: string }[];
}

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const query = `*[slug.current == $slug][0]{
        title, mainImage, body, content, publishedAt, _createdAt,
        author->{name}, categories[]->{title}
      }`;
      const data = await sanityClient.fetch(query, { slug });
      setPost(data);
    };
    if (slug) fetchPost();
  }, [slug]);

  if (!post) return <div className="bg-black min-h-screen flex items-center justify-center text-white font-bold">CARREGANDO NOTÍCIA...</div>;

  const displayDate = new Date(post.publishedAt || post._createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const textContent = post.body || post.content;
  const categoryName = post.categories?.[0]?.title || "Notícias";

  return (
    <div className="bg-black min-h-screen text-white font-sans pt-8 pb-20">

      <div className="container mx-auto px-4">

        {/* 1. BREADCRUMBS (IGUAL AO PRINT) */}
        <div className="flex items-center text-[10px] md:text-xs font-bold uppercase text-zinc-500 mb-8 space-x-2 tracking-widest">
          <a href="/" className="hover:text-white flex items-center transition"><HomeIcon size={12} className="mr-1 mb-[2px]" /> INÍCIO</a>
          <ChevronRight size={10} />
          <span className="text-zinc-400">{categoryName}</span>
          <ChevronRight size={10} />
          <span className="text-green-500 truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* 2. TÍTULO GIGANTE E BRANCO */}
        <h1 className="text-3xl md:text-6xl font-black italic uppercase leading-tight mb-8 text-white max-w-5xl">
          {post.title}
        </h1>

        {/* 3. BARRA DE AUTOR E DATA (META INFO) */}
        <div className="flex flex-col md:flex-row md:items-center border-t border-b border-zinc-800 py-6 mb-10 gap-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold text-black uppercase mr-3">
              {post.author?.name?.charAt(0) || "R"}
            </div>
            <div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Por</span>
              <span className="text-sm font-bold text-white uppercase">{post.author?.name || "Redação Bora Jogador"}</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-zinc-800"></div>

          <div className="flex items-center gap-6 text-xs font-bold text-zinc-400 uppercase">
            <div className="flex items-center"><Calendar size={14} className="mr-2 text-green-500" /> {displayDate}</div>
            <div className="flex items-center"><Clock size={14} className="mr-2 text-green-500" /> 5 min de leitura</div>
          </div>
        </div>

        {/* 4. BOTÕES DE COMPARTILHAR (COLORIDOS) */}
        <div className="flex space-x-3 mb-10">
          <button className="bg-[#25D366] hover:brightness-110 text-white px-5 py-3 rounded font-bold text-xs uppercase flex items-center transition">
            <Share2 size={16} className="mr-2" /> WhatsApp
          </button>
          <button className="bg-[#1DA1F2] hover:brightness-110 text-white px-5 py-3 rounded font-bold text-xs uppercase flex items-center transition">
            <Twitter size={16} className="mr-2" /> Tweetar
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-3 rounded font-bold text-xs uppercase flex items-center transition">
            <LinkIcon size={16} className="mr-2" /> Copiar Link
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* --- COLUNA PRINCIPAL (TEXTO) --- */}
          <div className="lg:col-span-8">
            {/* IMAGEM GIGANTE */}
            <div className="w-full rounded-xl overflow-hidden mb-12 shadow-2xl border border-zinc-800">
              {post.mainImage ? (
                <img src={urlFor(post.mainImage).width(1200).url()} alt={post.title} className="w-full h-auto object-cover" />
              ) : (
                <div className="w-full h-96 bg-zinc-900 flex items-center justify-center text-zinc-600 font-bold uppercase">Sem Imagem de Capa</div>
              )}
            </div>

            {/* TEXTO DO POST */}
            <article className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-300 prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-green-500">
              {textContent ? (
                <PortableText
                  value={textContent}
                  components={{
                    types: { image: ({ value }: any) => <img src={urlFor(value).url()} alt="Imagem interna" className="w-full rounded-lg my-8 border border-zinc-800" /> }
                  }}
                />
              ) : (
                <div className="p-8 border border-dashed border-red-900 bg-red-900/10 text-red-200 rounded text-center">
                  <h3 className="font-bold text-xl mb-2">Conteúdo não encontrado</h3>
                  <p>Verifique no Sanity se você escreveu o texto no campo correto.</p>
                </div>
              )}
            </article>
          </div>

          {/* --- SIDEBAR (LATERAL) --- */}
          <div className="lg:col-span-4 space-y-12">

            {/* PESQUISAR */}
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
              <h3 className="text-xs font-bold text-green-500 uppercase mb-4 border-l-2 border-green-500 pl-3">Pesquisar no Blog</h3>
              <div className="relative">
                <input type="text" placeholder="Ex: Tática, Craques..." className="w-full bg-black border border-zinc-700 text-white px-4 py-4 rounded-lg focus:outline-none focus:border-green-500 text-sm font-medium" />
                <Search className="absolute right-4 top-4 text-zinc-500" size={20} />
              </div>
            </div>

            {/* PUBLICIDADE */}
            <div className="flex flex-col items-center justify-center p-6 bg-black border border-zinc-800 rounded-xl">
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-4">Publicidade</span>
              <div className="w-[300px] h-[250px] bg-zinc-900 flex items-center justify-center text-zinc-700 font-bold border border-zinc-800">
                GOOGLE ADS
              </div>
            </div>

            {/* MAIS LIDAS */}
            <div>
              <h3 className="text-xl font-black italic uppercase mb-8 border-l-4 border-green-500 pl-4">Mais <span className="text-green-500">Lidas</span></h3>
              <div className="space-y-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-start group cursor-pointer border-b border-zinc-900 pb-6 last:border-0">
                    <span className="text-5xl font-black text-zinc-800 mr-5 leading-none group-hover:text-green-900 transition">0{num}</span>
                    <div>
                      <span className="text-[10px] font-bold text-green-500 uppercase mb-1 block">Em Alta</span>
                      <h4 className="font-bold leading-tight text-sm text-zinc-200 group-hover:text-green-500 transition">
                        Como o calendário de 2026 vai impactar os estaduais
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;