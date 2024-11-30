'use client';

import { useState, useRef } from 'react';
import { X, Calendar, MapPin, Phone, Mail, Globe, ImageIcon } from 'lucide-react';
import { countries } from '@/lib/countries';
import { EVENT_TYPES } from '@/lib/constants/eventTypes';
import { useEventForm } from '@/hooks/useEventForm';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/lib/storage';

interface EventFormProps {
  onClose: () => void;
}

export default function EventForm({ onClose }: EventFormProps) {
  const router = useRouter();
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [locationError, setLocationError] = useState<string | null>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const additionalImagesInputRef = useRef<HTMLInputElement>(null);

  const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleAdditionalImagesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + additionalImages.length <= 5) {
      setAdditionalImages(prev => [...prev, ...files]);
    }
  };

  const removeMainImage = () => {
    setMainImage(null);
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = '';
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleLocationChoice = (choice: 'current' | 'manual') => {
    if (choice === 'current') {
      setUseCurrentLocation(true);
      setShowManualLocation(false);

      if (!navigator.geolocation) {
        setLocationError("La géolocalisation n'est pas supportée par ce navigateur.");
        setUseCurrentLocation(false);
        setShowManualLocation(true);
        return;
      }

      setLocationError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`
            );

            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des informations de localisation');
            }

            const data = await response.json();
            const foundCountry = countries.find(c => c.code === data.countryCode);
            
            if (foundCountry) {
              setCountry(foundCountry.code);
            }

            setAddress(`${latitude}, ${longitude}`);
          } catch (error) {
            console.error('Erreur récupération pays:', error);
            setLocationError("Erreur lors de la récupération du pays. Veuillez saisir manuellement.");
            setUseCurrentLocation(false);
            setShowManualLocation(true);
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationError("Permission refusée pour accéder à la localisation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError("Position non disponible.");
              break;
            case error.TIMEOUT:
              setLocationError("Le délai pour obtenir la position a expiré.");
              break;
            default:
              setLocationError("Une erreur inconnue est survenue.");
          }
          setUseCurrentLocation(false);
          setShowManualLocation(true);
        }
      );
    } else {
      setUseCurrentLocation(false);
      setShowManualLocation(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = getUserData();
    if (!userData?.id || !userData.isVerified) {
      router.push('/auth/login');
      return;
    }

    // Validation
    if (!mainImage) {
      alert("Une image principale est requise");
      return;
    }

    if (!eventType || !eventName || !description || !startDate || !endDate || !country || !address) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // TODO: Implement form submission
    console.log({
      eventType,
      eventName,
      description,
      startDate,
      endDate,
      mainImage,
      additionalImages,
      country,
      address,
      phone,
      email,
      website,
      userId: userData.id
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center z-10">
          <h3 className="text-xl font-semibold">Créer un événement</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type d'événement */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Type d'événement *
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Sélectionner un type</option>
                {EVENT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Nom de l'événement */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Nom de l'événement *
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[150px]"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Date de début *
                </label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Date de fin *
                </label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Image principale */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Image principale *
              </label>
              <input
                type="file"
                ref={mainImageInputRef}
                onChange={handleMainImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => mainImageInputRef.current?.click()}
                className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <ImageIcon size={20} />
                <span>Ajouter une image</span>
              </button>
              {mainImage && (
                <div className="mt-2 relative w-full h-48">
                  <img
                    src={URL.createObjectURL(mainImage)}
                    alt="Image principale"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeMainImage}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Images additionnelles */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Images additionnelles ({additionalImages.length}/5)
              </label>
              <input
                type="file"
                ref={additionalImagesInputRef}
                onChange={handleAdditionalImagesSelect}
                accept="image/*"
                multiple
                className="hidden"
              />
              <button
                type="button"
                onClick={() => additionalImagesInputRef.current?.click()}
                className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <ImageIcon size={20} />
                <span>Ajouter des images</span>
              </button>
              {additionalImages.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {additionalImages.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
                      >
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Localisation */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                <MapPin size={18} className="inline-block mr-2" />
                Localisation *
              </label>
              
              {locationError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {locationError}
                </div>
              )}
              
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => handleLocationChoice('current')}
                  className={`flex-1 p-3 rounded-lg border transition-colors ${
                    useCurrentLocation
                      ? 'bg-gray-100 border-gray-300'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Position actuelle
                </button>
                <button
                  type="button"
                  onClick={() => handleLocationChoice('manual')}
                  className={`flex-1 p-3 rounded-lg border transition-colors ${
                    showManualLocation
                      ? 'bg-gray-100 border-gray-300'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Saisie manuelle
                </button>
              </div>

              {(showManualLocation || useCurrentLocation) && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Pays *</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionner un pays</option>
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Adresse *</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Contact de l'organisateur */}
            <div>
              <label className="block text-sm text-gray-700 mb-4">
                Contact de l'organisateur
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone size={20} className="text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Numéro de téléphone"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={20} className="text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresse email"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-gray-400" />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Site web"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 p-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                Créer l'événement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}