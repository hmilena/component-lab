import { ContentPopover, PopoverProvider } from "../components/ContentPopover";

const features = [
  "Portal — renderiza no body, nunca cortado por overflow",
  "Posicionamento dinâmico — não sai do viewport",
  "Fecha ao abrir outro (via Context)",
  "Fecha ao clicar fora",
  "Fecha ao carregar ESC",
  "Fecha ao clicar em link/botão dentro",
  "Reposiciona em scroll e resize",
  "Animação de entrada com fade + slide",
];

export function ContentPopoverDemo() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Content Popover</h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Popover com posicionamento dinâmico, portal para o body e fechamento automático entre
          instâncias. Reescrita do{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono text-xs">
            ContentPopover_Core.js
          </code>{" "}
          produzido para o BPI Net Empresas.
        </p>
      </div>

      {/* Demo card */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Demo — abre vários e vê como fecham entre si
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <PopoverProvider>
            <div className="flex gap-4 flex-wrap">
              <ContentPopover trigger="Conta">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">A minha conta</h3>
                <ul className="space-y-0.5">
                  {["Perfil", "Definições", "Segurança", "Sair"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="block px-1 py-2 text-sm text-gray-600 border-b border-gray-100 last:border-0 hover:text-gray-900 no-underline transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </ContentPopover>

              <ContentPopover trigger="Produtos">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Produtos</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Explora os nossos produtos e serviços financeiros disponíveis para empresas e
                  particulares.
                </p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg border-0 cursor-pointer hover:bg-blue-700 transition-colors">
                  Ver todos
                </button>
              </ContentPopover>

              <ContentPopover trigger="Suporte">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Suporte</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Precisas de ajuda? A nossa equipa está disponível 24/7.
                </p>
              </ContentPopover>
            </div>
          </PopoverProvider>
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
                <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
                  <path fillRule="evenodd" d="M8.354 2.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L3.5 6.793l4.146-4.147a.5.5 0 01.708 0z" clipRule="evenodd" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
