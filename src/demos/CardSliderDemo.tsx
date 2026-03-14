import { CardSlider } from "../components/CardSlider";
import "./CardSliderDemo.css";

const CARDS = [
  { id: 1, title: "Card 1", color: "#e8f4f8" },
  { id: 2, title: "Card 2", color: "#f8f0e8" },
  { id: 3, title: "Card 3", color: "#f0e8f8" },
  { id: 4, title: "Card 4", color: "#e8f8f0" },
  { id: 5, title: "Card 5", color: "#f8e8e8" },
  { id: 6, title: "Card 6", color: "#f8f8e8" },
  { id: 7, title: "Card 7", color: "#e8e8f8" },
  { id: 8, title: "Card 8", color: "#f0f8e8" },
];

export function CardSliderDemo() {
  return (
    <div className="demo-page">
      <h1>Card Slider</h1>
      <p className="demo-description">
        Slider horizontal com drag-to-scroll, botões de navegação animados e
        número de cards responsivo. Reescrita do <code>CardSlider.js</code> produzido para o BPI Net Empresas.
      </p>

      <div className="demo-section">
        <h2>Demo</h2>
        <CardSlider>
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="demo-card"
              style={{ background: card.color }}
            >
              <span>{card.title}</span>
            </div>
          ))}
        </CardSlider>
      </div>

      <div className="demo-section">
        <h2>Funcionalidades</h2>
        <ul className="feature-list">
          <li>✅ Drag-to-scroll com mouse</li>
          <li>✅ Navegação por botões com scroll animado</li>
          <li>✅ Botões desabilitados nos limites</li>
          <li>✅ Fade nas bordas para indicar overflow</li>
          <li>✅ 4 cards no desktop / 3 no tablet / 2 no mobile</li>
          <li>✅ ResizeObserver — adapta sem reload</li>
        </ul>
      </div>
    </div>
  );
}
