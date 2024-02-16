import AdminNav from './AdminNav';

export const metadata = {
  title: 'Admin - Kesä Perhonen',
  description: 'Kesä Perhonen Administrator Dashboard',
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
