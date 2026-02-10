"use client";
import Link from "next/link";
import { Instagram, Menu, X } from "@deemlol/next-icons";
import { useEffect, useState } from "react";


export default function Sidebar() {

    const [abrirMenu, setAbrirMenu] = useState<boolean>(false);

    // Bloqueia/Desbloqueia o Scroll
    useEffect(() => {
        if (abrirMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [abrirMenu]); // coloca o observador no abrirMenu

    const toggleMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setAbrirMenu(!abrirMenu)
    }
    return (
        <div>
            <aside className="fixed left-0 top-0 h-screen w-64 bg-soft-white border-r border-mocha/20 lg:flex flex-col shadow-dusty-rose/45 shadow-2xl hidden">
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
                <div className="p-8 text-center text-xs text-mocha/50">
                    <p>© 2026 Clean Girl</p>
                </div>
            </aside>

            <button
                onClick={(e) => toggleMenu(e)}
                className="lg:hidden fixed top-4 left-3 z-50 p-2 bg-soft-white/50 border-mocha/40 backdrop-blur-sm rounded-full shadow-lg text-mocha border border-mocha/10 active:scale-95 transition-all">
                <Menu className="size-7 md:size-13" />
            </button>
            <div
                className={`lg:hidden fixed inset-0 z-[60] bg-soft-white flex flex-col items-center justify-center transition-all duration-500 ${abrirMenu ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                <button
                    onClick={(e) => toggleMenu(e)}
                    className="absolute top-6 right-6 p-2 text-mocha hover:text-dusty-rose transition-colors">
                    <X size={40} strokeWidth={1.5} />
                </button>

                <nav className="flex flex-col items-center gap-8 mb-10">

                    <span className="text-xs font-bold tracking-[0.3em] text-dusty-rose mb-4">
                        MENU
                    </span>

                    <Link
                        href="/" onClick={() => setAbrirMenu(false)} className="text-4xl font-serif text-mocha hover:text-dusty-rose hover:scale-105 transition-all">
                        Início
                    </Link>

                    <Link
                        href="/doces" onClick={() => setAbrirMenu(false)} className="text-4xl font-serif text-mocha hover:text-dusty-rose hover:scale-105 transition-all">
                        Doces
                    </Link>

                    <Link
                        href="/bebidas" onClick={() => setAbrirMenu(false)} className="text-4xl font-serif text-mocha hover:text-dusty-rose hover:scale-105 transition-all">
                        Bebidas
                    </Link>
                </nav>
            </div>
        </div >
    );

}
