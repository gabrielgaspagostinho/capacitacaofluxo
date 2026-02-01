"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { products, getTagName } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ChevronLeft, Star, ShoppingBag, Truck } from "@deemlol/next-icons";
import { useState } from "react";



// Helper para cores das tags
const getTagColor = (id: number) => {
    const colors: Record<number, string> = {
        1: "bg-green-100 text-green-700",   // Vegano
        2: "bg-emerald-100 text-emerald-700", // Vegetariano
        3: "bg-amber-100 text-amber-700",    // Sem Glúten
        4: "bg-sky-100 text-sky-700",        // Sem Lactose
        5: "bg-rose-100 text-rose-700",      // Zero Açúcar
        6: "bg-indigo-100 text-indigo-700",  // Proteico
    };
    return colors[id] || "bg-gray-100 text-gray-700";
};

interface ProdutoPageProps {
    params: Promise<{ id: string }>;
}

export default function ProdutoPage() {

    //para pegar o id da url
    const params = useParams();
    const id = Number(params.id);

    const product = products.find((p) => p.id === id);

    const [favorito, setFavorito] = useState<boolean>(product ? product.favorited : false);

    // Se não achar, 404 (é obrigatorio pelo visto)
    if (!product) {
        return notFound();
    };

    // Buscar relacionados
    const relacionados = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="pb-16 mt-8 mx-5">

            {/* Botão Voltar */}
            <div className="mb-1 lg:mb-8 mt-18 md:mt-25 lg:mt-0">
                <Link
                    href={`/${product.category}`}
                    className="inline-flex items-center text-mocha/60 hover:text-dusty-rose transition-colors font-medium"
                >
                    <ChevronLeft size={20} />
                    Voltar para {product.category === 'doces' ? 'Doces' : 'Bebidas'}
                </Link>
            </div>

            <section className="bg-white rounded-3xl shadow-sm border border-mocha/10 overflow-hidden p-6 md:p-10 mb-16 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* Imagem */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner bg-soft-white group">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-104 transition-transform duration-700"
                            priority
                        />
                        {product.highlight && (
                            <div className="absolute top-4 left-4 bg-dusty-rose text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                Item do dia
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col h-full justify-center">

                        <div className="flex flex-wrap gap-2 mb-4">
                            {product.tagIds.map((tagId) => (
                                <span
                                    key={tagId}
                                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getTagColor(tagId)}`}
                                >
                                    {getTagName(tagId)}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-mocha mb-2 leading-tight">
                            {product.name}
                        </h1>
                        {/* 
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-amber-400">
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                            </div>
                            <span className="text-mocha/40 text-sm">(12 avaliações)</span>
                        </div>
                        */}
                        <div className="text-4xl font-light text-dusty-rose mb-6">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                        </div>

                        <p className="text-mocha/70 text-lg leading-relaxed mb-8 border-l-4 border-dusty-rose/20 pl-4">
                            {product.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button className="flex-1 bg-mocha text-white py-4 px-8 rounded-xl font-bold hover:bg-mocha/90 transition flex items-center justify-center gap-2 shadow-lg shadow-mocha/20 active:scale-95">
                                <ShoppingBag size={20} />
                                Adicionar à Sacola
                            </button>
                            <button onClick={() => setFavorito(!favorito)} className={`px-6 py-4 rounded-xl border border-mocha/20 ${favorito ? "text-red-500 bg-pink-400/20" : ""} text-mocha font-bold hover:bg-pink-300/20 transition active:scale-95`}>
                                ♥
                            </button>
                        </div>

                        <div className="bg-soft-white p-4 rounded-xl flex items-start gap-3 text-sm text-mocha/70">
                            <Truck size={20} className="shrink-0 mt-0.5 text-dusty-rose" />
                            <div>
                                <span className="block font-bold text-mocha">Entrega Rápida</span>
                                Receba em casa em até 40 minutos ou retire na loja.
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Relacionados */}
            {relacionados.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-mocha mb-6">
                        Você também pode gostar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relacionados.map(prod => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
}