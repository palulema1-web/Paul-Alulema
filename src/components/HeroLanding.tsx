import { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, TrendingUp } from 'lucide-react';
import { PROOF_METRICS, TESTIMONIALS } from '../data/funnelData';
import { TactileButton } from './TactileButton';

interface HeroLandingProps {
  onStartQuiz: () => void;
}

const HERO_IMAGE_PATH = '/src/assets/images/hero_career_owl_1795210115030.jpg';

export function HeroLanding({ onStartQuiz }: HeroLandingProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Copy Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-bold text-[#3D8C00] mb-3 tracking-wide">
              Diagnóstico profesional · 60 segundos · Sin costo
            </p>
            <h1
              className="font-display font-extrabold text-[#3C3C3C] tracking-tight leading-[1.08] mb-5"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                textWrap: 'balance',
              }}
            >
              Desbloquea tu Ascenso Laboral en 60 Segundos
            </h1>
            <p className="text-base sm:text-lg text-[#4B4B4B] leading-relaxed max-w-[60ch] mb-8">
              Miles de profesionales brillantes pierden ascensos, aumentos y ofertas en dólares cada
              año por dudar al hablar en inglés. Responde 3 preguntas rápidas y recibe una ruta
              diaria adaptada a tu agenda real.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <TactileButton onClick={onStartQuiz} size="lg">
                <span>Hacer diagnóstico gratis</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </TactileButton>
              <span className="text-sm text-[#777777] font-medium">
                Solo 3 preguntas · Incluye prueba de 14 días
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#4B4B4B] font-medium pt-4 border-t border-[#E5E5E5]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#3D8C00]" aria-hidden="true" />
                Menos de 1 minuto
              </span>
              <span aria-hidden="true" className="text-[#AFAFAF]">·</span>
              <span className="inline-flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#3D8C00]" aria-hidden="true" />
                Enfoque ejecutivo y entrevistas
              </span>
              <span aria-hidden="true" className="text-[#AFAFAF]">·</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3D8C00]" aria-hidden="true" />
                Resultado personalizado al instante
              </span>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className="w-full rounded-3xl border-2 border-[#E5E5E5] bg-[#F7F7F7] overflow-hidden flex items-center justify-center p-4 lg:p-6">
              {!imgError ? (
                <img
                  src={HERO_IMAGE_PATH}
                  alt="Mascota de Duolingo junto a una escalera ascendente de metas laborales y un trofeo"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full max-h-[380px] object-contain rounded-2xl bg-white"
                />
              ) : (
                <div className="w-full h-full min-h-[280px] rounded-2xl bg-gradient-to-br from-[#F1FBE8] via-white to-[#DDF4FF] flex flex-col items-center justify-center p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-[#58CC02] mb-3" aria-hidden="true" />
                  <p className="font-display text-lg font-bold text-[#3C3C3C]">
                    Tu próxima oportunidad laboral
                  </p>
                  <p className="text-sm text-[#777777]">
                    Inglés práctico para reuniones, entrevistas y liderazgo
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quantitative Proof Strip */}
      <section id="impacto" className="border-y border-[#E5E5E5] bg-[#F7F7F7]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PROOF_METRICS.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#3C3C3C] tabular-nums tracking-tight">
                  {metric.value}
                </span>
                <span className="text-sm text-[#4B4B4B] mt-1 leading-snug">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How the 60-Second Diagnosis Works */}
      <section id="como-funciona" className="max-w-[1160px] mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#3C3C3C] tracking-tight mb-3">
            Por qué estudiar gramática suelta no te da el ascenso
          </h2>
          <p className="text-base text-[#4B4B4B] leading-relaxed">
            La mayoría de profesionales abandonan cursos largos porque no atacan su bloqueo real al
            hablar. Nuestro diagnóstico calibra tu ruta en tres pasos concretos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border-2 border-[#E5E5E5] bg-white p-6 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs font-bold text-[#3D8C00] mb-2">01. Objetivo</p>
              <h3 className="font-display text-xl font-bold text-[#3C3C3C] mb-2">
                Define tu meta laboral
              </h3>
              <p className="text-sm text-[#4B4B4B] leading-relaxed">
                Entrevistas internacionales, presentaciones ante dirección o negociación salarial. Tu
                vocabulario se adapta al escenario que paga tus metas.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#E5E5E5] bg-white p-6 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs font-bold text-[#1899D6] mb-2">02. Ritmo</p>
              <h3 className="font-display text-xl font-bold text-[#3C3C3C] mb-2">
                Ajusta minutos reales
              </h3>
              <p className="text-sm text-[#4B4B4B] leading-relaxed">
                Calculamos las semanas exactas para ganar fluidez según tengas 5, 10, 15 o 20+
                minutos disponibles entre juntas.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#E5E5E5] bg-white p-6 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs font-bold text-[#9353D3] mb-2">03. Desbloqueo</p>
              <h3 className="font-display text-xl font-bold text-[#3C3C3C] mb-2">
                Ataca tu freno oral
              </h3>
              <p className="text-sm text-[#4B4B4B] leading-relaxed">
                Detectamos si tu barrera es el miedo a equivocarte, la velocidad mental o la
                pronunciación, y activamos las herramientas exactas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Attributable Testimonials */}
      <section id="testimonios" className="border-t border-[#E5E5E5] bg-[#F7F7F7]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#3C3C3C] tracking-tight mb-2">
                De quedarse callado en juntas a liderar en inglés
              </h2>
              <p className="text-base text-[#4B4B4B]">
                Resultados concretos de profesionales que convirtieron 15 minutos diarios en nuevas
                oportunidades.
              </p>
            </div>
            <TactileButton onClick={onStartQuiz} variant="secondary">
              Calcular mi plan ahora
            </TactileButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <article
                key={item.name}
                className="rounded-2xl border-2 border-[#E5E5E5] bg-white p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3 text-sm leading-relaxed text-[#4B4B4B]">
                  <p className="text-[#777777]">“{item.before}”</p>
                  <p className="font-semibold text-[#3C3C3C]">{item.outcome}</p>
                </div>
                <div className="pt-4 border-t border-[#E5E5E5]">
                  <p className="font-display font-bold text-base text-[#3C3C3C]">{item.name}</p>
                  <p className="text-xs text-[#777777]">
                    {item.role} · {item.company}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Super Duolingo Preview + Final Conversion */}
      <section id="super-duolingo" className="max-w-[1160px] mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="rounded-3xl bg-[#131F24] text-white p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-[#1CB0F6] mb-2">
              Incluido al finalizar tu diagnóstico
            </p>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-4">
              Activa 14 días gratis de Super Duolingo con tu perfil personalizado
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#D7E2E8]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#58CC02] shrink-0" aria-hidden="true" />
                Vidas ilimitadas para practicar sin freno
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#58CC02] shrink-0" aria-hidden="true" />
                Repaso personalizado de errores
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#58CC02] shrink-0" aria-hidden="true" />
                Práctica oral enfocada en fluidez
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#58CC02] shrink-0" aria-hidden="true" />
                Sin anuncios durante tu rutina diaria
              </li>
            </ul>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <TactileButton onClick={onStartQuiz} size="lg" className="w-full lg:w-auto">
              <span>Hacer diagnóstico gratis</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </TactileButton>
          </div>
        </div>
      </section>
    </div>
  );
}
