'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/lib/storage';

interface EventFormData {
  title: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  country: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  images?: File[];
}

export function useEventForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = () => {
    const userData = getUserData();
    if (!userData?.id || !userData.isVerified) {
      router.push('/auth/login');
      return false;
    }
    return userData.isVerified;
  };

  const submitEvent = async (formData: EventFormData) => {
    if (!checkAuth()) {
      router.push('/auth/login');
      return;
    }

    const userData = getUserData();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implémenter le téléchargement des images
      const eventData = {
        ...formData,
        userId: userData!.id,
        images: [] // À implémenter avec le système de téléchargement d'images
      };

      const response = await fetch('/api/events/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      router.push(`/events/${data._id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkAuth,
    submitEvent,
    isLoading,
    error
  };
}