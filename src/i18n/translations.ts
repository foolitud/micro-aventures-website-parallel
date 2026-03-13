export const translations = {
  fr: {
    dna: {
      experience: "Expérience Grandeur Nature",
      noApp: "Native No-App (WhatsApp/SMS)",
      consequences: "Conséquences Réelles",
    },
    modal: {
      ready: "Prêt à jouer ?",
      signup: "Inscrivez-vous pour lancer",
      phone: "Numéro de téléphone",
      email: "Email",
      launch: "LANCER L'AVENTURE",
      success: "C'est parti !",
      verify: "Vérifiez vos messages. L'aventure vous attend sur",
      gotIt: "C'est compris",
    },
    concept: {
      title: "Découvrez les micro-aventures Parallel",
      description: "Un avant-goût pour vous initier au concept avant de plonger dans nos aventures de plusieurs jours.",
      details: "Pas de boîtes de jeux, pas de CD, vous jouez via vos outils de communication habituels, en parallèle de votre vie.",
    },
    ui: {
      adventure: "AVENTURE",
      scroll: "SCROLL",
      players: "joueurs",
      player: "joueur",
      to: "à",
      solo: "Solo",
      duo: "Duo",
    },
    adventures: {
      "5": {
        title: "Le Pari Torride",
        description: "Prouvez votre connexion pour débloquer votre soirée.",
      },
      "1": {
        title: "Le Protocole Fantôme",
        description: "Une intelligence artificielle semble avoir pris le contrôle d'un serveur critique. Vous avez 45 minutes pour la désactiver avant qu'elle ne s'échappe sur le réseau mondial.",
      },
      "2": {
        title: "L'Appel de Minuit",
        description: "Un message vocal énigmatique vous donne rendez-vous dans une ruelle sombre via Google Maps. Résolvez l'énigme spatiale.",
      },
      "3": {
        title: "Héritage Cryptique",
        description: "Un lointain oncle vous a légué un portefeuille crypto, mais le mot de passe est dispersé sur 3 sites web différents.",
      },
      "4": {
        title: "Alerte Enlèvement",
        description: "Vous recevez la photo d'une pièce fermée à clé. Utilisez les détails de l'image pour identifier le lieu et prévenir les secours.",
      },
    }
  },
  en: {
    dna: {
      experience: "Real-Life Experience",
      noApp: "No-App Native (WhatsApp/SMS)",
      consequences: "Real Consequences",
    },
    modal: {
      ready: "Ready to play?",
      signup: "Sign up to launch",
      phone: "Phone Number",
      email: "Email",
      launch: "LAUNCH ADVENTURE",
      success: "Let's go!",
      verify: "Check your messages. The adventure is waiting for you on",
      gotIt: "Got it",
    },
    concept: {
      title: "Discover Parallel Micro-Adventures",
      description: "A taste to introduce you to the concept before diving into our multi-day adventures.",
      details: "No game boxes, no CDs, you play through your usual communication tools, in parallel with your life.",
    },
    ui: {
      adventure: "ADVENTURE",
      scroll: "SCROLL",
      players: "players",
      player: "player",
      to: "to",
      solo: "Solo",
      duo: "Duo",
    },
    adventures: {
      "5": {
        title: "The Steamy Bet",
        description: "Prove your connection to unlock your evening.",
      },
      "1": {
        title: "The Ghost Protocol",
        description: "An artificial intelligence seems to have taken control of a critical server. You have 45 minutes to deactivate it before it escapes onto the global network.",
      },
      "2": {
        title: "The Midnight Call",
        description: "An enigmatic voice message gives you a meeting in a dark alley via Google Maps. Solve the spatial puzzle.",
      },
      "3": {
        title: "Cryptic Legacy",
        description: "A distant uncle has left you a crypto wallet, but the password is scattered across 3 different websites.",
      },
      "4": {
        title: "Kidnapping Alert",
        description: "You receive a photo of a locked room. Use the details in the image to identify the location and alert help.",
      },
    }
  }
};

export type Language = 'fr' | 'en';
export type TranslationKey = keyof typeof translations.fr;
