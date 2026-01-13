
import React, { useState, useEffect } from 'react';
import { QuizCategory, Question, QuizState } from './types';
import { QUESTIONS, PARTS_LIBRARY } from './constants';
import { gemini } from './services/geminiService';
import VisualDiagram from './components/VisualDiagram';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Background shape: clean and geometric */}
      <div className="absolute inset-0 bg-sylva rotate-45 rounded-sm shadow-sm"></div>
      {/* Technical lines icon: representing a traditional truss with precision */}
      <svg viewBox="0 0 100 100" className="relative w-7 h-7 fill-none stroke-white stroke-[2.5] overflow-visible">
        {/* Main truss shape */}
        <path d="M10 85 L50 15 L90 85 Z" strokeLinejoin="round" />
        {/* King post (Poinçon) */}
        <path d="M50 15 L50 85" strokeDasharray="4 2" className="opacity-70" />
        {/* Tie beam (Entrait) detail */}
        <path d="M20 85 L80 85" />
        {/* Struts (Contrefiches) */}
        <path d="M30 50 L50 70 M70 50 L50 70" />
      </svg>
    </div>
    <div className="flex flex-col -space-y-1">
      <span className="text-xl font-black text-stone-800 tracking-tighter uppercase leading-none">
        SYLVA<span className="text-sylva">STRUCTURE</span>
      </span>
      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.3em] leading-none">
        Ingénierie Bois • Grand Est
      </span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [gameState, setGameState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false,
    selectedOption: null,
    showExplanation: false,
    category: null,
  });

  const [expertAdvice, setExpertAdvice] = useState<string>('');
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState<boolean>(false);
  const [view, setView] = useState<'home' | 'quiz' | 'library'>('home');
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

  const handleOptionToggle = (index: number) => {
    if (gameState.selectedOption !== null) return;
    setTempSelection(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const submitStudyAnswer = async () => {
    if (gameState.selectedOption !== null) return;
    
    const correctAnswers = currentQuestion.correctAnswer as number[];
    const isCorrect = 
      tempSelection.length === correctAnswers.length && 
      tempSelection.every(val => correctAnswers.includes(val));

    setGameState(prev => ({
      ...prev,
      selectedOption: tempSelection,
      score: isCorrect ? prev.score + 1 : prev.score,
      showExplanation: true
    }));

    setIsGeneratingAdvice(true);
    const advice = await gemini.getExpertAdvice(
      tempSelection.map(i => currentQuestion.options[i]).join(', '),
      correctAnswers.map(i => currentQuestion.options[i]).join(', '),
      currentQuestion.question
    );
    setExpertAdvice(advice);
    setIsGeneratingAdvice(false);
  };

  const handleAnswer = async (index: number) => {
    if (gameState.selectedOption !== null) return;

    const isCorrect = index === currentQuestion.correctAnswer;
    setGameState(prev => ({
      ...prev,
      selectedOption: index,
      score: isCorrect ? prev.score + 1 : prev.score,
      showExplanation: true
    }));

    setIsGeneratingAdvice(true);
    const advice = await gemini.getExpertAdvice(
      currentQuestion.options[index],
      currentQuestion.options[currentQuestion.correctAnswer as number],
      currentQuestion.question
    );
    setExpertAdvice(advice);
    setIsGeneratingAdvice(false);
  };

  const nextQuestion = () => {
    if (gameState.currentQuestionIndex < filteredQuestions.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedOption: null,
        showExplanation: false,
      }));
      setTempSelection([]);
      setExpertAdvice('');
    } else {
      setGameState(prev => ({ ...prev, isFinished: true }));
    }
  };

  return (
    <div className="min-h-screen bg-sylva-bg flex flex-col font-sans">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="cursor-pointer" onClick={() => setView('home')}>
          <Logo className="scale-90 sm:scale-100 origin-left" />
        </div>
        
        <nav className="flex items-center gap-6">
          {view === 'quiz' && !gameState.isFinished && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-sylva uppercase tracking-widest hidden md:block">Progression</span>
              <div className="w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                <div 
                  className="h-full bg-sylva transition-all duration-700" 
                  style={{ width: `${((gameState.currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
                />
              </div>
            </div>
          )}
          <button 
            onClick={() => setView('library')}
            className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${view === 'library' ? 'text-sylva' : 'text-stone-400 hover:text-sylva'}`}
          >
            Bibliothèque
          </button>
        </nav>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:py-10">
        {view === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-1000">
            <section className="text-center space-y-6">
              <div className="inline-block px-4 py-1 bg-white border border-stone-200 rounded-full text-stone-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                Portail Expert Commercial
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-stone-900 leading-none tracking-tighter">
                L'Excellence de la <br/>
                <span className="text-sylva italic">Structure Traditionnelle</span>
              </h2>
              <p className="text-stone-500 max-w-2xl mx-auto text-lg font-medium">
                Accédez aux modules de formation avancée de SylvaStructure pour maîtriser les spécificités techniques du Grand Est.
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-8">
                <VisualDiagram />
                <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="font-black text-sylva uppercase tracking-[0.2em] text-[10px] mb-4">Note Technique</h3>
                    <p className="text-stone-700 leading-relaxed font-semibold text-lg italic">
                      "Une étude de charge précise est le gage de notre fiabilité. Apprenez à ne négliger aucune donnée terrain."
                    </p>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sylva/5 rounded-full blur-3xl group-hover:bg-sylva/10 transition-colors"></div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] px-2">Certifications Disponibles</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { cat: QuizCategory.TERMINOLOGY, icon: '🌲', desc: 'Lexique et pièces traditionnelles.' },
                    { cat: QuizCategory.STUDY_CASE, icon: '📑', desc: 'Analyse de données manquantes.' },
                    { cat: QuizCategory.TECHNICAL, icon: '❄️', desc: 'Charges de neige et Eurocodes.' },
                    { cat: QuizCategory.CLIENT_ADVICE, icon: '🏠', desc: 'Conseils et rénovation durable.' },
                  ].map((item) => (
                    <button
                      key={item.cat}
                      onClick={() => startQuiz(item.cat)}
                      className="group relative flex items-center p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-sylva/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                      <span className="text-4xl mr-6 z-10">{item.icon}</span>
                      <div className="z-10">
                        <h4 className="font-black text-stone-800 uppercase tracking-tight group-hover:text-sylva transition-colors">{item.cat}</h4>
                        <p className="text-stone-500 text-xs font-medium">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => startQuiz(null)}
                    className="w-full p-5 sylva-gradient text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:brightness-110 shadow-lg shadow-sylva/20 transition-all mt-6"
                  >
                    Lancer le Parcours Intégral
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'quiz' && !gameState.isFinished && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-12 duration-500">
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-stone-100">
              <div className="min-h-48 relative bg-stone-900 p-8 flex flex-col justify-end">
                {currentQuestion.imageUrl && (
                  <img 
                    src={currentQuestion.imageUrl} 
                    alt="Question" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sylva text-[10px] font-black uppercase tracking-[0.3em]">
                      {currentQuestion.category} {currentQuestion.type === 'missing-data' ? '• Analyse Étude' : ''}
                    </span>
                    <span className="text-white/40 text-[10px] font-bold">Question {gameState.currentQuestionIndex + 1} sur {filteredQuestions.length}</span>
                  </div>
                  
                  {currentQuestion.dataContext && (
                    <div className="mb-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white/90 font-medium text-sm italic">
                      "{currentQuestion.dataContext}"
                    </div>
                  )}

                  <h3 className="text-white text-2xl md:text-3xl font-black leading-tight tracking-tight">
                    {currentQuestion.question}
                  </h3>
                </div>
              </div>
              
              <div className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = Array.isArray(gameState.selectedOption) 
                      ? gameState.selectedOption.includes(idx) 
                      : gameState.selectedOption === idx;
                    
                    const isTempSelected = tempSelection.includes(idx);
                    const isCorrect = Array.isArray(currentQuestion.correctAnswer)
                      ? currentQuestion.correctAnswer.includes(idx)
                      : idx === currentQuestion.correctAnswer;
                    
                    const showResult = gameState.selectedOption !== null;

                    let btnClass = "relative overflow-hidden p-6 text-left rounded-2xl border-2 transition-all group ";
                    
                    if (!showResult) {
                      if (isTempSelected) {
                        btnClass += "border-sylva bg-sylva/5 text-sylva-dark ring-4 ring-sylva/5 scale-[1.01]";
                      } else {
                        btnClass += "border-stone-100 bg-stone-50 hover:border-sylva/50 hover:bg-white";
                      }
                    } else {
                      if (isCorrect) {
                        btnClass += "border-sylva bg-sylva/10 text-sylva-dark ring-4 ring-sylva/5";
                      } else if (isSelected && !isCorrect) {
                        btnClass += "border-red-500 bg-red-50 text-red-900";
                      } else {
                        btnClass += "border-stone-50 bg-stone-50 opacity-40";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => currentQuestion.type === 'missing-data' ? handleOptionToggle(idx) : handleAnswer(idx)}
                        disabled={showResult}
                        className={btnClass}
                      >
                        <span className="font-bold text-base z-10 relative">{option}</span>
                        {showResult && isCorrect && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl z-10">✓</span>}
                      </button>
                    );
                  })}
                </div>

                {currentQuestion.type === 'missing-data' && !gameState.showExplanation && (
                  <button
                    onClick={submitStudyAnswer}
                    disabled={tempSelection.length === 0}
                    className="w-full mt-8 p-5 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl disabled:opacity-20 transition-all hover:bg-black"
                  >
                    Valider le diagnostic
                  </button>
                )}
              </div>
            </div>

            {gameState.showExplanation && (
              <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white p-8 rounded-[32px] border-t-8 border-sylva shadow-2xl">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0 text-xl font-black text-stone-400">
                      i
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-sylva uppercase tracking-[0.2em] text-[10px] mb-3">Référentiel SylvaStructure</h4>
                      <p className="text-stone-700 leading-relaxed font-bold text-lg mb-6">
                        {currentQuestion.explanation}
                      </p>
                      
                      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                        <div className="flex justify-between items-center mb-4">
                           <h5 className="text-[9px] font-black text-stone-400 uppercase tracking-[0.2em]">
                            Commentaire Expert Gemini
                          </h5>
                          {isGeneratingAdvice && <div className="w-2 h-2 bg-sylva rounded-full animate-ping"></div>}
                        </div>
                        {isGeneratingAdvice ? (
                          <div className="space-y-3">
                            <div className="h-3 bg-stone-200 rounded-full animate-pulse w-full"></div>
                            <div className="h-3 bg-stone-200 rounded-full animate-pulse w-2/3"></div>
                          </div>
                        ) : (
                          <p className="text-stone-600 text-sm italic leading-relaxed whitespace-pre-wrap">
                            {expertAdvice}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full p-6 bg-sylva text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-4"
                >
                  {gameState.currentQuestionIndex === filteredQuestions.length - 1 ? "Consulter mon score" : "Continuer"}
                  <span className="text-xl">→</span>
                </button>
              </div>
            )}
          </div>
        )}

        {view === 'quiz' && gameState.isFinished && (
          <div className="max-w-md mx-auto text-center space-y-10 animate-in zoom-in duration-700">
            <div className="bg-white p-12 rounded-[48px] shadow-2xl border border-stone-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-sylva" />
              <div className="mb-8 flex justify-center">
                 <Logo className="scale-125" />
              </div>
              <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tight mb-2">Module Validé</h2>
              <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px] mb-10">Certification de Compétences SylvaStructure</p>
              
              <div className="relative w-48 h-48 mx-auto mb-12">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-stone-50" strokeWidth="4" />
                  <circle 
                    cx="18" cy="18" r="16" fill="none" 
                    className="stroke-sylva transition-all duration-1000" 
                    strokeWidth="4"
                    strokeDasharray={`${(gameState.score / filteredQuestions.length) * 100}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
                  <span className="text-5xl font-black text-stone-900 leading-none">{Math.round((gameState.score / filteredQuestions.length) * 100)}%</span>
                  <span className="text-[10px] font-black text-sylva uppercase tracking-widest mt-1">Maîtrise</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setView('home')}
                  className="w-full p-5 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black transition-all"
                >
                  Tableau de Bord
                </button>
                <button
                  onClick={() => startQuiz(gameState.category)}
                  className="w-full p-5 bg-white border border-stone-200 text-stone-600 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-stone-50 transition-all"
                >
                  Repasser le module
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'library' && (
          <div className="space-y-10 animate-in fade-in duration-700">
             <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-4xl font-black text-stone-900 tracking-tighter uppercase">Spécifications Techniques</h2>
                <p className="text-stone-500 font-medium italic text-lg">Base de connaissances interne SylvaStructure.</p>
              </div>
              <button 
                onClick={() => setView('home')}
                className="px-6 py-3 bg-stone-900 text-white rounded-xl font-black uppercase tracking-[0.2em] hover:bg-black transition-all text-[10px]"
              >
                ← Retour
              </button>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARTS_LIBRARY.map((part, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-sylva/20 group-hover:bg-sylva transition-colors" />
                  <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-sylva text-xl mb-6 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-black text-stone-900 uppercase tracking-tight mb-2">{part.name}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed font-medium">
                    {part.role}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-stone-900 text-white p-12 rounded-[40px] mt-16 relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="text-sylva text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Manifeste d'Entreprise</span>
                <h3 className="text-3xl font-black mb-6 italic leading-tight tracking-tight">"La charpente est la colonne vertébrale d'un projet. Notre devoir est l'exactitude."</h3>
                <p className="text-stone-400 text-base leading-relaxed mb-8 font-medium">
                  SylvaStructure s'engage pour une charpente traditionnelle durable dans le Grand Est. Ce portail de formation assure que chaque chargé d'affaires parle le même langage technique que nos ateliers de fabrication.
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px bg-white/20 flex-1" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Direction Technique</span>
                </div>
              </div>
              {/* Abstract decorative element */}
              <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                <VisualDiagram />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white py-16 border-t border-stone-200 mt-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <Logo className="scale-75 origin-left" />
            <p className="text-stone-400 text-[9px] font-black uppercase tracking-[0.3em] max-w-xs">
              Solution de formation propriétaire développée pour les équipes SylvaStructure. Tous droits réservés 2024.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 text-left">
            <div>
              <h4 className="text-[10px] font-black text-stone-900 uppercase tracking-[0.2em] mb-4">Territoire</h4>
              <ul className="text-[10px] font-bold text-stone-400 uppercase tracking-widest space-y-2">
                <li>Alsace</li>
                <li>Lorraine</li>
                <li>Champagne</li>
                <li>Vosges</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-stone-900 uppercase tracking-[0.2em] mb-4">Expertise</h4>
              <ul className="text-[10px] font-bold text-stone-400 uppercase tracking-widest space-y-2">
                <li>Eurocodes 5</li>
                <li>Assemblages Tradi</li>
                <li>Logiciel Cadwork</li>
                <li>Structure Bois</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
