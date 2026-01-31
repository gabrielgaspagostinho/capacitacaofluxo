
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { ArrowRight, Star, Instagram, MapPin, Clock, } from "@deemlol/next-icons";

export default function Home() {
    // 1. FILTRO: Pegar apenas os produtos marcados como destaque (highlight: true)
    const destaques = products.filter((p) => p.highlight).slice(0, 3); // Pega só os 3 primeiros pra não lotar

    return (
        <div className="flex flex-col gap-10 px-7 pb-9">

            {/* --- SEÇÃO 1: HERO (Banner Principal) --- */}
            <section className="relative bg-soft-white/60 rounded-3xl overflow-hidden shadow-sm border border-mocha/5 flex flex-col md:flex-row items-center">

                {/* Lado Esquerdo: Texto */}
                <div className="flex-1 p-8 md: flex flex-col items-start gap-6 z-10">
                    <span className="bg-dusty-rose/10 text-dusty-rose px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                        Artesanal & Estético
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold text-mocha leading-tight">
                        Momentos doces, <br />
                        <span className="text-dusty-rose italic font-serif">memórias reais.</span>
                    </h1>

                    <p className="text-mocha/70 text-lg max-w-md leading-relaxed">
                        Descubra sabores autênticos feitos com ingredientes selecionados e aquele toque visual que você ama.
                    </p>

                    <div className="flex gap-4 mt-2">
                        <Link
                            href="/doces"
                            className="bg-mocha text-soft-white px-8 py-4 rounded-full font-semibold hover:bg-dusty-rose transition-colors duration-300 shadow-lg shadow-mocha/20 flex items-center gap-2"
                        >
                            Ver Cardápio <ArrowRight size={20} />
                        </Link>

                        <Link
                            href="/bebidas"
                            className="px-8 py-4 rounded-full font-semibold text-mocha border border-mocha/20 hover:bg-clean-cream transition-colors"
                        >
                            Bebidas
                        </Link>
                    </div>
                </div>

                {/* Lado Direito: Imagem Hero */}
                <div className="relative w-full md:w-1/2 h-64 md:h-[520px] shadow-2xl shadow-mocha">
                    <Image
                        src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80"
                        alt="Mesa de café da manhã aesthetic"
                        fill
                        className="object-cover"
                        priority // Carrega essa imagem primeiro pra não piscar
                    />
                    {/* Overlay gradiente para o texto não sumir no mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-soft-white via-transparent to-transparent md:hidden"></div>
                </div>
            </section>




            {/* --- SEÇÃO 2: DESTAQUES DO DIA --- */}
            <section>
                <div className="flex justify-between items-end mb-8 px-2">
                    <div>
                        <h2 className="text-3xl font-bold text-mocha mb-2">Favoritos da Casa</h2>
                        <p className="text-mocha/60">Os queridinhos dos nossos clientes.</p>
                    </div>
                    <Link href="/doces" className="text-dusty-rose font-semibold hover:underline hidden md:block">
                        Ver tudo →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destaques.map((produto) => (
                        <ProductCard key={produto.id} product={produto} />
                    ))}
                </div>

                {/* Botão ver tudo mobile */}
                <div className="mt-8 text-center md:hidden">
                    <Link href="/doces" className="text-dusty-rose font-semibold hover:underline">
                        Ver cardápio completo →
                    </Link>
                </div>
            </section>


            {/* --- SEÇÃO 3: SOBRE / MANIFESTO (A Vibe) --- */}
            <section className="bg-clean-cream rounded-3xl p-8 md:p-12 relative overflow-hidden">
                {/* Elemento decorativo de fundo */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-dusty-rose/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
                    <div className="flex justify-center text-dusty-rose mb-4">
                        <Star fill="currentColor" size={24} />
                        <Star fill="currentColor" size={24} className="mt-[-10px]" />
                        <Star fill="currentColor" size={24} />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif text-mocha font-bold italic">"Não é só sobre comer, é sobre sentir."</h2>

                    <p className="text-mocha/80 text-lg leading-relaxed">
                        Na Clean Girl Confeitaria, acreditamos que cada doce deve ser uma experiência.
                        Desde a escolha da farinha de amêndoas até a curadoria da playlist que toca na loja.
                        Tudo aqui é pensado para o seu bem-estar visual e gastronômico.
                    </p>

                    <div className="pt-4 flex justify-center gap-8 text-mocha/60 font-medium uppercase text-xs tracking-widest">
                        <span>• Ingredientes Naturais</span>
                        <span>• Estética Minimalista</span>
                        <span>• Feito à Mão</span>
                    </div>
                </div>
            </section>


            {/* --- NOVA SEÇÃO: VISIT US --- */}
            {/* 1. ADICIONAMOS 'group' AQUI NA SECTION PAI */}
            {/* Quando o mouse entrar em QUALQUER lugar dessa section, o grupo ativa */}
            <section className="group relative py-24 overflow-hidden w-full">

                {/* --- ELEMENTO VISUAL DE FUNDO --- */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 md:translate-x-0 w-[150vw] md:w-[45vw] aspect-square rounded-full overflow-hidden border-[10px] border-soft-white z-0 opacity-90 md:opacity-100">
                    <Image
                        src="/assets/interno.jpeg"
                        alt="Ambiente da confeitaria"
                        fill
                        // 2. MUDAMOS A LÓGICA DO HOVER AQUI:
                        // Em vez de 'hover:', usamos 'group-hover:'
                        // Adicionei um efeito de escala: ela começa com zoom (scale-110) e quando passa o mouse ela "relaxa" para o tamanho normal (scale-100)
                        // Aumentei a duração para 1500ms para ficar bem cinematográfico.
                        className="object-cover grayscale-[30%] scale-110 group-hover:grayscale-0 group-hover:scale-100 transition-all duration-[1500ms] ease-in-out"
                    />
                </div>

                {/* --- CONTEÚDO DE TEXTO (Sem alterações necessárias aqui) --- */}
                <div className="relative z-10 container mx-auto px-4 md:px-0">
                    {/* ... resto do código do card de texto igual ao anterior ... */}
                    <div className="bg-soft-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[40px] border border-white/40 shadow-xl md:max-w-xl md:-ml-10 lg:ml-0">

                        {/* Título */}
                        <span className="block text-dusty-rose font-serif italic text-xl mb-4">
                            Venha nos visitar
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-mocha mb-10 leading-tight">
                            Seu novo <br />
                            <span className="relative inline-block">
                                lugar favorito.
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-dusty-rose/20 -z-10 rotate-[-1deg]"></span>
                            </span>
                        </h2>

                        <div className="space-y-10">
                            {/* Bloco Endereço */}
                            <div className="flex gap-5 items-start">
                                <div className="bg-mocha/10 p-3 rounded-full text-dusty-rose shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-mocha mb-2">Onde Estamos</h3>
                                    <p className="text-mocha/70 text-lg leading-relaxed">
                                        Rua das Camélias, 120 - Jardins<br />
                                        São Paulo - SP
                                    </p>
                                    <a href="#" className="group/link inline-flex items-center gap-1 text-dusty-rose font-semibold text-sm mt-3 border-b border-dusty-rose/30 pb-1 hover:text-mocha transition-colors">
                                        Ver rota no mapa
                                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            {/* Bloco Horários */}
                            <div className="flex gap-5 items-start">
                                <div className="bg-mocha/10 p-3 rounded-full text-dusty-rose shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div className="w-full">
                                    <h3 className="text-xl font-bold text-mocha mb-4">Horários</h3>
                                    <div className="grid grid-cols-2 gap-4 text-mocha/80">
                                        <div className="bg-white/50 p-3 rounded-2xl border border-mocha/5 text-center">
                                            <span className="block text-sm font-bold text-dusty-rose uppercase tracking-wider mb-1">Ter - Sex</span>
                                            <span className="font-bold text-lg">10h - 19h</span>
                                        </div>
                                        <div className="bg-white/50 p-3 rounded-2xl border border-mocha/5 text-center">
                                            <span className="block text-sm font-bold text-dusty-rose uppercase tracking-wider mb-1">Sábados</span>
                                            <span className="font-bold text-lg">09h - 18h</span>
                                        </div>
                                    </div>
                                    <p className="text-center text-mocha/50 text-sm mt-3 italic">
                                        Fechamos aos Domingos e Segundas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* --- SEÇÃO 4: NEWSLETTER / SOCIAL --- */}
            <section className="grid md:grid-cols-2 gap-6">
                {/* Card Instagram */}
                <div className="bg-dusty-rose text-white rounded-3xl p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer">
                    <div>
                        <Instagram size={32} className="mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Siga nosso Lifestyle</h3>
                        <p className="text-white/80">Bastidores, receitas e muita inspiração visual no nosso feed.</p>
                    </div>
                    <span className="mt-6 font-bold text-lg">@cleangirl.confeitaria ↗</span>
                </div>

                {/* Card Newsletter (Estático por enquanto) */}
                <div className="bg-white border border-mocha/10 rounded-3xl p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-mocha mb-2">Entre para o Clube</h3>
                    <p className="text-mocha/60 mb-6">Receba novidades e cupons exclusivos.</p>

                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Seu melhor e-mail"
                            className="flex-1 bg-soft-white border border-mocha/10 rounded-lg px-4 py-3 outline-none focus:border-dusty-rose transition"
                        />
                        <button className="bg-mocha text-white px-6 py-3 rounded-lg font-bold hover:bg-mocha/90 transition">
                            Enviar
                        </button>
                    </div>
                </div>
            </section>

        </div >
    );
}