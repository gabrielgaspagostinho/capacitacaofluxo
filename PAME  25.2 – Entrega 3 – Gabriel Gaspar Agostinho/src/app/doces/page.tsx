"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Buscador } from "@/components/Buscador";
import { Frown } from "@deemlol/next-icons"; // Ícone para "sem resultados"

export default function DocesPage() {

    const [busca, setBusca] = useState("");
    const [ordenador, setOrdenador] = useState<string | null>("");
    const [tag, setTag] = useState<number | null>(null);

    // filtros

    //implemetar favoritos em cima futuramente
    const listaFiltrada = products.filter((p) => p.category === "doces").filter((p) => p.name.toLowerCase().includes(busca.toLowerCase())).filter((p) => (tag ? p.tagIds.includes(tag) : true))
        .sort((a, b) => {
            if (ordenador === "menor") return a.price - b.price;
            if (ordenador === "maior") return b.price - a.price;
            return 0
        });

    return (
        <div className="flex flex-col min-h-screen bg-soft-white">

            {/* banner*/}
            <section className="relative h-[45vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1920&q=80"
                        alt="Vitrine de doces"
                        fill
                        className="object-cover brightness-[0.6]"
                        priority
                    />
                </div>

                {/* Texto Centralizado */}
                <div className="relative z-10 text-center text-white space-y-4 px-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <span className="text-dusty-rose font-bold tracking-widest uppercase text-sm md:text-base">
                        Cardápio Artesanal
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif leading-tight">
                        Nossos <span className="italic font-light">Doces</span>
                    </h1>
                    <p className="text-white/80 text-lg max-w-lg mx-auto font-light">
                        Do clássico ao contemporâneo, explore nossa seleção feita à mão com os melhores ingredientes.
                    </p>
                </div>
            </section>


            {/*buscador*/}
            <section className="sticky top-0 z-30 bg-soft-white/95 backdrop-blur-md border-b border-mocha/10 shadow-sm transition-all">
                <Buscador
                    busca={busca}
                    setBusca={setBusca}
                    tag={tag}
                    setTag={setTag}
                    ordenador={ordenador}
                    setOrdenador={setOrdenador}
                />
            </section>


            {/* grid produtos*/}
            <section className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">

                {listaFiltrada.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {listaFiltrada.map((produto) => (
                            <ProductCard key={produto.id} product={produto} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-mocha/50 space-y-4">
                        <div className="bg-mocha/5 p-6 rounded-full">
                            <Frown size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-mocha">Nenhum doce encontrado</h3>
                        <p>Tente mudar os filtros ou busque por outro nome.</p>
                        <button
                            onClick={() => { setBusca(""); setTag(null); }}
                            className="mt-4 text-dusty-rose font-bold hover:underline"
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}

            </section>

        </div>
    );
}