import { DropdownSubmenu, MenuItem } from "../components/DropdownSubmenu";

const MENU_SIMPLES: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", href: "#" },
  { id: "relatorios", label: "Relatórios", href: "#" },
  { id: "configuracoes", label: "Configurações", href: "#" },
];

const MENU_COM_SUBNIVEIS: MenuItem[] = [
  {
    id: "conta",
    label: "Conta",
    children: [
      { id: "perfil", label: "Perfil", href: "#" },
      { id: "seguranca", label: "Segurança", href: "#" },
      { id: "notificacoes", label: "Notificações", href: "#" },
    ],
  },
  {
    id: "produtos",
    label: "Produtos",
    children: [
      { id: "depositos", label: "Depósitos", href: "#" },
      { id: "credito", label: "Crédito", href: "#" },
      { id: "seguros", label: "Seguros", href: "#" },
      { id: "investimentos", label: "Investimentos", href: "#" },
    ],
  },
  { id: "suporte", label: "Suporte", href: "#" },
  { id: "sair", label: "Sair", href: "#" },
];

export function DropdownSubmenuDemo() {
  return (
    <div className="demo-page">
      <h1>Dropdown Submenu</h1>
      <p className="demo-description">
        Dropdown com dois níveis de navegação, propagação de active state e
        fechamento por ESC ou click fora. Reescrita do{" "}
        <code>DropdownSubmenu_Core.js</code> produzido para o BPI Net Empresas.
      </p>

      <div className="demo-section">
        <h2>Sem subníveis</h2>
        <DropdownSubmenu label="Menu" items={MENU_SIMPLES} />
      </div>

      <div className="demo-section">
        <h2>Com subníveis</h2>
        <div style={{ display: "flex", gap: 12 }}>
          <DropdownSubmenu
            label="Meu Banco"
            items={MENU_COM_SUBNIVEIS}
            defaultActiveId="credito"
          />
          <DropdownSubmenu label="Outro menu" items={MENU_SIMPLES} />
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: "#888" }}>
          "Crédito" está marcado como activo — o estado propaga até ao trigger.
          Abre os dois menus e vê como fecham entre si.
        </p>
      </div>

      <div className="demo-section">
        <h2>Funcionalidades</h2>
        <ul className="feature-list">
          <li>✅ Dois níveis de navegação</li>
          <li>✅ Só um submenu aberto de cada vez</li>
          <li>✅ Active state propaga dos filhos para o trigger</li>
          <li>✅ Fecha ao clicar fora</li>
          <li>✅ Fecha ao carregar ESC</li>
          <li>✅ Fecha ao clicar num item folha</li>
          <li>✅ Animação de entrada com fade + slide</li>
        </ul>
      </div>
    </div>
  );
}
