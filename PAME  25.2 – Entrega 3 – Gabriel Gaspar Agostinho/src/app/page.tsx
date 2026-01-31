import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { ArrowRight, Star, Instagram, MapPin, Clock, ChevronDown2 } from "@deemlol/next-icons";

export default function Home() {
    const destaques = products.filter((p) => p.highlight).slice(0, 3);

    const hoje = new Date()

    const diasSemana = [
        "o seu Domingo", "a sua Segunda-feira", "a sua Terça-feira", "a sua Quarta-feira",
        "a sua Quinta-feira", "a sua Sexta-feira", "o seu Sábado"
    ];

    return (
        <div className="flex flex-col w-full">

            {/* banner*/}
            <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">

                {/* Imagem de Fundo */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1920&q=80"
                        alt="Mesa de doces sofisticada"
                        fill
                        className="object-cover brightness-[0.70]"
                        priority
                    />
                </div>

                {/* Texto Centralizado sobre a imagem */}
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <span className="uppercase tracking-[0.3em] text-sm md:text-base font-medium text-white/80">
                        Artesanal • Estético • Delicioso
                    </span>

                    <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight">
                        A doçura nos <br />
                        <span className="italic">pequenos detalhes.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto font-light leading-relaxed">
                        Confeitaria feita para os olhos e para o paladar. Ingredientes selecionados e design minimalista em cada fatia.
                    </p>

                    <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/doces"
                            className="bg-white text-mocha px-10 py-4 rounded-full font-bold hover:bg-dusty-rose hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                            Ver Cardápio
                        </Link>
                        <Link
                            href="/bebidas"
                            className="px-10 py-4 rounded-full font-bold text-white border border-white/40 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        >
                            Nossas Bebidas
                        </Link>
                    </div>
                </div>
                {/*<ChevronDown2 size={60} color="#FFFFFF" className="absolute self-center bottom-4 " /> */}
            </section>


            {/* destques */}
            <section className="py-24 px-6 md:px-12 bg-soft-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12 border-b border-mocha/10 pb-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif text-mocha mb-2">Itens do dia</h2>
                            <p className="text-mocha/60">As escolhas mais amadas pelos nossos clientes para adoçar {diasSemana[hoje.getDay()]}.</p>
                        </div>
                        <Link href="/doces" className="hidden md:flex items-center gap-2 text-dusty-rose font-semibold hover:gap-3 transition-all">
                            Ver todos <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {destaques.map((produto) => (
                            <ProductCard key={produto.id} product={produto} />
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/doces" className="text-dusty-rose font-semibold border-b border-dusty-rose/30 pb-1">
                            Ver cardápio completo →
                        </Link>
                    </div>
                </div>
            </section>


            {/* manifesto */}
            <section className="grid grid-cols-1 md:grid-cols-2 min-h-125">

                <div className="relative h-[400px] md:h-full w-full">
                    <Image
                        src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1000&q=80"
                        alt="Chef finalizando um doce"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="bg-clean-cream flex flex-col justify-center p-12 md:p-24 space-y-6">
                    <div className="flex gap-1 text-dusty-rose">
                        <Star size={20} fill="currentColor" />
                        <Star size={20} fill="currentColor" />
                        <Star size={20} fill="currentColor" />
                        <Star size={20} fill="currentColor" />
                        <Star size={20} fill="currentColor" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif text-mocha leading-tight">
                        &quot;Não vendemos apenas doces, criamos momentos.&quot;
                    </h2>

                    <p className="text-mocha/70 text-lg leading-relaxed">
                        Acreditamos que a estética importa tanto quanto o sabor. Nossa cozinha é um laboratório de design onde ingredientes orgânicos encontram formas perfeitas. Sem conservantes, sem excessos, apenas o essencial para ser inesquecível.
                    </p>

                    <div className="pt-4 border-t border-mocha/10 w-full">
                        <span className="font-bold text-mocha block mb-1">Clean Girl Confeitaria</span>
                        <span className="text-sm text-mocha/50 uppercase tracking-widest">Desde 2024</span>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 bg-mocha text-soft-white min-h-125">

                <div className="flex flex-col justify-center p-12 md:p-24 space-y-8 order-2 md:order-1">
                    <h2 className="text-3xl md:text-4xl font-serif mb-6">Venha nos visitar</h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <MapPin className="text-dusty-rose shrink-0" size={28} />
                            <div>
                                <h3 className="text-xl font-bold mb-1">Nosso Endereço</h3>
                                <p className="text-white/70 leading-relaxed">
                                    Rua das Camélias, 120 - Jardins<br />
                                    São Paulo - SP
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Clock className="text-dusty-rose shrink-0" size={28} />
                            <div>
                                <h3 className="text-xl font-bold mb-1">Horários</h3>
                                <p className="text-white/70 leading-relaxed">
                                    Terça a Sexta: 10h às 19h<br />
                                    Sábados: 09h às 18h
                                </p>
                            </div>
                        </div>
                    </div>

                    <a href="#" className="inline-block text-dusty-rose border-b border-dusty-rose/30 pb-1 w-max hover:text-white hover:border-white transition-colors">
                        Ver no Google Maps →
                    </a>
                </div>

                <div className="relative h-[400px] md:h-full w-full order-1 md:order-2">
                    <Image
                        src="/assets/interno.webp"
                        alt="Fachada da loja"
                        fill
                        className="object-cover"
                    />
                </div>
            </section>


            {/* redes e ctt */}
            <section className="py-24 bg-soft-white text-center px-4">
                <div className="max-w-2xl mx-auto space-y-6">
                    <Instagram size={32} className="mx-auto text-dusty-rose" />
                    <h2 className="text-3xl md:text-4xl font-serif text-mocha">Siga nosso Lifestyle</h2>
                    <p className="text-mocha/60 text-lg">
                        Receba inspirações diárias, receitas exclusivas e cupons secretos.
                    </p>

                    <form className="flex gap-2 max-w-md mx-auto pt-4">
                        <input
                            type="email"
                            placeholder="Seu e-mail"
                            className="flex-1 bg-white border border-mocha/10 px-6 py-4 rounded-full outline-none focus:border-dusty-rose transition-colors"
                        />
                        <button className="bg-mocha text-white px-8 py-4 rounded-full font-bold hover:bg-dusty-rose transition-colors shadow-lg">
                            Enviar
                        </button>
                    </form>
                </div>
            </section>

        </div>
    );
}