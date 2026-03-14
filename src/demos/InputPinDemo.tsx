import { useState } from "react";
import { InputPin } from "../components/InputPin";

type Status = "idle" | "loading" | "success" | "error";

export function InputPinDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleComplete = (value: string) => {
    setStatus("loading");
    setMessage("");

    // Simulates async PIN validation
    setTimeout(() => {
      if (value === "1234") {
        setStatus("success");
        setMessage("PIN correto!");
      } else {
        setStatus("error");
        setMessage(`PIN "${value}" incorreto. Tenta 1234.`);
      }
      setTimeout(() => setStatus("idle"), 2000);
    }, 800);
  };

  return (
    <div className="demo-page">
      <h1>Input Pin</h1>
      <p className="demo-description">
        Input de PIN com 4 campos independentes, máscara de dígitos, navegação
        por teclado e validação ao completar. Reescrita do{" "}
        <code>InputPinCore.js</code> produzido para o BPI Net Empresas.
        <br />
        <strong>PIN correto: 1234</strong>
      </p>

      <div className="demo-section">
        <h2>Demo</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
          <InputPin
            length={4}
            onComplete={handleComplete}
            disabled={status === "loading" || status === "success"}
          />
          {status === "loading" && (
            <p style={{ color: "#666", fontSize: 14 }}>A validar…</p>
          )}
          {status === "success" && (
            <p style={{ color: "#2a9d5c", fontWeight: 600, fontSize: 14 }}>{message}</p>
          )}
          {status === "error" && (
            <p style={{ color: "#d0021b", fontSize: 14 }}>{message}</p>
          )}
        </div>
      </div>

      <div className="demo-section">
        <h2>Funcionalidades</h2>
        <ul className="feature-list">
          <li>✅ Avanço automático ao digitar</li>
          <li>✅ Recuo com Backspace — apaga e volta ao campo anterior</li>
          <li>✅ Navegação com ← →</li>
          <li>✅ Máscara • após 100ms</li>
          <li>✅ Callback onComplete quando todos os campos preenchidos</li>
          <li>✅ Estado disabled durante validação</li>
          <li>✅ Reset automático após completar</li>
          <li>✅ Acessível — aria-label em cada campo</li>
        </ul>
      </div>
    </div>
  );
}
