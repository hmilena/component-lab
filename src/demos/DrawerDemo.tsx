import { useState } from "react";
import { Drawer } from "./../components/Drawer/Drawer";

const features = [
  "Side panel no desktop (≥ 750px)",
  "Bottom sheet no mobile (< 750px)",
  "Swipe para fechar no touch",
  "Snap threshold — só fecha se arrastar mais de ⅓",
  "ESC para fechar",
  "Clique no overlay fecha",
  "Scroll lock no body enquanto aberto",
  "Animação de entrada e saída (600ms)",
  "ResizeObserver — muda de modo sem reload",
];

export function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Drawer
        </h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Painel lateral no desktop, bottom sheet no mobile. Reescrita do{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono text-xs">
            Drawer.js
          </code>{" "}
          produzido para o BPI Net Empresas. Redimensiona a janela abaixo de{" "}
          <strong className="text-gray-700">750px</strong> para ver a mudança de
          comportamento.
        </p>
      </div>

      {/* Demo card */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Demo
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer border-0"
            onClick={() => setIsOpen(true)}
          >
            Abrir Drawer
          </button>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Funcionalidades
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xs"
            >
              <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.354 2.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L3.5 6.793l4.146-4.147a.5.5 0 01.708 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </section>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Olá 👋</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">
          Este drawer abre como painel lateral no desktop e como bottom sheet no
          mobile — com swipe to dismiss.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Tenta fechar de três formas: botão ✕, clicar no overlay, ou ESC.
        </p>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer border-0"
          onClick={() => setIsOpen(false)}
        >
          Fechar
        </button>
      </Drawer>
    </div>
  );
}
