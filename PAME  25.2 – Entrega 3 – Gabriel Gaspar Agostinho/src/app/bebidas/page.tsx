import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function DocesPage() {

    const doces = products.filter(p => p.category === "bebidas");

    {/*decidindo se eu sigo ou não o estilo da página de doces, vou testar outro */ }

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-5xl font-bold text-mocha mb-2">Nossas Bebidas</h1>
                <p className="text-mocha/60 text-xl">Preparadas na hora, com muito carinho e um toque da chef.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doces.map((doce) => (
                    <ProductCard key={doce.id} product={doce} />
                ))}
            </div>
        </section>
    );
}