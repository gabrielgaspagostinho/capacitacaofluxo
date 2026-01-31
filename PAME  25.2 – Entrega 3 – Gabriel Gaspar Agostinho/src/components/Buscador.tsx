"use client";

import { ChevronDown, ChevronUp, Search } from "@deemlol/next-icons";
import { TAGS } from "@/data/products";
import { useState } from "react";

interface props {
    busca: string;
    setBusca: React.Dispatch<React.SetStateAction<string>>;
    tag: number | null;
    setTag: React.Dispatch<React.SetStateAction<number | null>>;
    ordenador: string | null;
    setOrdenador: React.Dispatch<React.SetStateAction<string | null>>;
}

export function Buscador({ busca, setBusca, tag, setTag, ordenador, setOrdenador }: props) {

    const getTagColor = (id: number) => {
        switch (id) {
            case 1: return "bg-green-600 hover:bg-green-700";   // Vegano
            case 2: return "bg-emerald-500 hover:bg-emerald-600"; // Vegetariano
            case 3: return "bg-amber-500 hover:bg-amber-600";    // Sem Glúten
            case 4: return "bg-sky-400 hover:bg-sky-500";        // Sem Lactose
            case 5: return "bg-rose-400 hover:bg-rose-500";      // Zero Açúcar
            case 6: return "bg-indigo-500 hover:bg-indigo-600";  // Proteico
            default: return "bg-gray-400 hover:bg-gray-500";     // Cor padrão
        }
    };

    const tagsParaExibir = tag !== null
        ? TAGS.filter((t) => t.id === tag)
        : TAGS;

    const handleTagClick = (idSelecionado: number) => {
        if (tag === idSelecionado) {
            setTag(null);
        } else {
            setTag(idSelecionado);
        }
    };



    const handleSelect = (valor: string | null, label: string) => {
        setOrdenador(valor);
        setNomeOpcao(label);
        setAberto(false);
    };

    const [aberto, setAberto] = useState(false);
    const [nomeOpcao, setNomeOpcao] = useState("Ordenar por");

    return (
        <section className="mb-8 space-y-4 w-full">

            <div className="bg-soft-white rounded-lg flex items-center shadow-sm border border-mocha/10 p-2 mx-40 my-4">
                <input
                    className="flex-1 bg-transparent border-0 outline-none pl-2 text-mocha placeholder:text-mocha/40 text-lg"
                    value={busca}
                    onChange={evento => setBusca(evento.target.value)}
                    placeholder="O que você procura hoje?"
                />
                <div className="text-mocha/40 p-2">
                    <Search size={24} />
                </div>
            </div>
            <section className="flex justify-between mx-40">
                <div className="flex flex-wrap gap-2 transition-all duration-300 justify-center">
                    {tagsParaExibir.map((tagb) => (
                        <button
                            key={tagb.id}
                            onClick={() => handleTagClick(tagb.id)}
                            className={`${getTagColor(tagb.id)} text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${tag === tagb.id ? "ring-2 ring-offset-2 ring-mocha/20 scale-105" : ""}`}
                        >
                            {tagb.label} {tag === tagb.id && " ✕"}
                        </button>
                    ))}
                </div>

                {/* ordenador */}
                <div className="relative text-left z-20 left-0 flex justify-end">
                    {/*parte sempre visivel */}
                    <button
                        onClick={() => setAberto(!aberto)}
                        className={` flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 border ${aberto ? "bg-clean-cream text-mocha border-mocha/20" : "bg-soft-white text-mocha/70 border-mocha/10 hover:bg-clean-cream/50"}`}>
                        <span className="font-medium text-sm">{nomeOpcao}</span>
                        {aberto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {/* ordenador que aparece*/}
                    {/* Só aparece se 'aberto' for true */}
                    {aberto && (
                        <div className="absolute z-10 right-0 mt-10 w-48 bg-soft-white rounded-xl shadow-lg border border-mocha/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                            <div className="py-1">
                                <button
                                    onClick={() => handleSelect(null, 'Ordenar por')}
                                    className="w-full text-left px-4 py-3 text-sm text-mocha hover:bg-clean-cream hover:text-dusty-rose transition-colors">
                                </button>

                                <button
                                    onClick={() => handleSelect('maior', 'Maior preço')}
                                    className="w-full text-left px-4 py-3 text-sm text-mocha hover:bg-clean-cream hover:text-dusty-rose transition-colors">
                                    Maior preço
                                </button>

                                <button
                                    onClick={() => handleSelect('menor', 'Menor preço')}
                                    className="w-full text-left px-4 py-3 text-sm text-mocha hover:bg-clean-cream hover:text-dusty-rose transition-colors">
                                    Menor preço
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </section>
        </section>
    );
}