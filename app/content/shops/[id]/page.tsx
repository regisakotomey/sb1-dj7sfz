import Header from '@/components/Header';
import ShopDetails from '@/components/shops/ShopDetails';
import MainLayout from '@/components/MainLayout';

// This is required for static site generation with dynamic routes
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
  ];
}

export default function ShopPage() {
  return (
    <MainLayout>
      <Header />
      <ShopDetails />
    </MainLayout>
  );
}