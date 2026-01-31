import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-soft-white border-r border-mocha/20 flex flex-col">

            <div className="p-8 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-mocha tracking-widest uppercase text-center">
                    Clean Girl
                </h1>
                <span className="text-xs text-dusty-rose tracking-widest mt-1">CONFEITARIA</span>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">

                <Link href="/" className="flex items-center px-4 py-3 text-mocha hover:bg-clean-cream hover:text-dusty-rose rounded-lg transition-colors font-medium">
                    Início
                </Link>

                <Link href="/doces" className="flex items-center px-4 py-3 text-mocha hover:bg-clean-cream hover:text-dusty-rose rounded-lg transition-colors font-medium">
                    Doces
                </Link>

                <Link href="/bebidas" className="flex items-center px-4 py-3 text-mocha hover:bg-clean-cream hover:text-dusty-rose rounded-lg transition-colors font-medium">
                    Bebidas
                </Link>
            </nav>

            {/* 3. Rodapé da Sidebar */}
            <div className="p-8 text-center text-xs text-mocha/50">
                <p>© 2026 Clean Girl</p>
            </div>
        </aside>
    );
}