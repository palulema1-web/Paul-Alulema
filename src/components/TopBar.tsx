import { TactileButton } from './TactileButton';

interface TopBarProps {
  onStartQuiz: () => void;
  onGoHome: () => void;
  isFunnelActive: boolean;
}

export function TopBar({ onStartQuiz, onGoHome, isFunnelActive }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1CB0F6] rounded-lg"
          aria-label="Duolingo Inicio"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="36" height="36" rx="10" fill="#58CC02" />
            <circle cx="13" cy="17" r="4.5" fill="#FFFFFF" />
            <circle cx="23" cy="17" r="4.5" fill="#FFFFFF" />
            <circle cx="13.5" cy="17" r="2.1" fill="#131F24" />
            <circle cx="22.5" cy="17" r="2.1" fill="#131F24" />
            <path d="M18 20L15.2 23.2H20.8L18 20Z" fill="#FFC800" />
            <path d="M9 11.5L13 13.5L10.5 14.8L9 11.5Z" fill="#89E219" />
            <path d="M27 11.5L23 13.5L25.5 14.8L27 11.5Z" fill="#89E219" />
          </svg>
          <span className="font-display text-2xl font-extrabold tracking-tight text-[#58CC02] whitespace-nowrap shrink-0">
            duolingo
          </span>
        </button>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#4B4B4B]"
        >
          <a
            href="#como-funciona"
            onClick={() => {
              if (isFunnelActive) onGoHome();
            }}
            className="hover:text-[#3D8C00] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Cómo funciona
          </a>
          <a
            href="#impacto"
            onClick={() => {
              if (isFunnelActive) onGoHome();
            }}
            className="hover:text-[#3D8C00] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Impacto salarial
          </a>
          <a
            href="#testimonios"
            onClick={() => {
              if (isFunnelActive) onGoHome();
            }}
            className="hover:text-[#3D8C00] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Casos reales
          </a>
          <a
            href="#super-duolingo"
            onClick={() => {
              if (isFunnelActive) onGoHome();
            }}
            className="hover:text-[#3D8C00] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Super Duolingo
          </a>
        </nav>

        {/* Zone 3: 1 primary CTA */}
        <div className="flex items-center shrink-0">
          <TactileButton onClick={onStartQuiz} size="md">
            Hacer diagnóstico gratis
          </TactileButton>
        </div>
      </div>
    </header>
  );
}
