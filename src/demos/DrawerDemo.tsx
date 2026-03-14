import { useState } from "react";
import { Drawer } from "./../components/Drawer/Drawer";

export function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="demo-page">
      <h1>Drawer</h1>
      <p className="demo-description">
        Painel lateral no desktop, bottom sheet no mobile. Reescrita do{" "}
        <code>DrawerCore.js</code> produzido para o BPI Net Empresas.
        Redimensiona a janela abaixo de <strong>750px</strong> para ver a
        mudança de comportamento.
      </p>

      <div className="demo-section">
        <h2>Demo</h2>
        <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
          Abrir Drawer
        </button>
      </div>

      <div className="demo-section">
        <h2>Funcionalidades</h2>
        <ul className="feature-list">
          <li>✅ Side panel no desktop (≥ 750px)</li>
          <li>✅ Bottom sheet no mobile (&lt; 750px)</li>
          <li>✅ Swipe para fechar no touch</li>
          <li>✅ Snap threshold — só fecha se arrastar mais de ⅓</li>
          <li>✅ ESC para fechar</li>
          <li>✅ Clique no overlay fecha</li>
          <li>✅ Scroll lock no body enquanto aberto</li>
          <li>✅ Animação de entrada e saída (600ms)</li>
          <li>✅ ResizeObserver — muda de modo sem reload</li>
        </ul>
      </div>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 style={{ marginBottom: 12 }}>Olá 👋</h2>
        <p style={{ color: "#555", lineHeight: 1.6, marginBottom: 12 }}>
          Este drawer abre como painel lateral no desktop e como bottom sheet no
          mobile — com swipe to dismiss.
        </p>
        <p style={{ color: "#555", lineHeight: 1.6, marginBottom: 24 }}>
          Tenta fechar de três formas: botão ✕, clicar no overlay, ou ESC.
        </p>
        <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
          Fechar
        </button>
      </Drawer>
    </div>
  );
}
