import { useEffect, useState } from 'react';
import { HeroLanding } from './components/HeroLanding';
import { LeadCaptureStage } from './components/LeadCaptureStage';
import { QuizStage } from './components/QuizStage';
import { ResultsStage } from './components/ResultsStage';
import { TopBar } from './components/TopBar';
import { QUIZ_QUESTIONS, QuizAnswers } from './data/funnelData';

type FunnelStage = 'hero' | 'quiz' | 'lead' | 'results';

const INITIAL_ANSWERS: QuizAnswers = {
  objective: null,
  dailyTime: null,
  blocker: null,
};

export default function App() {
  const [stage, setStage] = useState<FunnelStage>('hero');
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage, quizStep]);

  const handleStartQuiz = () => {
    setQuizStep(0);
    setStage('quiz');
  };

  const handleRestartQuiz = () => {
    setAnswers(INITIAL_ANSWERS);
    setQuizStep(0);
    setStage('quiz');
  };

  const handleSelectAnswer = (key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleQuizNext = () => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep((prev) => prev + 1);
    } else {
      setStage('lead');
    }
  };

  const handleQuizBack = () => {
    if (quizStep > 0) {
      setQuizStep((prev) => prev - 1);
    } else {
      setStage('hero');
    }
  };

  const handleSubmitLead = (name: string, email: string) => {
    setLeadName(name);
    setLeadEmail(email);
    setStage('results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#3C3C3C]">
      <TopBar
        onStartQuiz={handleStartQuiz}
        onGoHome={() => setStage('hero')}
        isFunnelActive={stage !== 'hero'}
      />

      <main className="flex-1">
        {stage === 'hero' && <HeroLanding onStartQuiz={handleStartQuiz} />}

        {stage === 'quiz' && (
          <QuizStage
            currentStep={quizStep}
            answers={answers}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleQuizNext}
            onBack={handleQuizBack}
          />
        )}

        {stage === 'lead' && (
          <LeadCaptureStage
            answers={answers}
            initialName={leadName}
            initialEmail={leadEmail}
            onSubmitLead={handleSubmitLead}
            onBackToQuiz={() => {
              setQuizStep(QUIZ_QUESTIONS.length - 1);
              setStage('quiz');
            }}
          />
        )}

        {stage === 'results' && (
          <ResultsStage
            leadName={leadName}
            leadEmail={leadEmail}
            answers={answers}
            onRestartQuiz={handleRestartQuiz}
          />
        )}
      </main>

      <footer className="border-t border-[#E5E5E5] bg-white">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <p className="font-semibold text-[#4B4B4B]">
            Duolingo para Profesionales · Diagnóstico de Ascenso Laboral
          </p>
          <p>
            © {new Date().getFullYear()} Duolingo. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
