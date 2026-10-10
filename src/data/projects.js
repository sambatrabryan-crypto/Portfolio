const projects = {
  fr: [
    {
      slug: 'gestion-visiteurs',
      title: 'Gestion des visiteurs',
      category: 'Web & Mobile · Projet de stage',
      description:
        "Système complet de gestion des visiteurs développé chez Europ'Alu Antananarivo. Application web et mobile permettant l'enregistrement, le suivi et l'analyse des visites et rendez-vous.",
      technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Firebase', 'Flutter', 'Dart', 'ELK Stack'],
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
      slug: 'gestion-stocks',
      title: 'Gestion des stocks',
      category: 'Web · Projet de stage',
      description:
        "Application web de gestion des stocks créée pour le Ministère de l'Enseignement Supérieur et de la Recherche Scientifique.",
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS'],
      images: [
        { src: '/Stock/Accueil.png', alt: "Page d'accueil" },
        { src: '/Stock/Inventaire.png', alt: "Gestion de l'inventaire" },
        { src: '/Stock/Fournisseur.png', alt: 'Gestion des fournisseurs' },
        { src: '/Stock/Personnel.png', alt: 'Gestion du personnel' },
        { src: '/Stock/PDF.png', alt: 'Génération de rapports PDF' },
      ],
    },
    {
      slug: 'visites-medicales',
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
      slug: 'ford-bellman',
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
  ],

  en: [
    {
      slug: 'visitor-management',
      title: 'Visitor Management',
      category: 'Web & Mobile · Internship project',
      description:
        "Complete visitor management system developed at Europ'Alu Antananarivo. Web and mobile application for registering, tracking, and analyzing visits and appointments.",
      technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Firebase', 'Flutter', 'Dart', 'ELK Stack'],
      images: [
        { src: '/Visiteurs/Tableaux%20de%20bord.png', alt: 'Main dashboard' },
        { src: '/Visiteurs/Ciblage.png', alt: 'Department targeting' },
        { src: '/Visiteurs/Connexion.png', alt: 'Web login' },
        { src: '/Visiteurs/Connexion-mob.png', alt: 'Mobile login and signup' },
        { src: '/Visiteurs/ELK.png', alt: 'ELK statistics' },
        { src: '/Visiteurs/Notifications.png', alt: 'Mobile notifications' },
        { src: '/Visiteurs/Rapport.png', alt: 'Visitor report' },
      ],
    },
    {
      slug: 'stock-management',
      title: 'Stock Management',
      category: 'Web · Internship project',
      description:
        'Web application for stock management built for the Ministry of Higher Education and Scientific Research.',
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS'],
      images: [
        { src: '/Stock/Acceuil.png', alt: 'Home page' },
        { src: '/Stock/Inventaire.png', alt: 'Inventory management' },
        { src: '/Stock/Fournisseur.png', alt: 'Supplier management' },
        { src: '/Stock/Personnel.png', alt: 'Staff management' },
        { src: '/Stock/PDF.png', alt: 'PDF report generation' },
      ],
    },
    {
      slug: 'medical-visits',
      title: 'Medical Visits Management',
      category: 'Backend · Personal project',
      description:
        'Application for managing visits in a medical center. Hibernate for persistence, PostgreSQL as database, MVC architecture.',
      technologies: ['Java', 'Hibernate', 'PostgreSQL'],
      images: [
        { src: '/M%C3%A9decin/Acceuil.png', alt: 'Home' },
        { src: '/M%C3%A9decin/M%C3%A9decin.png', alt: 'Doctor management' },
        { src: '/M%C3%A9decin/Patient.png', alt: 'Patient management' },
        { src: '/M%C3%A9decin/Visite.png', alt: 'Visit management' },
      ],
    },
    {
      slug: 'ford-bellman',
      title: 'Ford-Bellman Algorithm',
      category: 'Algorithm · Personal project',
      description:
        "Implementation of the Ford-Bellman algorithm for finding the shortest path in a weighted graph.",
      technologies: ['TypeScript', 'JavaScript'],
      images: [
        { src: '/Bell-Man/RO-Max.png', alt: 'Longest shortest path' },
        { src: '/Bell-Man/RO-Min.png', alt: 'Shortest path minimal' },
        { src: '/Bell-Man/RO-Cal.png', alt: 'Calculation' },
      ],
    },
  ],
}

export default projects