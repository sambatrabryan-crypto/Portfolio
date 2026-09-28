const projects = [
  {
    title: 'Gestion des visiteurs',
    category: 'Web & Mobile · Projet de stage',
    description:
      "Système complet de gestion des visiteurs développé chez Europ'Alu Antananarivo. Application web et mobile permettant l'enregistrement, le suivi et l'analyse des visites et rendez-vous.",
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Firebase',
      'Flutter',
      'Dart',
      'ELK Stack',
    ],
    images: [
      { src: '/Visiteurs/Tableaux%20de%20bord.png', alt: 'Tableau de bord principal' },
      { src: '/Visiteurs/Ciblage.png', alt: 'Ciblage des départements' },
      { src: '/Visiteurs/Connexion.png', alt: 'Connexion web' },
      { src: '/Visiteurs/Connexion-mob.png', alt: 'Connexion et inscription mobile' },
      { src: '/Visiteurs/ELK.png', alt: 'Statistiques ELK' },
      { src: '/Visiteurs/Notifications.png', alt: 'Notifications mobile' },
      { src: '/Visiteurs/Rapport.png', alt: 'Rapport des visiteurs' },
    ],
  },
  {
    title: 'Gestion des visites médicales',
    category: 'Backend · Projet personnel',
    description:
      "Application de gestion des visites dans un centre médical. Hibernate pour la persistance, PostgreSQL comme base de données, architecture MVC.",
    technologies: ['Java', 'Hibernate', 'PostgreSQL'],
    images: [
      { src: '/M%C3%A9decin/Acceuil.png', alt: 'Accueil' },
      { src: '/M%C3%A9decin/M%C3%A9decin.png', alt: 'Gestion des médecins' },
      { src: '/M%C3%A9decin/Patient.png', alt: 'Gestion des patients' },
      { src: '/M%C3%A9decin/Visite.png', alt: 'Gestion des visites' },
    ],
  },
  {
    title: 'Algorithme de Ford-Bellman',
    category: 'Algorithme · Projet personnel',
    description:
      "Implémentation de l'algorithme de Ford-Bellman pour le calcul du plus court chemin dans un graphe pondéré.",
    technologies: ['TypeScript', 'JavaScript'],
    images: [
      { src: '/Bell-Man/RO-Max.png', alt: 'Plus court chemin maximal' },
      { src: '/Bell-Man/RO-Min.png', alt: 'Plus court chemin minimal' },
      { src: '/Bell-Man/RO-Cal.png', alt: 'Calcul' },
    ],
  },
]

export default projects