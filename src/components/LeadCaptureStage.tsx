import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Compass, Lock, Mail, User } from 'lucide-react';
import { motion } from 'motion/react';
import { QuizAnswers, computeCareerProfile } from '../data/funnelData';
import { TactileButton } from './TactileButton';

interface LeadCaptureStageProps {
  answers: QuizAnswers;
  initialName: string;
  initialEmail: string;
  onSubmitLead: (name: string, email: string) => void;
  onBackToQuiz: () => void;
}

export function LeadCaptureStage({
  answers,
  initialName,
  initialEmail,
  onSubmitLead,
  onBackToQuiz,
}: LeadCaptureStageProps) {
  const [analyzing, setAnalyzing] = useState(true);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const previewProfile = computeCareerProfile(answers);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAnalyzing(false);
    }, 950);
    return () => window.clearTimeout(timer);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const nextErrors: { name?: string; email?: string } = {};

    if (trimmedName.length < 2) {
      nextErrors.name = 'Ingresa tu nombre para personalizar tu plan.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      nextErrors.email = 'Ingresa un correo electrónico válido.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    onSubmitLead(trimmedName, trimmedEmail);
  };

  if (analyzing) {
    return (
      <section className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12 bg-white">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#F1FBE8] border-2 border-[#B8F28B] flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8 text-[#58CC02]" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-2xl text-[#3C3C3C]">
              Calculando tu ruta profesional...
            </h1>
            <p className="text-sm text-[#777777]">
              Cruzando tu objetivo laboral, ritmo de {previewProfile.dailyMinutesLabel} y bloqueo
              principal.
            </p>
          </div>
          <div className="w-full h-3 bg-[#E5E5E5] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '15%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-[#58CC02] rounded-full"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-68px)] bg-[#F7F7F7] py-10 sm:py-14 px-4 sm:px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[920px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        {/* Left: Calculated Diagnosis Preview */}
        <div className="lg:col-span-5 rounded-3xl border-2 border-[#E5E5E5] bg-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <button
              type="button"
              onClick={onBackToQuiz}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#777777] hover:text-[#3C3C3C] mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Ajustar respuestas
            </button>

            <p className="text-xs font-bold text-[#3D8C00] mb-2">
              Diagnóstico completado
            </p>
            <h2 className="font-display font-extrabold text-2xl text-[#3C3C3C] leading-tight mb-4">
              Tu plan de {previewProfile.estimatedWeeks} semanas está listo
            </h2>

            <div className="space-y-3 pt-4 border-t border-[#E5E5E5] text-sm">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#58CC02] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-[#3C3C3C]">Meta: </span>
                  <span className="text-[#4B4B4B]">{previewProfile.objectiveLabel}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#58CC02] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-[#3C3C3C]">Ritmo asignado: </span>
                  <span className="text-[#4B4B4B] tabular-nums">
                    {previewProfile.dailyMinutesLabel} ({previewProfile.dailyXp} XP diarios)
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#58CC02] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-[#3C3C3C]">Foco de desbloqueo: </span>
                  <span className="text-[#4B4B4B]">{previewProfile.blockerLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#E5E5E5] flex items-center gap-2 text-xs text-[#777777]">
            <Lock className="w-4 h-4 text-[#1899D6] shrink-0" aria-hidden="true" />
            <span>Incluye pase reservado de 14 días gratis de Super Duolingo.</span>
          </div>
        </div>

        {/* Right: Lead Capture Form */}
        <div className="lg:col-span-7 rounded-3xl border-2 border-[#E5E5E5] bg-white p-6 sm:p-8 flex flex-col justify-center">
          <p className="text-sm font-bold text-[#1899D6] mb-1">Último paso</p>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#3C3C3C] tracking-tight mb-2">
            Desbloquea tu perfil y hoja de ruta personalizada
          </h1>
          <p className="text-sm sm:text-base text-[#4B4B4B] mb-6">
            Ingresa tu nombre y correo para ver tu diagnóstico completo, tu mapa de 4 semanas y
            activar tu prueba gratuita de 14 días.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="lead-name" className="block text-sm font-bold text-[#3C3C3C] mb-1.5">
                Nombre completo
              </label>
              <div className="relative">
                <User
                  className="w-5 h-5 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ej. Laura Fernández"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  aria-invalid={Boolean(errors.name)}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 bg-[#F7F7F7] focus:bg-white text-base text-[#3C3C3C] placeholder:text-[#999999] outline-none transition-colors ${
                    errors.name
                      ? 'border-[#EA2B2B] focus:border-[#EA2B2B]'
                      : 'border-[#E5E5E5] focus:border-[#1CB0F6]'
                  }`}
                />
              </div>
              {errors.name && (
                <p role="alert" className="text-xs font-semibold text-[#EA2B2B] mt-1.5">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lead-email" className="block text-sm font-bold text-[#3C3C3C] mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail
                  className="w-5 h-5 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="lead-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu.nombre@empresa.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  aria-invalid={Boolean(errors.email)}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 bg-[#F7F7F7] focus:bg-white text-base text-[#3C3C3C] placeholder:text-[#999999] outline-none transition-colors ${
                    errors.email
                      ? 'border-[#EA2B2B] focus:border-[#EA2B2B]'
                      : 'border-[#E5E5E5] focus:border-[#1CB0F6]'
                  }`}
                />
              </div>
              {errors.email && (
                <p role="alert" className="text-xs font-semibold text-[#EA2B2B] mt-1.5">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="pt-2">
              <TactileButton type="submit" size="lg" fullWidth>
                Desbloquear mi plan personalizado
              </TactileButton>
            </div>

            <p className="text-xs text-[#777777] text-center pt-1">
              Sin tarjeta requerida para ver tu perfil · Tus datos se mantienen privados.
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
