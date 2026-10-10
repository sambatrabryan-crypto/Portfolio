const translations = {
  fr: {
    // Navbar
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      experience: 'Expérience',
      cv: 'CV',
      contact: 'Contact',
    },

    // Hero
    hero: {
      label: 'Développeur Full-Stack',
      titleLine1: 'Je transforme des idées',
      titleLine2: 'en',
      words: [
        'applications.',
        'sites web.',
        'applications mobiles.',
        'API robustes.',
        'assistants IA.',
      ],
      description:
        "Je conçois et développe des applications web, mobiles et backend, avec un intérêt particulier pour l'intelligence artificielle.",
      skills: ['Web', 'Mobile', 'Backend', 'IA'],
    },

    // About
    about: {
      label: 'À propos',
      title: 'Construire, apprendre, évoluer.',
      p1: "Je suis un étudiant en informatique passionné par le développement logiciel et la création de solutions numériques concrètes.",
      p2: "Je m'intéresse particulièrement au développement web, mobile et backend, ainsi qu'aux technologies liées à l'intelligence artificielle.",
      p3: "À travers mes projets et mes expériences, je cherche à développer des applications utiles, apprendre de nouvelles technologies et améliorer continuellement ma façon de concevoir des solutions.",
      cards: [
        { title: 'Web', description: 'Applications modernes et interfaces utilisateur' },
        { title: 'Mobile', description: 'Applications mobiles avec Flutter' },
        { title: 'Backend', description: 'APIs, bases de données et architecture' },
        { title: 'IA', description: "Exploration des solutions basées sur l'IA" },
      ],
    },

    // Skills
    skills: {
      label: 'Compétences',
      title: "Technologies que j'utilise.",
      description:
        "Un ensemble de technologies que j'utilise dans mes projets et que je continue à approfondir.",
      groups: {
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobile',
        database: 'Bases de données',
        conception: 'Conception & Modélisation',
        devops: 'DevOps & Tools',
        observability: 'Observabilité',
        systems: 'Systèmes',
        ai: 'IA & Data',
      },
    },

    // Projects
    projects: {
      label: 'Projets',
      title: 'Ce que je construis.',
      description:
        "Quelques projets qui illustrent mon expérience en développement web, mobile, backend et algorithmique.",
      technologies: 'Technologies',
      zoom: 'Agrandir',
      close: 'Fermer',
      prev: 'Image précédente',
      next: 'Image suivante',
      goTo: "Aller à l'image",
      zoomIn: 'Agrandir',
      viewDemo: 'Voir la démo',
      sourceCode: 'Code source',
      comingSoon: 'Aperçu à venir',
      unavailable: 'Image indisponible',
    },

    // Experience
    experience: {
      label: 'Expérience',
      title: 'Mon parcours professionnel.',
    },

    // CV
    cv: {
      label: 'Curriculum Vitae',
      title: 'Mon CV',
      description:
        'Consultez mon parcours, mes compétences et mes expériences professionnelles.',
      download: 'Télécharger le PDF',
      zoom: 'Agrandir',
      close: 'Fermer',                    // 🆕
      error: "L'aperçu n'a pas pu être chargé.",
    },

    // Contact
    contact: {
      label: 'Contact',
      title: 'Échangeons ensemble.',
      description:
        "Vous avez une opportunité, un projet ou souhaitez simplement échanger ? Vous pouvez me contacter directement ou consulter mes profils professionnels.",
      coordinatesTitle: 'Mes coordonnées',
      coordinatesText:
        "Je suis ouvert aux opportunités professionnelles, aux collaborations et aux projets dans le domaine du développement informatique.",
      email: 'Email',
      phone: 'Téléphone',
      location: 'Localisation',
      copied: 'Copié',                    // 🆕
      form: {
        name: 'Nom',
        namePlaceholder: 'Votre nom',
        email: 'Email',
        emailPlaceholder: 'votre@email.com',
        message: 'Message',
        messagePlaceholder: 'Votre message...',
        submit: 'Envoyer le message',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès !',
        successText:
          'Merci pour votre message, je vous répondrai dans les plus brefs délais.',
        reset: 'Envoyer un autre message',
        error:
          "Une erreur est survenue lors de l'envoi. Réessayez dans quelques instants.",
      },
    },
  },

  en: {
    // Navbar
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      cv: 'Resume',
      contact: 'Contact',
    },

    // Hero
    hero: {
      label: 'Full-Stack Developer',
      titleLine1: 'I turn ideas',
      titleLine2: 'into',
      words: [
        'applications.',
        'websites.',
        'mobile apps.',
        'robust APIs.',
        'AI assistants.',
      ],
      description:
        'I design and build web, mobile, and backend applications, with a special interest in artificial intelligence.',
      skills: ['Web', 'Mobile', 'Backend', 'AI'],
    },

    // About
    about: {
      label: 'About',
      title: 'Build, learn, evolve.',
      p1: "I'm a computer science student passionate about software development and building concrete digital solutions.",
      p2: "I'm particularly interested in web, mobile, and backend development, as well as technologies related to artificial intelligence.",
      p3: 'Through my projects and experiences, I aim to build useful applications, learn new technologies, and continuously improve the way I design solutions.',
      cards: [
        { title: 'Web', description: 'Modern applications and user interfaces' },
        { title: 'Mobile', description: 'Mobile apps with Flutter' },
        { title: 'Backend', description: 'APIs, databases, and architecture' },
        { title: 'AI', description: 'Exploring AI-based solutions' },
      ],
    },

    // Skills
    skills: {
      label: 'Skills',
      title: 'Technologies I use.',
      description:
        'A set of technologies I use in my projects and continue to deepen.',
      groups: {
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobile',
        database: 'Databases',
        conception: 'Design & Modeling',
        devops: 'DevOps & Tools',
        observability: 'Observability',
        systems: 'Systems',
        ai: 'AI & Data',
      },
    },

    // Projects
    projects: {
      label: 'Projects',
      title: 'What I build.',
      description:
        'A few projects that showcase my experience in web, mobile, backend, and algorithmic development.',
      technologies: 'Technologies',
      zoom: 'Zoom in',
      close: 'Close',
      prev: 'Previous image',
      next: 'Next image',
      goTo: 'Go to image',
      zoomIn: 'Zoom in',
      viewDemo: 'View demo',
      sourceCode: 'Source code',
      comingSoon: 'Preview coming soon',
      unavailable: 'Image unavailable',
    },

    // Experience
    experience: {
      label: 'Experience',
      title: 'My professional journey.',
    },

    // CV
    cv: {
      label: 'Resume',
      title: 'My Resume',
      description: 'View my background, skills, and professional experience.',
      download: 'Download PDF',
      zoom: 'Zoom in',
      close: 'Close',                     // 🆕
      error: 'The preview could not be loaded.',
    },

    // Contact
    contact: {
      label: 'Contact',
      title: "Let's talk.",
      description:
        'Got an opportunity, a project, or just want to chat? You can reach me directly or check out my professional profiles.',
      coordinatesTitle: 'My details',
      coordinatesText:
        'I am open to professional opportunities, collaborations, and projects in software development.',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      copied: 'Copied',                   // 🆕
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'Your message...',
        submit: 'Send message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        successText: "Thank you for your message, I'll get back to you shortly.",
        reset: 'Send another message',
        error:
          'An error occurred while sending. Please try again in a moment.',
      },
    },
  },
}

export default translations