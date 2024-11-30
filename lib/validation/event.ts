import { isBefore, isAfter } from 'date-fns';

interface EventData {
  title: string;
  type: string;
  description: string;
  startDate: Date;
  endDate: Date;
  country: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  images?: string[];
}

export function isValidEvent(data: EventData): string | null {
  if (!data.title || data.title.length < 3) {
    return 'Le titre doit contenir au moins 3 caractères';
  }

  if (!data.type) {
    return 'Le type d\'événement est requis';
  }

  if (!data.description || data.description.length < 10) {
    return 'La description doit contenir au moins 10 caractères';
  }

  if (!data.startDate || !data.endDate) {
    return 'Les dates sont requises';
  }

  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const now = new Date();

  if (isBefore(start, now)) {
    return 'La date de début doit être future';
  }

  if (isBefore(end, start)) {
    return 'La date de fin doit être après la date de début';
  }

  if (!data.country) {
    return 'Le pays est requis';
  }

  if (!data.address) {
    return 'L\'adresse est requise';
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Email invalide';
  }

  if (data.website && !/^https?:\/\//.test(data.website)) {
    return 'URL du site web invalide';
  }

  return null;
}