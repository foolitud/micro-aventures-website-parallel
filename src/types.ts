export interface Adventure {
  id: string;
  title: string;
  description: string;
  players: string;
  contact: string;
  contactLabel: string; // e.g., "Numéro", "Email"
  imageUrl: string;
  videoUrl?: string;
  isFeatured?: boolean;
}
