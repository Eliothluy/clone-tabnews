import { RotateCcw } from "lucide-react";

export function Footer({ onReset }) {
  return (
    <footer className="app-footer">
      <button type="button" className="reset-button" onClick={onReset}>
        <RotateCcw size={16} />
        Reiniciar Jornada
      </button>
      <p className="footer-note">
        Progresso salvo automaticamente no navegador.
      </p>
    </footer>
  );
}
