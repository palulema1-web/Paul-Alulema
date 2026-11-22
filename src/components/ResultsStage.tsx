import { useEffect, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  RefreshCw,
  ShieldCheck,
  Target,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { QuizAnswers, computeCareerProfile } from '../data/funnelData';
import { TactileButton } from './TactileButton';

interface ResultsStageProps {
  leadName: string;
  leadEmail: string;
  answers: QuizAnswers;
  onRestartQuiz: () => void;
}

const SUPER_TROPHY_PATH = '/src/assets/images/super_duolingo_trophy_1795210114222.jpg';

function formatCountdown(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function ResultsStage({
  leadName,
  leadEmail,
  answers,
  onRestartQuiz,
}: ResultsStageProps) {
  const profile = computeCareerProfile(answers);
  const firstName = leadName.split(' ')[0] || leadName;

  // 14:59 urgency timer in seconds
  const [secondsLeft, setSecondsLeft] = useState(14 * 60 + 59);
  const [trialActivated, setTrialActivated] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (trialActivated) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [trialActivated]);

  return (
    <section className="bg-[#F7F7F7] py-10 sm:py-14 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1100px] mx-auto space-y-8"
      >
        {/* Top Personalized Header */}
        <div className="rounded-3xl border-2 border-[#E5E5E5] bg-white p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#E5E5E5]">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-[#3D8C00] mb-2">
                Resultados listos para {firstName} · {leadEmail}
              </p>
              <h1
                className="font-display font-extrabold text-3xl sm:text-4xl text-[#3C3C3C] tracking-tight mb-3"
                style={{ textWrap: 'balance' }}
              >
                Tu perfil profesional: {profile.profileTitle}
              </h1>
              <p className="text-base text-[#4B4B4B] leading-relaxed">
                {profile.profileTagline}
              </p>
            </div>

            <button
              type="button"
              onClick={onRestartQuiz}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1899D6] hover:text-[#1374A3] self-start lg:self-center cursor-pointer whitespace-nowrap shrink-0"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Repetir diagnóstico
            </button>
          </div>

          {/* 3-Column Personalized Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="rounded-2xl bg-[#F7F7F7] p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#3D8C00] mb-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                Horizonte estimado
              </div>
              <p className="font-display font-extrabold text-3xl text-[#3C3C3C] tabular-nums">
                {profile.estimatedWeeks} semanas
              </p>
              <p className="text-sm text-[#4B4B4B] mt-1">
                Para soltura real con {profile.dailyMinutesLabel}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7F7F7] p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1899D6] mb-2">
                <Zap className="w-4 h-4" aria-hidden="true" />
                Meta diaria sugerida
              </div>
              <p className="font-display font-extrabold text-3xl text-[#3C3C3C] tabular-nums">
                {profile.dailyXp} XP / día
              </p>
              <p className="text-sm text-[#4B4B4B] mt-1">
                Diseñada para mantener tu racha laboral
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7F7F7] p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#9353D3] mb-2">
                <Target className="w-4 h-4" aria-hidden="true" />
                Palanca de desbloqueo
              </div>
              <p className="font-display font-extrabold text-lg text-[#3C3C3C] leading-snug">
                {profile.superFeatureTitle}
              </p>
              <p className="text-sm text-[#4B4B4B] mt-1">
                Ataca directo tu freno al hablar
              </p>
            </div>
          </div>

          {/* Tailored Blocker Diagnosis */}
          <div className="mt-8 pt-8 border-t border-[#E5E5E5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="font-display font-extrabold text-xl text-[#3C3C3C]">
                Por qué hoy pierdes oportunidades y cómo corregirlo
              </h2>
              <p className="text-sm text-[#4B4B4B] leading-relaxed">
                {profile.blockerDiagnosis}
              </p>
              <div className="pt-2">
                <p className="text-xs font-bold text-[#1899D6] mb-1">
                  Herramienta recomendada para ti
                </p>
                <p className="text-sm font-semibold text-[#3C3C3C]">
                  {profile.superFeatureDetail}
                </p>
              </div>
            </div>

            {/* 4-Week Customized Gamified Path */}
            <div className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-xl text-[#3C3C3C] mb-4">
                Tu ruta personalizada de las próximas 4 semanas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.roadmap.map((step, index) => (
                  <div
                    key={step.week}
                    className="rounded-2xl border-2 border-[#E5E5E5] bg-white p-4 flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-xs font-bold text-[#3D8C00]">
                          0{index + 1}. {step.week}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#777777] tabular-nums">
                          {step.xpTarget}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base text-[#3C3C3C]">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4B4B4B] mt-1 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Super Duolingo 14-Day Free Trial Offer + Live Urgency Countdown */}
        <div className="rounded-3xl bg-[#131F24] text-white p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Visual Emblem */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[280px] aspect-square rounded-3xl overflow-hidden border border-white/10 bg-[#1B2A32] flex items-center justify-center p-2">
                {!imgError ? (
                  <img
                    src={SUPER_TROPHY_PATH}
                    alt="Emblema Super Duolingo con búho celebrando ascenso profesional"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <Award className="w-16 h-16 text-[#1CB0F6] mb-3" aria-hidden="true" />
                    <p className="font-display font-extrabold text-xl">SUPER DUOLINGO</p>
                  </div>
                )}
              </div>
            </div>

            {/* Offer & Countdown */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/15">
                <div>
                  <p className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1CB0F6]">
                    <Award className="w-4 h-4" aria-hidden="true" />
                    Pase reservado para {firstName}
                  </p>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mt-1">
                    Prueba Super Duolingo 14 días gratis
                  </h2>
                </div>

                {/* Live Urgency Countdown */}
                <div
                  className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3 shrink-0"
                  aria-live="polite"
                >
                  <p className="text-xs font-semibold text-[#A8B8C2] mb-0.5">
                    Reserva garantizada por
                  </p>
                  <p className="font-mono font-bold text-2xl text-[#FFC800] tabular-nums tracking-tight">
                    {formatCountdown(secondsLeft)}
                  </p>
                </div>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#E2EBF0]">
                {profile.superBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-5 h-5 text-[#58CC02] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {!trialActivated ? (
                <div className="pt-2 space-y-3">
                  <TactileButton
                    variant="super"
                    size="lg"
                    fullWidth
                    onClick={() => setTrialActivated(true)}
                  >
                    Activar 14 días gratis de Super Duolingo
                  </TactileButton>
                  <p className="text-xs text-[#A8B8C2] flex items-center justify-center gap-1.5 text-center">
                    <ShieldCheck className="w-4 h-4 text-[#58CC02] shrink-0" aria-hidden="true" />
                    $0 USD hoy · Te enviamos recordatorio 2 días antes de finalizar tu prueba.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-[#1E3A2A] border-2 border-[#58CC02] p-5 space-y-2"
                >
                  <div className="flex items-center gap-2 text-[#89E219] font-display font-extrabold text-lg">
                    <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
                    <span>¡Prueba gratuita de 14 días activada!</span>
                  </div>
                  <p className="text-sm text-[#E2EBF0] leading-relaxed">
                    Enviamos tu acceso personalizado para el perfil{' '}
                    <strong className="text-white">{profile.profileTitle}</strong> a{' '}
                    <strong className="text-white">{leadEmail}</strong>. Tu primera sesión diaria
                    de {profile.dailyMinutesLabel} ya está lista.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
