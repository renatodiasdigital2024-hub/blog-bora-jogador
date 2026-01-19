import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanityClient, urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { Calendar, User, AlertCircle, TrendingUp } from "lucide-react";

interface Post {
  title: string;
  mainImage: any;
  body: any;
  content: any; // Adicionado para garantir
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
      // TRUQUE: Busca tanto 'body' quanto 'content' para não ter erro
      const query = `*[slug.current == $slug][0]{
        title,
        mainImage,
        body,
        content, 
        publishedAt,
        _createdAt,
        author->{name},
        categories[]->{title}
      }`;
      const data = await sanityClient.fetch(query, { slug });
      setPost(data);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (!post) return <div className="text-white text-center py-20">Carregando notícia...</div>;

  const displayDate = new Date(post.publishedAt || post._createdAt).toLocaleDateString();
  // Usa o que tiver disponível: body ou content
  const textContent = post.body || post.content;

  return (
    <div className="bg-black min-h-screen text-white font-sans pb-20">

      {/* CABEÇALHO */}
      <div className="relative h-[50vh] w-full">
        {post.mainImage ? (
          <img src={urlFor(post.mainImage).url()} alt={post.title} className="w-full h-full object-cover opacity-40" />
        ) : (
          <div className="w-full h-full bg-zinc-900 opacity-50"></div>
        )}
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
        {/* CONTEÚDO DO TEXTO */}
        <div className="lg:col-span-8">
          <article className="prose prose-invert prose-lg prose-green max-w-none">
            {textContent ? (
              <PortableText
                value={textContent}
                components={{
                  types: {
                    image: ({ value }: any) => <img src={urlFor(value).url()} alt="Foto interna" className="w-full rounded-lg my-8" />,
                  }
                }}
              />
            ) : (
              <div className="bg-zinc-900 p-6 rounded border border-yellow-600 text-yellow-500 flex items-center">
                <AlertCircle className="mr-3" />
                <div>
                  <strong>Ops! O texto ainda não apareceu.</strong><br />
                  Isso confirma que o campo no Sanity tem um nome diferente de 'body' ou 'content'.
                </div>
              </div>
            )}
          </article>
        </div>

        {/* SIDEBAR MELHORADA */}
        <div className="lg:col-span-4 space-y-8">
          {/* Widget 1: Autor */}
          <div className="bg-zinc-900 p-6 rounded border-l-4 border-green-500">
            <h3 className="font-bold text-white uppercase text-sm mb-2 flex items-center">
              <TrendingUp size={16} className="mr-2 text-green-500" /> Em Alta
            </h3>
            <ul className="space-y-3">
              <li className="text-zinc-400 text-sm border-b border-zinc-800 pb-2 hover:text-green-500 cursor-pointer">
                • As maiores contratações da janela
              </li>
              <li className="text-zinc-400 text-sm border-b border-zinc-800 pb-2 hover:text-green-500 cursor-pointer">
                • Análise tática: O novo esquema do Flamengo
              </li>
              <li className="text-zinc-400 text-sm hover:text-green-500 cursor-pointer">
                • Quem cai e quem sobe no Brasileirão?
              </li>
            </ul>
          </div>

          {/* Widget 2: Publicidade */}
          <div className="bg-zinc-900 p-6 rounded border border-zinc-800 text-center">
            <span className="text-xs font-bold text-zinc-500 uppercase block mb-2">Publicidade</span>
            <div className="w-full h-64 bg-zinc-800 flex items-center justify-center text-zinc-600 font-bold">
              ESPAÇO GOOGLE ADS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;