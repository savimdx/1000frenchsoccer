import { BenefitItem, BonusItem, DrillItem, TestimonialItem, FAQItem } from './types';
import bono1Img from './assets/images/bono_1.webp';
import bono2Img from './assets/images/bono_2.webp';
import bono3Img from './assets/images/bono_3.webp';
import bono4Img from './assets/images/bono_4.webp';
import bono5Img from './assets/images/bono_5.webp';
import bono6Img from './assets/images/bono_6.webp';
import bono7Img from './assets/images/bono_7.webp';
import bono8Img from './assets/images/bono_8.webp';
import ejerciciosAdicionalesImg from './assets/images/ejercicios_adicionales_futsal_1783515557260.webp';

export const HERO_BULLETS = [
  "Plus de 1000 séances prêtes à l'emploi",
  "Adaptable à toutes les catégories et tous les niveaux",
  "Accès immédiat et téléchargement à vie",
  "Format 100 % numérique accessible partout"
];

export const RECEIVE_CARDS = [
  {
    id: "rec-1",
    tag: "LA BIBLIOTHÈQUE PRINCIPALE",
    title: "Plus de 1000 Séances Prêtes à l'Emploi",
    description: "Structurées pas à pas : de l'échauffement dynamique au corps de séance avec situations évolutives, jusqu'au retour au calme.",
    accent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
  },
  {
    id: "rec-2",
    tag: "APPROCHE COMPLÈTE",
    title: "Exercices Techniques, Tactiques et Physiques",
    description: "Développez la technique individuelle, l'intelligence tactique collective, la vitesse de prise de décision et la condition physique optimale.",
    accent: "bg-amber-500/10 text-amber-400 border-amber-500/30"
  },
  {
    id: "rec-3",
    tag: "ORGANISATION PARFAITE",
    title: "Séances Classées par Objectifs Précis",
    description: "Trouvez instantanément l'atelier idéal : conservation, pressing haut, transitions rapides, bloc défensif ou finition clinique devant le but.",
    accent: "bg-blue-500/10 text-blue-400 border-blue-500/30"
  },
  {
    id: "rec-4",
    tag: "TOUTES LES CATÉGORIES",
    title: "Adaptable des Débutants aux Seniors",
    description: "Parfaitement adapté pour l'école de football, la préformation et les équipes seniors de compétition.",
    accent: "bg-purple-500/10 text-purple-400 border-purple-500/30"
  },
  {
    id: "rec-5",
    tag: "PROGRESSION CONTINUE",
    title: "Différents Niveaux d'Intensité",
    description: "Des variantes et critères d'évolution clairs pour ajuster la difficulté selon le niveau réel de votre effectif.",
    accent: "bg-rose-500/10 text-rose-400 border-rose-500/30"
  },
  {
    id: "rec-6",
    tag: "ACCÈS ILLIMITÉ",
    title: "Accès Immédiat et Disponibilité à Vie",
    description: "Recevez l'accès complet directement par e-mail dans les secondes suivant votre commande. Sans abonnement ni frais récurrents.",
    accent: "bg-gold-500/10 text-amber-400 border-amber-500/30"
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: "ben-1",
    title: "Gagnez des heures de planification chaque semaine",
    description: "Planifiez une semaine complète d'entraînement en moins de 10 minutes. Ne perdez plus votre temps à chercher des bribes d'exercices sur les réseaux sociaux."
  },
  {
    id: "ben-2",
    title: "Ne soyez plus jamais à court d'idées sur le terrain",
    description: "Accédez à un répertoire inépuisable de situations dynamiques et stimulantes. Vos joueurs ne vivront plus jamais une séance monotone."
  },
  {
    id: "ben-3",
    title: "Développez le rendement individuel et collectif de vos joueurs",
    description: "Une méthodologie éprouvée pour accélérer la maîtrise technique, la vitesse d'analyse mentale et l'intensité en match."
  },
  {
    id: "ben-4",
    title: "Structurez vos entraînements comme un coach professionnel",
    description: "Une architecture méthodique claire : mise en train progressive, situations d'apprentissage évolutives, jeu dirigé et retour au calme."
  },
  {
    id: "ben-5",
    title: "Adaptez facilement chaque atelier à votre effectif",
    description: "Que vous soyez un éducateur débutant ou un entraîneur chevronné, modulez les consignes, les espaces et l'intensité en toute simplicité."
  },
  {
    id: "ben-6",
    title: "Augmentez la motivation de vos joueurs dès la 1ère séance",
    description: "La clarté et le rythme des exercices font toute la différence. Vos joueurs remarqueront immédiatement la qualité et le professionnalisme de vos séances."
  }
];

export const BONUSES: BonusItem[] = [
  {
    id: "bon-1",
    number: 1,
    title: "Mindset Neymar Júnior",
    description: "Plongez dans la psychologie de la créativité, l'audace dans le un-contre-un et la gestion de la pression au plus haut niveau mondial.",
    originalPrice: 29,
    tag: "CRÉATIVITÉ & AUDACE",
    image: "/images/bono_neymar.webp",
    fallbackImage: "https://i.ibb.co/v6DJKhfY/Chat-GPT-Image-16-de-set-de-2026-11-21-06.png"
  },
  {
    id: "bon-2",
    number: 2,
    title: "Mindset José Mourinho",
    description: "Les clés du leadership tactique, de la solidité défensive, de la résilience psychologique et de la culture de la gagne intransigeante.",
    originalPrice: 29,
    tag: "LEADERSHIP & RIGUEUR",
    image: "/images/bono_mourinho.webp",
    fallbackImage: "https://i.ibb.co/2YmgvqtJ/Chat-GPT-Image-16-de-set-de-2026-11-25-03.png"
  },
  {
    id: "bon-3",
    number: 3,
    title: "Mindset Pep Guardiola",
    description: "La philosophie du jeu de position, l'obsession de la maîtrise spatiale, le pressing à la perte et la préparation minutieuse des matchs.",
    originalPrice: 29,
    tag: "JEU DE POSITION & TACTIQUE",
    image: "/images/bono_guardiola.webp",
    fallbackImage: "https://i.ibb.co/0j0YJWxQ/Chat-GPT-Image-16-de-set-de-2026-11-27-10.png"
  },
  {
    id: "bon-4",
    number: 4,
    title: "Mindset Zinédine Zidane",
    description: "L'art du management des grands talents, le calme dans les moments décisifs et l'intelligence situationnelle sur et en dehors du terrain.",
    originalPrice: 29,
    tag: "CALME & MANAGEMENT D'ÉLITE",
    image: "/images/bono_zidane.webp",
    fallbackImage: "/images/bono_zidane.webp"
  },
  {
    id: "bon-5",
    number: 5,
    title: "250 Fiches d'Entraînement Football",
    description: "Une collection gigantesque de fiches illustrées prêtes à l'emploi : circuits techniques, jeux réduits, transitions et schémas d'entraînement complets.",
    originalPrice: 39,
    tag: "FICHES DE TERRAIN CLÉS EN MAIN",
    image: "/images/bono_250_fiches.webp",
    fallbackImage: "https://i.ibb.co/V0dLxf1v/Chat-GPT-Image-16-de-set-de-2026-12-01-12.png"
  },
  {
    id: "bon-6",
    number: 6,
    title: "50 Exercices Physiques (avec ballon) en Football",
    description: "Développez la puissance aérobie, l'endurance spécifique et la vivacité motrice sans jamais déconnecter le travail physique de la technique du ballon.",
    originalPrice: 27,
    tag: "PHYSIQUE INTÉGRÉ AVEC BALLON",
    image: "/images/bono_50_physique.webp",
    fallbackImage: "https://i.ibb.co/Q39bxFFY/Chat-GPT-Image-16-de-set-de-2026-12-04-33.png"
  },
  {
    id: "bon-7",
    number: 7,
    title: "100 Exercices Pour Développer la Vitesse en Football",
    description: "Protocoles d'accélération, vivacité d'appuis, vitesse de réaction cognitive et courses de démarquage adaptées à chaque poste sur le terrain.",
    originalPrice: 29,
    tag: "VITESSE & EXPLOSIVITÉ",
    image: "/images/bono_100_vitesse.webp",
    fallbackImage: "https://i.ibb.co/1CFcs7n/Chat-GPT-Image-16-de-set-de-2026-12-19-36.png"
  },
  {
    id: "bon-8",
    number: 8,
    title: "Exercices de Préparation Physique pour les Gardiens de But",
    description: "Programme ciblé pour le gardien moderne : explosivité verticale, mobilité articulaire, agilité au sol, réflexes visuels et coordination spécifique.",
    originalPrice: 35,
    tag: "SPÉCIAL GARDIENS DE BUT",
    image: "/images/bono_gardiens.webp",
    fallbackImage: "https://i.ibb.co/dwBK2vhR/Chat-GPT-Image-16-de-set-de-2026-14-56-23.png"
  },
  {
    id: "bon-9",
    number: 9,
    title: "La Méthode Petit Matériel : 60 Exercices Intégrés pour le Football",
    description: "Optimisez vos séances avec des plots, coupelles, élastiques et échelles de rythme pour un conditionnement physique complet et stimulant.",
    originalPrice: 25,
    tag: "ÉQUIPEMENT LÉGER & CIRCUIT",
    image: "/images/bono_petit_materiel.webp",
    fallbackImage: "https://i.ibb.co/NdVk4vH3/Chat-GPT-Image-16-de-set-de-2026-14-59-32.png"
  },
  {
    id: "bon-10",
    number: 10,
    title: "+600 Vidéos d'Entraînements de Football",
    description: "Accédez à une vidéothèque complète de plus de 600 exercices filmés et expliqués : ateliers techniques, circuits tactiques, duels et situations de match réelles pour dynamiser vos séances.",
    originalPrice: 47,
    tag: "BANQUE VIDÉO COMPLÈTE (+600 SÉANCES)",
    image: "/images/bono_videos_football.webp",
    fallbackImage: "/images/bono_videos_football.webp"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Thomas M.",
    role: "Éducateur Jeunes - U15",
    quote: "Avant, je perdais un temps fou à préparer mes séances et je finissais par répéter les mêmes circuits de plots. Maintenant, j'ai des séances prêtes pour toute la saison. Excellent contenu, la méthode est ultra pratique.",
    rating: 5,
    achievement: "✓ 90 % de temps gagné en préparation",
    avatarSeed: "carlos",
    avatarUrl: "/images/testimonial_1.webp"
  },
  {
    id: "test-2",
    name: "Alexandre R.",
    role: "Responsable Technique Jeunes (RTJ)",
    quote: "Je supervise une structure de plus de 120 jeunes et ce pack nous a énormément aidés à harmoniser et diversifier les entraînements de toutes les catégories. Les éducateurs sont motivés et les progrès en match sont flagrants.",
    rating: 5,
    achievement: "✓ Harmonisation méthodologique du club",
    avatarSeed: "andres",
    avatarUrl: "/images/testimonial_2.webp"
  },
  {
    id: "test-3",
    name: "Julien David",
    role: "Professeur d'EPS & Entraîneur",
    quote: "Le contenu est incroyablement complet et très visuel. On ne s'encombre pas de théorie interminable : on va directement sur le terrain en sachant exactement quoi faire. Dès la première séance, mes joueurs ont adoré.",
    rating: 5,
    achievement: "✓ Application pratique immédiate sur le terrain",
    avatarSeed: "jose",
    avatarUrl: "/images/testimonial_3.webp"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Comment vais-je recevoir le matériel ?",
    answer: "Vous recevrez votre accès par e-mail immédiatement après la confirmation de votre commande. Un lien sécurisé vous permet d'accéder à l'ensemble des fichiers interactifs, prêts à être consultés sur votre smartphone, tablette, ordinateur ou imprimés selon vos besoins."
  },
  {
    id: "faq-2",
    question: "Ce matériel convient-il à toutes les catégories d'âge ?",
    answer: "Oui. Les séances et exercices sont modulaires et catégorisés avec précision, ce qui vous permet de les adapter aisément de l'école de football (U6-U11) jusqu'aux catégories de compétition (U13-U19) et aux équipes seniors."
  },
  {
    id: "faq-3",
    question: "Faut-il une grande expérience pour appliquer cette méthode ?",
    answer: "Absolument pas. Chaque exercice est détaillé pas à pas avec des schémas vectoriels clairs indiquant le positionnement des plots, des buts, des ballons et les déplacements des joueurs, rendant la compréhension immédiate même pour un coach débutant."
  },
  {
    id: "faq-4",
    question: "Combien de temps ai-je accès à la bibliothèque ?",
    answer: "L'accès est accordé à vie. Une fois le matériel téléchargé, il vous appartient définitivement. De plus, vous bénéficierez gratuitement de toutes les futures mises à jour du pack sans aucun coût supplémentaire."
  },
  {
    id: "faq-5",
    question: "Les 10 bonus offerts sont-ils réellement inclus ?",
    answer: "Oui, les 10 bonus présentés sont inclus à 100 % gratuitement dans l'offre promotionnelle d'aujourd'hui. Ils sont automatiquement ajoutés à votre espace de téléchargement lors de votre commande."
  }
];

export const CREATOR_INFO = {
  name: "Lucian Sánchez",
  role: "Spécialiste en Méthodologie Tactique & Entraîneur de Football",
  experience: "+30 Ans d'Expérience",
  photoUrl: "/images/author.webp",
  bio: [
    "Bonjour, je suis Lucian Sánchez. Fort de plus de 30 ans d'expérience technique et formatrice sur les terrains de football, j'ai réuni et synthétisé toute ma méthode dans cette Bibliothèque de +1000 Séances et Manuels Méthodologiques.",
    "Mon objectif est de vous apporter un outil concret et directement applicable sur le terrain pour vous faire gagner des heures de travail et élever le niveau de jeu de vos équipes dès votre prochain entraînement."
  ],
  credentials: [
    "+30 Ans d'Expérience sur le Terrain",
    "+1000 Séances et Exercices Conçus",
    "+10 000 Entraîneurs Formés",
    "Méthodologie 100 % Pratique et Éprouvée"
  ]
};

export const DRILLS: DrillItem[] = [
  {
    id: "drill-1",
    category: "Entraînement Technique",
    title: "Circuit de Conduite, Feintes et Changements de Direction",
    description: "Exercice dynamique de maîtrise du ballon, feintes corporelles rapides face à des obstacles passifs (plots) et accélération après pivot.",
    objective: "Améliorer l'agilité avec le ballon, la conduite intérieur/extérieur du pied et la vitesse de réaction.",
    organization: "Espace de 15x15 mètres. 4 plots alignés à 1,5 mètre d'intervalle et 2 mini-buts de sortie.",
    development: [
      "Le joueur démarre au plot de départ en conduisant le ballon à vive allure.",
      "Il réalise des feintes (slalom court) en touchant le ballon des deux pieds entre les plots centraux.",
      "Arrivé au dernier plot, il effectue un demi-tour rapide à 180° et enchaîne par une accélération de 5 mètres pour marquer dans les mini-buts."
    ],
    variations: [
      "Variante 1 : Conduite obligatoire exclusivement du pied faible.",
      "Variante 2 : Ajouter un défenseur semi-actif après les plots pour presser la sortie."
    ],
    players: [
      { x: 50, y: 220, team: 'blue', label: "Départ" },
      { x: 120, y: 130, team: 'cone' },
      { x: 180, y: 130, team: 'cone' },
      { x: 240, y: 130, team: 'cone' },
      { x: 300, y: 130, team: 'cone' },
      { x: 200, y: 215, team: 'ball' },
      { x: 350, y: 80, team: 'red', label: "But" },
      { x: 350, y: 180, team: 'red', label: "But" }
    ],
    lines: [
      { x1: 55, y1: 210, x2: 110, y2: 135, type: 'dribble' },
      { x1: 120, y1: 130, x2: 180, y2: 130, type: 'dribble' },
      { x1: 180, y1: 130, x2: 240, y2: 130, type: 'dribble' },
      { x1: 240, y1: 130, x2: 300, y2: 130, type: 'dribble' },
      { x1: 300, y1: 130, x2: 350, y2: 90, type: 'run' }
    ]
  },
  {
    id: "drill-2",
    category: "Exercices de Passe",
    title: "Triangle de Passes avec Appui et Sortie en Troisième Homme",
    description: "Circuit fluide axé sur la passe au sol claquée, le contrôle orienté et l'appel en rupture créant le décalage.",
    objective: "Optimiser la passe en première intention, le timing des déplacements et la recherche du troisième homme dans le dos.",
    organization: "Triangle équilatéral de 12 mètres de côté délimité par des plots. Groupes de 5 à 6 joueurs avec 1 ballon.",
    development: [
      "Le joueur A transmet fermement au joueur B qui décroche vers l'intérieur.",
      "B remet en une touche (de face) pour le joueur C qui arrive en soutien de course.",
      "C glisse une passe en profondeur pour A, parti dans le dos du plot repère.",
      "Rotation des postes : A prend la place de B, B prend celle de C, et C rejoint le point A."
    ],
    variations: [
      "Variante 1 : Jeu à une touche de balle obligatoire pour tous.",
      "Variante 2 : Inverser le sens de circulation pour solliciter le pied gauche."
    ],
    players: [
      { x: 80, y: 200, team: 'blue', label: "A" },
      { x: 320, y: 200, team: 'blue', label: "B" },
      { x: 200, y: 60, team: 'blue', label: "C" },
      { x: 100, y: 195, team: 'ball' },
      { x: 200, y: 140, team: 'cone', label: "Défenseur Fixe" }
    ],
    lines: [
      { x1: 95, y1: 200, x2: 310, y2: 200, type: 'pass' },
      { x1: 320, y1: 190, x2: 210, y2: 70, type: 'pass' },
      { x1: 200, y1: 70, x2: 100, y2: 180, type: 'pass' }
    ]
  },
  {
    id: "drill-3",
    category: "Finitions & Tirs",
    title: "Une-Deux sur l'Aile et Finition dans la Zone de Vérité",
    description: "Séquence de jeu combiné rapide sur les côtés avec projection offensive et finition clinique face au gardien.",
    objective: "Travailler la précision du centre en première intention, le timing de projection offensive et le geste de frappe ou tête.",
    organization: "Demi-terrain réglementaire avec grand but et gardien. Plots sur le couloir droit pour l'ailier.",
    development: [
      "Le milieu central alerte l'ailier lancé sur son côté droit.",
      "L'ailier combine en appui rapide (une-deux) avec l'attaquant qui décroche hors de la surface.",
      "L'ailier déborde jusqu'à la ligne de corner et adresse un centre tendu entre le point de penalty et les 6 mètres.",
      "L'avant-centre plonge dans l'espace libre pour couper la trajectoire et conclure en une touche face au gardien."
    ],
    variations: [
      "Variante 1 : Le centre doit être rasant pour une frappe directe au sol.",
      "Variante 2 : Ajouter un défenseur central actif pour disputer le duel aérien."
    ],
    players: [
      { x: 200, y: 230, team: 'blue', label: "Milieu" },
      { x: 340, y: 160, team: 'blue', label: "Ailier" },
      { x: 200, y: 120, team: 'blue', label: "Buteur" },
      { x: 200, y: 30, team: 'red', label: "Gardien" },
      { x: 195, y: 215, team: 'ball' },
      { x: 180, y: 70, team: 'cone', label: "Défenseur" }
    ],
    lines: [
      { x1: 210, y1: 220, x2: 330, y2: 165, type: 'pass' },
      { x1: 335, y1: 155, x2: 215, y2: 125, type: 'pass' },
      { x1: 215, y1: 120, x2: 200, y2: 45, type: 'run' }
    ]
  },
  {
    id: "drill-4",
    category: "Préparation Physique",
    title: "Circuit de Coordination, Vivacité et Vitesse de Sprint",
    description: "Atelier physique intégré à haute intensité axé sur l'accélération fractionnée, les changements d'appuis et l'explosivité motrice.",
    objective: "Développer la puissance anaérobie alactique, la vitesse de gestuelle et la coordination motrice.",
    organization: "Zone de 20x10 mètres. Une échelle d'agilité, 4 mini-haies de 30 cm de hauteur et 3 plots en slalom.",
    development: [
      "Le joueur franchit l'échelle d'agilité à vitesse maximale avec appuis très rapides (deux appuis par case).",
      "Il enchaîne instantanément des bonds pieds joints par-dessus les 4 mini-haies.",
      "Il réalise un slalom explosif aller-retour entre les 3 plots disposés en diagonale.",
      "Il termine par un sprint à 100% sur 10 mètres jusqu'à la ligne d'arrivée."
    ],
    variations: [
      "Variante 1 : Franchissement de l'échelle d'agilité en pas chassés latéraux.",
      "Variante 2 : Placer un ballon en fin de slalom pour enchaîner avec une frappe ciblée."
    ],
    players: [
      { x: 60, y: 220, team: 'blue', label: "Départ" },
      { x: 120, y: 220, team: 'cone', label: "Haie 1" },
      { x: 160, y: 220, team: 'cone', label: "Haie 2" },
      { x: 200, y: 220, team: 'cone', label: "Haie 3" },
      { x: 250, y: 150, team: 'cone', label: "Slalom" },
      { x: 290, y: 100, team: 'cone', label: "Slalom" },
      { x: 350, y: 50, team: 'blue', label: "Arrivée" }
    ],
    lines: [
      { x1: 70, y1: 220, x2: 110, y2: 220, type: 'run' },
      { x1: 200, y1: 220, x2: 240, y2: 160, type: 'run' },
      { x1: 290, y1: 100, x2: 345, y2: 55, type: 'run' }
    ]
  },
  {
    id: "drill-5",
    category: "Exercices Tactiques",
    title: "Attaque Rapide 3 contre 2 avec Repli Défensif",
    description: "Situation de contre-attaque en supériorité numérique où les attaquants doivent conclure avant le retour du 3ème défenseur.",
    objective: "Développer la prise de décision rapide en transition offensive, le décalage et la gestion de l'infériorité en bloc.",
    organization: "Espace de 40x30 mètres avec deux grands buts. 3 attaquants (bleus) contre 2 défenseurs initiaux (rouges).",
    development: [
      "Le porteur de balle bleu s'engage en conduite rapide pendant que ses deux ailiers écartent le jeu.",
      "Les 2 défenseurs rouges reculent en cadrant l'axe central pour freiner la progression.",
      "Dans le même temps, un 3ème défenseur rouge situé au milieu effectue un repli défensif à vitesse maximale.",
      "Les bleus doivent enchaîner les passes rapides pour trouver la faille et tirer avant que le repli ne rétablisse l'égalité 3 contre 3."
    ],
    variations: [
      "Variante 1 : Limiter à 3 touches de balle par joueur maximum.",
      "Variante 2 : Si les rouges récupèrent le ballon, ils peuvent contre-attaquer immédiatement sur le but opposé."
    ],
    players: [
      { x: 100, y: 130, team: 'blue', label: "A1" },
      { x: 80, y: 60, team: 'blue', label: "A2" },
      { x: 80, y: 200, team: 'blue', label: "A3" },
      { x: 260, y: 100, team: 'red', label: "D1" },
      { x: 260, y: 160, team: 'red', label: "D2" },
      { x: 350, y: 130, team: 'red', label: "Gardien" },
      { x: 180, y: 50, team: 'red', label: "D3 (Repli)" },
      { x: 115, y: 130, team: 'ball' }
    ],
    lines: [
      { x1: 110, y1: 130, x2: 240, y2: 110, type: 'pass' },
      { x1: 80, y1: 60, x2: 200, y2: 80, type: 'run' },
      { x1: 80, y1: 200, x2: 230, y2: 170, type: 'run' }
    ]
  }
];
