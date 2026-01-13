
import { Question, QuizCategory } from './types';

export const QUESTIONS: Question[] = [
  {
    id: '1',
    category: QuizCategory.TERMINOLOGY,
    type: 'multiple-choice',
    question: "Comment appelle-t-on l'encoche pratiquée dans le chevron pour qu'il repose parfaitement sur la panne ?",
    options: ["Le cran de pose (ou embrèvement)", "La mortaise", "La gueule de loup", "Le tenon"],
    correctAnswer: 0,
    explanation: "Le cran de pose ou l'entaille de chevron est indispensable pour assurer une bonne assise sur la panne et éviter le glissement.",
    imageUrl: "https://images.unsplash.com/photo-1517420876127-d2518e21127a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '2',
    category: QuizCategory.TECHNICAL,
    type: 'multiple-choice',
    question: "Dans le Grand Est (secteur Vosges), quelle charge climatique est la plus critique ?",
    options: ["Le vent marin", "La charge de neige (Zone C2/D)", "La dilatation thermique", "L'humidité relative"],
    correctAnswer: 1,
    explanation: "Dans le massif des Vosges, la charge de neige est majeure. Les Eurocodes imposent des calculs stricts selon l'altitude.",
    imageUrl: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '3',
    category: QuizCategory.STUDY_CASE,
    type: 'missing-data',
    dataContext: "Client : 'Je veux une mezzanine en bois de 20m² pour mon salon à Nancy. J'ai prévu des solives en 75x225.'",
    question: "Quelles données MANQUENT pour valider le calcul de la structure ?",
    options: ["Le type de revêtement de sol", "Le poids propre des cloisons futures", "La couleur du vernis", "L'essence du bois (C24 ou autre)"],
    correctAnswer: [0, 1, 3],
    explanation: "Pour une étude de solivage, il faut impérativement connaître les charges permanentes (revetement, cloisons, isolant) et la classe de résistance du bois utilisé.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '4',
    category: QuizCategory.TECHNICAL,
    type: 'multiple-choice',
    question: "Quel est l'entraxe standard maximal conseillé pour des chevrons de section 60x80mm ?",
    options: ["45 cm", "60 cm", "90 cm", "120 cm"],
    correctAnswer: 1,
    explanation: "L'entraxe standard est généralement de 60cm pour permettre une pose d'isolant standard et assurer une bonne rigidité à la couverture.",
    imageUrl: "https://images.unsplash.com/photo-1582231243722-e3d168128328?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '5',
    category: QuizCategory.STUDY_CASE,
    type: 'missing-data',
    dataContext: "Projet : Remplacement de charpente pour une maison à Thionville avec passage de tuiles béton à des tuiles terre cuite lourdes.",
    question: "Quelle information est cruciale pour l'étude de charge ici ?",
    options: ["Le poids au m² de la nouvelle tuile", "La pente précise du toit", "L'exposition au vent", "Le nom du couvreur"],
    correctAnswer: [0, 1, 2],
    explanation: "Le changement de poids de couverture impose une vérification de la section des pannes. La pente influe directement sur la décomposition des forces.",
    imageUrl: "https://images.unsplash.com/photo-1635424710928-0544e8512efe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '6',
    category: QuizCategory.TERMINOLOGY,
    type: 'multiple-choice',
    question: "Sur une ferme, comment s'appelle la pièce horizontale qui 'serre' le poinçon ?",
    options: ["Le faux-entrait", "Le moisé", "La contrefiche", "Le blochet"],
    correctAnswer: 1,
    explanation: "Une pièce moisée est composée de deux éléments qui prennent en sandwich une autre pièce (souvent le poinçon ou l'arbalétrier).",
    imageUrl: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '7',
    category: QuizCategory.CLIENT_ADVICE,
    type: 'multiple-choice',
    question: "En rénovation dans le Grand Est, pourquoi préconiser un pare-vapeur côté intérieur ?",
    options: ["Pour la décoration", "Pour empêcher l'humidité de la maison de condenser dans l'isolant", "Pour renforcer la charpente", "Pour bloquer les insectes"],
    correctAnswer: 1,
    explanation: "Dans nos régions froides, le choc thermique provoque de la condensation. Sans pare-vapeur, l'isolant et le bois pourrissent avec le temps.",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '8',
    category: QuizCategory.TECHNICAL,
    type: 'multiple-choice',
    question: "Quelle est la densité moyenne du Chêne sec (utilisé en charpente traditionnelle) ?",
    options: ["450 kg/m³", "750 kg/m³", "1100 kg/m³", "300 kg/m³"],
    correctAnswer: 1,
    explanation: "Le chêne est un bois lourd et dense (environ 700 à 800 kg/m³), ce qui influence le 'poids propre' de la charpente dans les calculs.",
    imageUrl: "https://images.unsplash.com/photo-1589133458074-60037f5f9e96?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '9',
    category: QuizCategory.TERMINOLOGY,
    type: 'multiple-choice',
    question: "Quelle pièce de bois assure la liaison entre le pied de l'arbalétrier et l'entrait ?",
    options: ["L'embrèvement", "Le tenon-mortaise", "La bride métallique", "Le lierne"],
    correctAnswer: 0,
    explanation: "L'embrèvement est un assemblage traditionnel où une pièce vient 'mordre' dans l'autre pour transmettre les efforts de compression.",
    imageUrl: "https://images.unsplash.com/photo-1610631882987-3045639212c7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '10',
    category: QuizCategory.TECHNICAL,
    type: 'multiple-choice',
    question: "Quelle est la 'flèche' maximale admissible (L/...) pour une panne de charpente selon l'Eurocode 5 ?",
    options: ["L/100", "L/200", "L/300", "L/500"],
    correctAnswer: 2,
    explanation: "La norme courante pour le confort et la rigidité en charpente est une flèche maximale de L/300 (la portée divisée par 300).",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '11',
    category: QuizCategory.STUDY_CASE,
    type: 'missing-data',
    dataContext: "Installation de panneaux photovoltaïques sur une toiture existante à Colmar.",
    question: "Quelles données le commercial doit-il relever en priorité ?",
    options: ["Le poids réel des panneaux au m²", "Le type de fixation (surimposition ou intégration)", "L'état de vétusté de la charpente actuelle", "La consommation électrique du client"],
    correctAnswer: [0, 1, 2],
    explanation: "L'ajout de panneaux PV est une surcharge permanente. Il faut valider que la structure existante peut supporter ce poids supplémentaire sans fléchir.",
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '12',
    category: QuizCategory.CLIENT_ADVICE,
    type: 'multiple-choice',
    question: "Un client veut des combles aménageables mais a une charpente en fermettes. Que lui dire ?",
    options: [
      "C'est impossible, il faut tout raser",
      "Il faut prévoir une transformation de charpente avec renforcement",
      "Il peut poser son plancher directement",
      "Les fermettes supportent tout sans problème"
    ],
    correctAnswer: 1,
    explanation: "Les fermettes industrielles ne sont pas conçues pour porter un plancher habitable. Une transformation structurelle est nécessaire.",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '13',
    category: QuizCategory.TERMINOLOGY,
    type: 'multiple-choice',
    question: "Qu'est-ce qu'une 'panne sablière' ?",
    options: ["Une panne posée sur le sable", "La panne située au point le plus haut", "La panne posée sur le mur en bas de pente", "Une panne servant à stocker le bois"],
    correctAnswer: 2,
    explanation: "La panne sablière est la base de la toiture, elle repose sur le mur extérieur et reçoit les pieds de chevrons.",
    imageUrl: "https://images.unsplash.com/photo-1621111848501-8d3024412281?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '14',
    category: QuizCategory.TECHNICAL,
    type: 'multiple-choice',
    question: "Quel est l'avantage principal du Douglas par rapport au Sapin/Épicéa ?",
    options: ["Il est moins cher", "Il est plus léger", "Il est naturellement de classe 3 (coeur de bois)", "Il ne brûle pas"],
    correctAnswer: 2,
    explanation: "Le Douglas (son duramen) est naturellement résistant aux attaques biologiques sans traitement chimique excessif, idéal pour l'extérieur.",
    imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '15',
    category: QuizCategory.STUDY_CASE,
    type: 'missing-data',
    dataContext: "Demande de devis pour un abri voiture (Carport) à Mulhouse.",
    question: "Quelles données techniques sont obligatoires pour l'étude ?",
    options: ["La dimension entre poteaux (portée)", "Le type de toiture (tuile, bac acier, polycarbonate)", "La hauteur de passage souhaitée", "La couleur de la voiture"],
    correctAnswer: [0, 1, 2],
    explanation: "La portée et le type de couverture dictent la section des bois. La hauteur influe sur la prise au vent et la stabilité.",
    imageUrl: "https://images.unsplash.com/photo-1590059345133-776c5b967156?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '16',
    category: QuizCategory.TERMINOLOGY,
    type: 'multiple-choice',
    question: "Comment appelle-t-on les petites pièces de bois fixées sur les pannes pour empêcher les chevrons de glisser ?",
    options: ["Les chantignoles", "Les blochets", "Les tasseaux", "Les liteaux"],
    correctAnswer: 0,
    explanation: "La chantignole est une cale en bois fixée sur la panne pour caler le chevron perpendiculairement.",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '17',
    category: QuizCategory.CLIENT_ADVICE,
    type: 'multiple-choice',
    question: "Pourquoi SylvaStructure évite le bois 'vert' (humide) pour ses chantiers ?",
    options: ["Parce qu'il est trop lourd", "Parce qu'il risque de se fendre et vriller en séchant", "Parce qu'il sent mauvais", "Parce que c'est interdit"],
    correctAnswer: 1,
    explanation: "Un bois sec garantit une stabilité structurelle. Le bois humide travaille énormément et peut compromettre les assemblages.",
    imageUrl: "https://images.unsplash.com/photo-1518005020250-68a0d0d7595a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '18',
    category: QuizCategory.TECHNICAL,
    type: 'multiple-choice',
    question: "Dans quelle zone de neige se situe la ville de Strasbourg ?",
    options: ["Zone A1", "Zone B1", "Zone C1", "Zone E"],
    correctAnswer: 2,
    explanation: "Strasbourg est en zone C1. Attention, si vous montez vers les Vosges, on passe vite en zone D avec des charges bien plus élevées.",
    imageUrl: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '19',
    category: QuizCategory.STUDY_CASE,
    type: 'missing-data',
    dataContext: "Projet de surélévation en ossature bois à Metz.",
    question: "Données de charge manquantes pour la structure basse ?",
    options: ["Poids du plafond existant", "Poids de l'isolant prévu", "Surcharge d'exploitation (150kg/m²)", "L'âge du capitaine"],
    correctAnswer: [0, 1, 2],
    explanation: "Une surélévation demande de vérifier si le plancher bas peut supporter le poids propre de la nouvelle structure + les charges de vie.",
    imageUrl: "https://images.unsplash.com/photo-1621111848501-8d3024412281?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '20',
    category: QuizCategory.TERMINOLOGY,
    type: 'multiple-choice',
    question: "Qu'est-ce qu'un 'moisé' dans l'assemblage ?",
    options: ["Une pièce de bois pourrie", "Deux pièces prenant en sandwich une troisième", "Un bois noirci par l'humidité", "Un assemblage par collage"],
    correctAnswer: 1,
    explanation: "Le moisage permet de renforcer un assemblage en doublant la section de bois de part et d'autre de la pièce centrale.",
    imageUrl: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800"
  }
];

export const PARTS_LIBRARY = [
  { name: "Cran de pose", role: "Entaille dans le chevron pour son assise sur la panne." },
  { name: "Arbalétrier", role: "Pièce oblique supportant les pannes." },
  { name: "Entrait", role: "Base horizontale de la ferme, travaille en traction." },
  { name: "Poinçon", role: "Pièce centrale verticale de la ferme." },
  { name: "Panne Sablière", role: "Panne posée sur le mur qui reçoit le pied des chevrons." },
  { name: "Chevron", role: "Pièce de bois répartissant la charge de couverture." },
  { name: "Contrefiche", role: "Pièce oblique soulageant l'arbalétrier." },
  { name: "Lierne", role: "Pièce horizontale reliant les poinçons entre eux." },
  { name: "Chantignole", role: "Cale en bois empêchant le glissement du chevron sur la panne." },
  { name: "Moisé", role: "Double pièce de bois prenant en sandwich un poteau ou arbalétrier." }
];
