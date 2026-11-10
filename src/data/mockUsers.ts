import { User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'user-teller-01',
    name: 'Nguyễn Văn An',
    email: 'teller.govap@sacombank.com',
    role: 'TELLER',
    title: 'Giao dịch viên Quầy 03',
    department: 'Phòng Dịch vụ Khách hàng',
    branch: 'Sacombank – Chi nhánh Gò Vấp',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-manager-01',
    name: 'Trần Thị Thu Trang',
    email: 'manager.govap@sacombank.com',
    role: 'MANAGER',
    title: 'Trưởng phòng Dịch vụ Khách hàng',
    department: 'Phòng Dịch vụ Khách hàng',
    branch: 'Sacombank – Chi nhánh Gò Vấp',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-admin-01',
    name: 'Đào Minh Hải',
    email: 'admin.govap@sacombank.com',
    role: 'ADMIN',
    title: 'Quản trị viên Hệ thống & Tri thức',
    department: 'Khối Công nghệ & Vận hành',
    branch: 'Sacombank – Trụ sở Khu vực TP.HCM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
];
