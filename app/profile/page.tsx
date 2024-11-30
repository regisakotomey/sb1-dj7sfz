import Header from '@/components/Header';
import MainLayout from '@/components/MainLayout';
import UserProfile from '@/components/profile/UserProfile';

export default function ProfilePage() {
  return (
    <MainLayout>
      <Header />
      <UserProfile />
    </MainLayout>
  );
}