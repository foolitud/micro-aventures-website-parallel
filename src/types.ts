export interface Adventure {
  id: string;
  title: string;
  description: string;
  players: string;
  playerMode: 'Solo' | 'Duo';
  rating: number;
  contact: string;
  contactLabel: string; // e.g., "Numéro", "Email"
  imageUrl: string;
  videoUrl?: string;
  isFeatured?: boolean;
}
