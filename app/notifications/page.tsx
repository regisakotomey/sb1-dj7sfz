import Header from '@/components/Header';
import MainLayout from '@/components/MainLayout';
import NotificationsList from '@/components/notifications/NotificationsList';

export default function NotificationsPage() {
  return (
    <MainLayout>
      <Header />
      <NotificationsList />
    </MainLayout>
  );
}