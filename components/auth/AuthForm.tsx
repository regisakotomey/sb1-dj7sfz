'use client';

import { useState } from 'react';
import { Phone, Mail, Lock, LogIn, User, MapPin, Briefcase } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/lib/storage';
import 'react-phone-input-2/lib/style.css';

export const dynamic = "force-dynamic";

const BUSINESS_SECTORS = [
  'Agriculture',
  'Artisanat',
  'Commerce',
  'Construction',
  'Éducation',
  'Finance',
  'Immobilier',
  'Industrie',
  'Informatique',
  'Restauration',
  'Santé',
  'Services',
  'Transport',
  'Autre'
];

const COUNTRIES = [
  'France',
  'Belgique',
  'Suisse',
  'Canada',
  'Luxembourg',
  'Monaco',
  'Sénégal',
  'Côte d\'Ivoire',
  'Maroc',
  'Tunisie',
  'Algérie',
  'Madagascar',
  'Cameroun',
  'Congo',
  'Mali',
  'Burkina Faso'
];

export default function AuthForm() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [useEmail, setUseEmail] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    sector: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const loginValue = useEmail ? formData.email : formData.phone;
        await login({ login: loginValue, password: formData.password });
        router.push('/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas');
        }

        const userData = getUserData();
        const registerData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          country: formData.country,
          sector: formData.sector,
          email: useEmail ? formData.email : undefined,
          phone: !useEmail ? formData.phone : undefined,
          password: formData.password,
          anonymousId: userData?.id
        };

        await register(registerData);
        router.push('/auth/verify');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-100 p-1 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setUseEmail(true)}
              className={`p-2 rounded-md text-sm font-medium transition-colors ${
                useEmail 
                  ? 'bg-white shadow text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setUseEmail(false)}
              className={`p-2 rounded-md text-sm font-medium transition-colors ${
                !useEmail 
                  ? 'bg-white shadow text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Téléphone
            </button>
          </div>
        </div>

        {!isLogin && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Prénom"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Nom"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionnez votre pays</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionnez votre secteur d'activité</option>
                {BUSINESS_SECTORS.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {useEmail ? (
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Adresse email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        ) : (
          <div className="phone-input-container">
            <PhoneInput
              country={'fr'}
              value={formData.phone}
              onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
              containerClass="w-full"
              inputClass="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              buttonClass="border-0 bg-transparent"
              dropdownClass="shadow-lg"
            />
          </div>
        )}

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Mot de passe"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {!isLogin && (
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirmer le mot de passe"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        )}

        {isLogin && (
          <div className="text-right">
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Mot de passe oublié ?
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          <LogIn size={20} />
          {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'S\'inscrire')}
        </button>

        <div className="text-center text-sm">
          <span className="text-gray-600">
            {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
          </span>
          {' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-700"
          >
            {isLogin ? 'S\'inscrire' : 'Se connecter'}
          </button>
        </div>
      </form>
    </div>
  );
}