import { ContentPopover, PopoverProvider } from "../components/ContentPopover";

export function ContentPopoverDemo() {
  return (
    <div className="demo-page">
      <h1>Content Popover</h1>
      <p className="demo-description">
        Popover com posicionamento dinâmico, portal para o body e
        fechamento automático entre instâncias. Reescrita do{" "}
        <code>ContentPopover_Core.js</code> produzido para o BPI Net Empresas.
      </p>

      <div className="demo-section">
        <h2>Demo — abre vários e vê como fecham entre si</h2>

        {/* PopoverProvider wraps all instances — replaces ContentPopover.instances */}
        <PopoverProvider>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <ContentPopover trigger="Conta">
              <h3 style={{ marginBottom: 8, fontSize: 15 }}>A minha conta</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["Perfil", "Definições", "Segurança", "Sair"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        display: "block",
                        padding: "8px 4px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: 14,
                        borderBottom: "1px solid #f0f0f0",
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </ContentPopover>

            <ContentPopover trigger="Produtos">
              <h3 style={{ marginBottom: 8, fontSize: 15 }}>Produtos</h3>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
                Explora os nossos produtos e serviços financeiros disponíveis
                para empresas e particulares.
              </p>
              <button
                style={{
                  marginTop: 12,
                  padding: "8px 16px",
                  background: "#0052cc",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Ver todos
              </button>
            </ContentPopover>

            <ContentPopover trigger="Suporte">
              <h3 style={{ marginBottom: 8, fontSize: 15 }}>Suporte</h3>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
                Precisas de ajuda? A nossa equipa está disponível 24/7.
              </p>
            </ContentPopover>
          </div>
        </PopoverProvider>
      </div>

      <div className="demo-section">
        <h2>Funcionalidades</h2>
        <ul className="feature-list">
          <li>✅ Portal — renderiza no body, nunca cortado por overflow</li>
          <li>✅ Posicionamento dinâmico — não sai do viewport</li>
          <li>✅ Fecha ao abrir outro (via Context)</li>
          <li>✅ Fecha ao clicar fora</li>
          <li>✅ Fecha ao carregar ESC</li>
          <li>✅ Fecha ao clicar em link/botão dentro</li>
          <li>✅ Reposiciona em scroll e resize</li>
          <li>✅ Animação de entrada com fade + slide</li>
        </ul>
      </div>
    </div>
  );
}
