import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import MainColumn from '@/components/MainColumn';
import CreatePost from '@/components/CreatePost';
import MainLayout from '@/components/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <Header />
      <Sidebar />
      <MainColumn>
        <CreatePost />
      </MainColumn>
      <RightSidebar />
    </MainLayout>
  );
}