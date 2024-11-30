import Header from '@/components/Header';
import MainLayout from '@/components/MainLayout';
import MessagingInterface from '@/components/messaging/MessagingInterface';

export default function MessagesPage() {
  return (
    <MainLayout>
      <Header />
      <MessagingInterface />
    </MainLayout>
  );
}