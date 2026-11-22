import { useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { QUIZ_QUESTIONS, QuizAnswers } from '../data/funnelData';
import { TactileButton } from './TactileButton';

interface QuizStageProps {
  currentStep: number;
  answers: QuizAnswers;
  onSelectAnswer: (key: keyof QuizAnswers, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuizStage({
  currentStep,
  answers,
  onSelectAnswer,
  onNext,
  onBack,
}: QuizStageProps) {
  const question = QUIZ_QUESTIONS[currentStep];
  const selectedValue = answers[question.key];
  const selectedOption = question.options.find((opt) => opt.id === selectedValue);
  const progressPercent = ((currentStep + (selectedValue ? 1 : 0.35)) / QUIZ_QUESTIONS.length) * 100;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= '1' && event.key <= '4') {
        const index = Number(event.key) - 1;
        const option = question.options[index];
        if (option) {
          onSelectAnswer(question.key, option.id);
        }
      } else if (event.key === 'Enter' && selectedValue) {
        event.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, selectedValue, onSelectAnswer, onNext]);

  return (
    <section className="min-h-[calc(100vh-68px)] flex flex-col justify-between bg-white">
      <div className="max-w-[780px] w-full mx-auto px-4 sm:px-6 pt-8 pb-10 flex-1 flex flex-col">
        {/* Progress Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-xl border-2 border-[#E5E5E5] flex items-center justify-center text-[#777777] hover:text-[#3C3C3C] hover:bg-[#F7F7F7] transition-colors cursor-pointer shrink-0"
            aria-label={currentStep === 0 ? 'Volver al inicio' : 'Pregunta anterior'}
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div
            className="flex-1 h-4 bg-[#E5E5E5] rounded-full overflow-hidden relative"
            role="progressbar"
            aria-valuenow={currentStep + 1}
            aria-valuemin={1}
            aria-valuemax={QUIZ_QUESTIONS.length}
            aria-label={`Pregunta ${currentStep + 1} de ${QUIZ_QUESTIONS.length}`}
          >
            <div
              className="h-full bg-[#58CC02] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative"
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            >
              <div className="absolute inset-x-2 top-1 h-1 bg-[#89E219] rounded-full opacity-80" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm font-bold text-[#FF9600] tabular-nums shrink-0">
            <Flame className="w-5 h-5 fill-[#FF9600] text-[#FF9600]" aria-hidden="true" />
            <span>
              {currentStep + 1}/{QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>

        {/* Question Prompt */}
        <motion.div
          key={question.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col justify-center"
        >
          <p className="text-sm font-bold text-[#1899D6] mb-2">
            Pregunta {question.stepNumber} de {QUIZ_QUESTIONS.length} · {question.kicker}
          </p>
          <h1
            className="font-display font-extrabold text-2xl sm:text-3xl text-[#3C3C3C] tracking-tight mb-7"
            style={{ textWrap: 'balance' }}
          >
            {question.question}
          </h1>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3.5">
            {question.options.map((option, idx) => {
              const isSelected = selectedValue === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelectAnswer(question.key, option.id)}
                  aria-pressed={isSelected}
                  className={`group w-full text-left rounded-2xl p-4 sm:p-5 border-2 border-b-4 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-start gap-4 cursor-pointer active:translate-y-[2px] active:border-b-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1CB0F6] ${
                    isSelected
                      ? 'bg-[#DDF4FF] border-[#1CB0F6] text-[#131F24]'
                      : 'bg-white border-[#E5E5E5] hover:bg-[#F7F7F7] hover:border-[#D0D0D0] text-[#3C3C3C]'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'bg-[#1CB0F6] border-[#1899D6] text-white'
                        : 'bg-white border-[#E5E5E5] text-[#777777] group-hover:border-[#CCCCCC]'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-base sm:text-lg leading-snug">
                      {option.label}
                    </p>
                    <p
                      className={`text-sm mt-1 leading-snug ${
                        isSelected ? 'text-[#18587A]' : 'text-[#777777]'
                      }`}
                    >
                      {option.sublabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Duolingo-style Bottom Feedback & Continue Bar */}
      <div
        className={`border-t-2 transition-colors duration-200 ${
          selectedOption
            ? 'bg-[#D7FFB8] border-[#B8F28B]'
            : 'bg-white border-[#E5E5E5]'
        }`}
      >
        <div className="max-w-[780px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3 min-h-[44px]">
            {selectedOption ? (
              <>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#58CC02]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display font-extrabold text-sm text-[#3D8C00]">
                    Ajuste guardado
                  </p>
                  <p className="text-sm font-medium text-[#2F6B00]">
                    {selectedOption.feedback}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-[#777777] font-medium">
                Elige una opción (o presiona las teclas 1–4) para continuar.
              </p>
            )}
          </div>

          <TactileButton
            onClick={onNext}
            disabled={!selectedOption}
            size="lg"
            className="w-full sm:w-auto"
          >
            {currentStep === QUIZ_QUESTIONS.length - 1 ? 'Ver mi diagnóstico' : 'Continuar'}
          </TactileButton>
        </div>
      </div>
    </section>
  );
}
