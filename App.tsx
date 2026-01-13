import React, { useState } from 'react';
import { QuizCategory, Question, QuizState } from './types';
import { QUESTIONS, PARTS_LIBRARY } from './constants';
import { gemini } from './services/geminiService';
import VisualDiagram from './components/VisualDiagram';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-sylva rotate-45 rounded-sm shadow-sm"></div>
      <svg viewBox="0 0 100 100" className="relative w-7 h-7 fill-none stroke-white stroke-[2.5]">
        <path d="M10 85 L50 15 L90 85 Z" strokeLinejoin="round" />
        <path d="M50 15 L50 85" strokeDasharray="4 2" className="opacity-70" />
        <path d="M20 85 L80 85" />
        <path d="M30 50 L50 70 M70 50 L50 70" />
      </svg>
    </div>
    <div className="flex flex-col -space-y-1">
      <span className="text-xl font-black text-stone-800 tracking-tighter uppercase leading-none">
        SYLVA<span className="text-sylva">STRUCTURE</span>
      </span>
      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.3em] leading-none">
        Portail Expert Commercial
      </span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'quiz' | 'simulator' | 'library'>('home');
  const [gameState, setGameState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false,
    selectedOption: null,
    showExplanation: false,
    category: null,
  });

  // Simulator State
  const [pitch, setPitch] = useState('');
  const [simResult, setSimResult] = useState<{ reaction: string, score: number, feedback: string } | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const [expertAdvice, setExpertAdvice] = useState<string>('');
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState<boolean>(false);
  const [tempSelection, setTempSelection] = useState<number[]>([]);

  const startQuiz = (category: QuizCategory | null) => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false,
      selectedOption: null,
      showExplanation: false,
      category: category,
    });
    setTempSelection([]);
    setView('quiz');
  };

  const filteredQuestions = gameState.category 
    ? QUESTIONS.filter(q => q.category === gameState.category)
    : QUESTIONS;

  const currentQuestion = filteredQuestions[gameState.currentQuestionIndex];

  const handleAnswer = async (index: number) => {
    if (gameState.selectedOption !== null) return;
    const isCorrect = index === currentQuestion.correctAnswer;
    setGameState(prev => ({ ...prev, selectedOption: index, score: isCorrect ? prev.score + 1 : prev.score, showExplanation: true }));
    setIsGeneratingAdvice(true);
    const advice = await gemini.getExpertAdvice(currentQuestion.options[index], currentQuestion.options[currentQuestion.correctAnswer as number], currentQuestion.question);
    setExpertAdvice(advice);
    setIsGeneratingAdvice(false);
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    const result = await gemini.simulateClientResponse(pitch, "Propriétaire d'une ferme vosgienne, inquiet sur la solidité", "L'intérêt d'une ferme latine pour une grande portée");
    setSimResult(result);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-sylva-bg flex flex-col font-sans text-stone-900">
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => setView('home')}>
          <Logo />
        </div>
        <nav className="flex items-center gap-6">
          <button onClick={() => setView('simulator')} className={`text-xs font-black uppercase tracking-widest ${view === 'simulator' ? 'text-sylva' : 'text-stone-400 hover:text-sylva'}`}>Simulateur</button>
          <button onClick={() => setView('library')} className={`text-xs font-black uppercase tracking-widest ${view === 'library' ? 'text-sylva' : 'text-stone-400 hover:text-sylva'}`}>Bibliothèque</button>
        </nav>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        {view === 'home' && (
          <div className="py-12 space-y-20 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                Dominez l'Art de la <br/>
                <span className="text-sylva italic">Charpente Traditionnelle</span>
              </h1>
              <p className="text-stone-500 text-xl font-medium">L'outil de formation ultime pour l'élite commerciale de SylvaStructure.</p>
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <button onClick={() => startQuiz(null)} className="px-8 py-4 sylva-gradient text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-all">Lancer le Parcours Expert</button>
                <button onClick={() => setView('simulator')} className="px-8 py-4 bg-white border border-stone-200 text-stone-900 rounded-2xl font-black uppercase tracking-widest text-sm shadow-sm hover:bg-stone-50 transition-all">Mode Simulateur IA</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="perspective-lg">
                <div className="rotate-truss transition-transform duration-700 hover:rotate-0">
                  <VisualDiagram />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.4em] mb-4">Modules de Certification</h3>
                <div className="grid gap-3">
                  {[
                    { title: "Terminologie Vosgienne", cat: QuizCategory.TERMINOLOGY, icon: "🌲" },
                    { title: "Eurocodes & Neige", cat: QuizCategory.TECHNICAL, icon: "❄️" },
                    { title: "Diagnostic Rénovation", cat: QuizCategory.STUDY_CASE, icon: "🔍" },
                  ].map((m) => (
                    <button key={m.title} onClick={() => startQuiz(m.cat)} className="flex items-center gap-6 p-5 bg-white border border-stone-200 rounded-2xl hover:border-sylva hover:translate-x-2 transition-all group">
                      <span className="text-3xl">{m.icon}</span>
                      <span className="font-black uppercase tracking-tight text-stone-700 group-hover:text-sylva">{m.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'quiz' && !gameState.isFinished && (
          <div className="max-w-3xl mx-auto py-10 space-y-8 animate-in slide-in-from-bottom-8 duration-500">
             <div className="bg-white rounded-[40px] shadow-2xl border border-stone-100 overflow-hidden">
                <div className="h-2 bg-stone-100 w-full overflow-hidden">
                  <div className="h-full bg-sylva transition-all duration-1000" style={{ width: `${((gameState.currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }} />
                </div>
                <div className="p-10 space-y-8">
                  <div className="flex justify-between items-center text-[10px] font-black text-stone-400 uppercase tracking-widest">
                    <span>{currentQuestion.category}</span>
                    <span>Q{gameState.currentQuestionIndex + 1} / {filteredQuestions.length}</span>
                  </div>
                  <h2 className="text-3xl font-black leading-tight tracking-tight">{currentQuestion.question}</h2>
                  <div className="grid gap-3">
                    {currentQuestion.options.map((opt, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleAnswer(i)}
                        disabled={gameState.selectedOption !== null}
                        className={`p-6 rounded-2xl border-2 text-left font-bold transition-all ${
                          gameState.selectedOption === null 
                            ? 'border-stone-100 hover:border-sylva hover:bg-sylva/5' 
                            : i === currentQuestion.correctAnswer 
                              ? 'border-sylva bg-sylva/10' 
                              : i === gameState.selectedOption 
                                ? 'border-red-500 bg-red-50 text-red-900' 
                                : 'opacity-40 border-stone-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
             </div>
             {gameState.showExplanation && (
               <div className="bg-white p-8 rounded-[32px] border-l-8 border-sylva shadow-xl animate-in fade-in duration-500">
                 <h4 className="text-[10px] font-black text-sylva uppercase tracking-widest mb-4">Expertise SylvaStructure</h4>
                 <p className="text-lg font-bold text-stone-800 mb-6">{currentQuestion.explanation}</p>
                 <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                    <p className="text-stone-500 italic text-sm leading-relaxed">{expertAdvice || "Génération du conseil expert..."}</p>
                 </div>
                 <button onClick={() => gameState.currentQuestionIndex < filteredQuestions.length - 1 ? setGameState(s => ({...s, currentQuestionIndex: s.currentQuestionIndex + 1, selectedOption: null, showExplanation: false})) : setGameState(s => ({...s, isFinished: true}))} className="w-full mt-8 p-5 sylva-gradient text-white rounded-2xl font-black uppercase tracking-widest text-xs">Continuer</button>
               </div>
             )}
          </div>
        )}

        {view === 'simulator' && (
          <div className="max-w-4xl mx-auto py-10 space-y-8 animate-in slide-in-from-right-8 duration-700">
            <div className="bg-stone-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1 space-y-6">
                  <span className="text-sylva text-[10px] font-black uppercase tracking-[0.4em]">Simulation IA Haute Fidélité</span>
                  <h2 className="text-4xl font-black tracking-tighter italic leading-none">Incarnez l'expertise face au client.</h2>
                  <p className="text-stone-400 font-medium">Pitcher votre solution technique. L'IA de SylvaStructure analysera votre persuasion et votre justesse technique.</p>
                </div>
                <div className="w-48 h-48 bg-sylva/20 rounded-full flex items-center justify-center border-4 border-sylva/30 animate-pulse">
                  <span className="text-6xl">🤖</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[32px] border border-stone-200 shadow-sm space-y-6">
                <h4 className="font-black uppercase text-[10px] text-stone-400 tracking-widest">Votre Argumentaire</h4>
                <textarea 
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="Expliquez ici pourquoi vous préconisez cette solution technique..."
                  className="w-full h-64 p-6 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-sylva font-medium text-stone-700 resize-none"
                />
                <button 
                  onClick={runSimulation}
                  disabled={isSimulating || !pitch}
                  className="w-full p-5 sylva-gradient text-white rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-30"
                >
                  {isSimulating ? "Analyse en cours..." : "Soumettre au Client"}
                </button>
              </div>

              <div className="space-y-6">
                {simResult ? (
                  <div className="space-y-6 animate-in zoom-in duration-500">
                    <div className="bg-white p-8 rounded-[32px] border border-stone-200 shadow-sm">
                      <h4 className="font-black uppercase text-[10px] text-sylva tracking-widest mb-4">Réaction du Client</h4>
                      <p className="text-xl font-bold italic text-stone-800">"{simResult.reaction}"</p>
                    </div>
                    <div className="bg-stone-900 text-white p-8 rounded-[32px] shadow-xl">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Score de Performance</span>
                        <span className={`text-3xl font-black ${simResult.score > 70 ? 'text-sylva' : 'text-amber-500'}`}>{simResult.score}%</span>
                      </div>
                      <p className="text-stone-400 text-sm leading-relaxed font-medium">{simResult.feedback}</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white/50 border-2 border-dashed border-stone-200 rounded-[32px]">
                    <span className="text-4xl mb-4">🏠</span>
                    <p className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">En attente de votre pitch</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'library' && (
          <div className="py-10 space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
              <h2 className="text-4xl font-black tracking-tighter uppercase">Le Grimoire de la Charpente</h2>
              <button onClick={() => setView('home')} className="text-[10px] font-black uppercase tracking-widest text-stone-400">Fermer</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARTS_LIBRARY.map((p, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
                   <div className="w-10 h-10 bg-sylva/10 rounded-xl flex items-center justify-center text-sylva font-black mb-6 group-hover:scale-110 transition-transform">{i+1}</div>
                   <h3 className="text-xl font-black uppercase tracking-tight mb-2">{p.name}</h3>
                   <p className="text-stone-500 text-sm font-medium leading-relaxed">{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState.isFinished && (
           <div className="max-w-md mx-auto py-20 text-center space-y-8 animate-in zoom-in duration-700">
              <div className="text-8xl mb-6">🏆</div>
              <h2 className="text-4xl font-black tracking-tighter uppercase">Certification Validée</h2>
              <div className="bg-white p-10 rounded-[48px] shadow-2xl border border-stone-100">
                <span className="text-6xl font-black text-sylva">{Math.round((gameState.score / filteredQuestions.length)*100)}%</span>
                <p className="text-stone-400 font-black uppercase tracking-widest text-[10px] mt-2">Maîtrise Technique</p>
                <div className="grid gap-3 mt-10">
                  <button onClick={() => setView('home')} className="w-full p-5 sylva-gradient text-white rounded-2xl font-black uppercase tracking-widest text-xs">Menu Principal</button>
                  <button onClick={() => startQuiz(null)} className="w-full p-5 bg-stone-50 text-stone-500 rounded-2xl font-black uppercase tracking-widest text-xs">Recommencer</button>
                </div>
              </div>
           </div>
        )}
      </main>
      
      <footer className="py-12 border-t border-stone-100 bg-white mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
           <p className="text-[9px] font-black text-stone-300 uppercase tracking-[0.5em]">SylvaStructure Ecosystem • 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default App;