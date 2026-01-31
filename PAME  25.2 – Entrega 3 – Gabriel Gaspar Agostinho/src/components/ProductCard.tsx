"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, getTagName } from "@/data/products";
import { Heart } from "@deemlol/next-icons"; // Importando o ícone

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [favorito, setFavorito] = useState(product.favorited);

    const toggleFavorito = (e: React.MouseEvent) => {
        e.preventDefault();
        setFavorito(!favorito);
    };

    return (
        <div className="relative">

            <Link href={`/produto/${product.id}`} className="group block h-full">

                <div className="bg-soft-white/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-mocha/5 h-full flex flex-col">

                    {/* Imagem do Produto */}
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Informações */}
                    <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-mocha group-hover:text-dusty-rose transition-colors">
                                {product.name}
                            </h3>
                            <span className="font-semibold text-dusty-rose bg-dusty-rose/10 px-2 py-1 rounded text-sm whitespace-nowrap ml-2">
                                R$ {product.price.toFixed(2).replace('.', ',')}
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2 mb-3 flex-wrap">
                            {product.tagIds.map((id) => (
                                <span key={id} className="text-[10px] bg-mocha/5 text-mocha/60 px-2 py-1 rounded-full uppercase tracking-wider font-bold">
                                    {getTagName(id)}
                                </span>
                            ))}
                        </div>

                        <p className="text-mocha/70 text-sm line-clamp-2 mb-4">
                            {product.description}
                        </p>

                        <div className="mt-auto text-xs font-bold text-mocha/40 uppercase tracking-widest group-hover:text-dusty-rose transition-colors">
                            Ver Detalhes →
                        </div>
                    </div>
                </div>
            </Link>

            {/* botao de favoritar */}
            <button
                onClick={toggleFavorito}
                className="absolute top-2 right-2 z-5 p-2 focus:outline-none group/btn" >
                <Heart
                    size={28}
                    className={`
                drop-shadow-sm transition-all duration-300
                ${favorito
                            ? "fill-dusty-rose text-pink-300"
                            : "fill-transparent text-white group-hover/btn:text-pink-300" // Cor branca pra destacar na foto
                        }
                group-hover/btn:scale-110 group-active/btn:scale-95
            `}
                />
            </button>

        </div>
    );
}