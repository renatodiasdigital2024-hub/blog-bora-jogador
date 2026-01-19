import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanityClient, urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { Calendar, User, AlertCircle, Search } from "lucide-react";

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

  if (!post) return <div className="text-white text-center py-20">Carregando notícia...</div>;

  const displayDate = new Date(post.publishedAt || post._createdAt).toLocaleDateString();
  const textContent = post.body || post.content;

  return (
    <div className="bg-black min-h-screen text-white font-sans pb-20">

      {/* HEADER DA NOTÍCIA */}
      <div className="relative h-[50vh] w-full">
        {post.mainImage ? (
          <img src={urlFor(post.mainImage).url()} alt={post.title} className="w-full h-full object-cover opacity-40" />
        ) : (<div className="w-full h-full bg-zinc-900 opacity-50"></div>)}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 container mx-auto">
          <div className="flex space-x-2 mb-4">
            {post.categories?.map((cat, index) => (
              <span key={index} className="bg-green-600 text-black px-3 py-1 text-xs font-bold uppercase rounded">{cat.title}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-black italic uppercase leading-tight mb-6 max-w-4xl shadow-black drop-shadow-lg">
            {post.title}
          </h1>
          <div className="flex items-center space-x-6 text-zinc-300 text-sm font-medium">
            <div className="flex items-center"><User size={16} className="mr-2 text-green-500" /> {post.author?.name || "Redação"}</div>
            <div className="flex items-center"><Calendar size={16} className="mr-2 text-green-500" /> {displayDate}</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* TEXTO */}
        <div className="lg:col-span-8">
          <article className="prose prose-invert prose-lg prose-green max-w-none">
            {textContent ? (
              <PortableText
                value={textContent}
                components={{
                  types: { image: ({ value }: any) => <img src={urlFor(value).url()} alt="Foto interna" className="w-full rounded-lg my-8" /> }
                }}
              />
            ) : (
              <div className="bg-zinc-900 p-6 rounded border border-yellow-600 text-yellow-500 flex items-center">
                <AlertCircle className="mr-3" />
                <div><strong>Aviso:</strong> O texto não foi encontrado. Verifique se preencheu 'Body' no Sanity.</div>
              </div>
            )}
          </article>
        </div>

        {/* SIDEBAR IGUAL À HOME */}
        <div className="lg:col-span-4 space-y-10">
          {/* WIDGET: PUBLICIDADE */}
          <div className="bg-zinc-900 p-6 rounded border border-zinc-800 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-zinc-600 uppercase mb-2 tracking-widest">Publicidade</span>
            <div className="w-[300px] h-[250px] bg-zinc-800 flex items-center justify-center text-zinc-600 font-bold border border-zinc-700">ADSENSE 300x250</div>
          </div>

          {/* WIDGET: MAIS LIDAS */}
          <div>
            <h3 className="text-xl font-black italic uppercase mb-6 border-l-4 border-green-500 pl-3">Mais <span className="text-green-500">Lidas</span></h3>
            <div className="space-y-6">
              <div className="flex items-start group cursor-pointer">
                <span className="text-5xl font-black text-zinc-800 mr-4 leading-none group-hover:text-green-900 transition">01</span>
                <div><span className="text-[10px] font-bold text-green-500 uppercase">Futebol</span><h4 className="font-bold leading-tight group-hover:text-green-500 transition">Onde assistir aos jogos da Champions</h4></div>
              </div>
              <div className="flex items-start group cursor-pointer">
                <span className="text-5xl font-black text-zinc-800 mr-4 leading-none group-hover:text-green-900 transition">02</span>
                <div><span className="text-[10px] font-bold text-green-500 uppercase">Mercado</span><h4 className="font-bold leading-tight group-hover:text-green-500 transition">Flamengo busca reforço</h4></div>
              </div>
            </div>
          </div>

          {/* WIDGET: BOLA NA CAIXA */}
          <div className="bg-green-600 p-8 rounded-lg text-center shadow-lg shadow-green-900/20">
            <h3 className="font-black italic uppercase text-black text-2xl mb-2">BOLA NA CAIXA</h3>
            <p className="text-black text-sm font-medium mb-6 px-2">Receba as melhores análises e notícias.</p>
            <input type="email" placeholder="Seu melhor e-mail" className="w-full bg-white/90 border-0 text-black px-4 py-3 rounded mb-3 focus:outline-none placeholder-zinc-500 font-bold text-sm" />
            <button className="bg-black text-white w-full py-3 font-black uppercase text-sm hover:bg-zinc-800 transition shadow-lg">INSCREVER-SE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;