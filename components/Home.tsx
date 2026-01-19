import React, { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';
import { Clock, AlertTriangle } from 'lucide-react';

const Home = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("Iniciando busca...");

                // Query super simples para testar a conexão primeiro
                const query = `*[_type == "post"] | order(_createdAt desc){
          _id,
          title,
          "slug": slug.current,
          mainImage,
          publishedAt
        }`;

                const data = await sanityClient.fetch(query);
                console.log("Dados recebidos:", data);

                if (!data || data.length === 0) {
                    setErrorMsg("CONEXÃO OK, MAS 0 NOTÍCIAS ENCONTRADAS. Verifique se você clicou em 'Publish' no Sanity.");
                } else {
                    setPosts(data);
                }

            } catch (error: any) {
                console.error("Erro fatal:", error);
                // Aqui pegamos o erro real para mostrar na tela
                setErrorMsg(`ERRO TÉCNICO: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="bg-black h-screen text-white flex items-center justify-center text-2xl">Testando conexão...</div>;

    // TELA DE ERRO (Se algo der errado, vai aparecer aqui em vermelho)
    if (errorMsg) {
        return (
            <div className="bg-black h-screen flex flex-col items-center justify-center text-center p-10">
                <AlertTriangle size={64} className="text-red-500 mb-4" />
                <h1 className="text-3xl font-bold text-white mb-4">Diagnóstico do Problema</h1>
                <div className="bg-zinc-900 border border-red-500 p-6 rounded-lg max-w-2xl">
                    <p className="text-red-400 font-mono text-xl">{errorMsg}</p>
                </div>
                <p className="text-zinc-500 mt-8">Tire um print desta tela e me mande!</p>
            </div>
        );
    }

    // SE FUNCIONAR, MOSTRA A LISTA SIMPLES
    return (
        <div className="bg-black min-h-screen text-white p-10 container mx-auto">
            <h1 className="text-3xl font-bold text-green-500 mb-8">SUCESSO! CONEXÃO ESTABELECIDA</h1>
            <p className="mb-8 text-zinc-400">Se você está vendo isso, o problema era apenas na busca anterior. Suas notícias são:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post._id} className="border border-zinc-800 p-4 rounded bg-zinc-900">
                        <h2 className="font-bold text-lg">{post.title}</h2>
                        <p className="text-xs text-zinc-500 mt-2">{post._id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
