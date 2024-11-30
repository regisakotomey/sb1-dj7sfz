import './globals.css';
import type { Metadata } from 'next';
import { WelcomeProvider } from '@/components/providers/WelcomeProvider';
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: `${theme.name} - Votre réseau social commercial`,
  description: `Découvrez ${theme.name}, votre réseau social commercial.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>
        <WelcomeProvider>
          {children}
        </WelcomeProvider>
      </body>
    </html>
  );
}