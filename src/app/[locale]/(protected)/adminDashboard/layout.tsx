import React, { ReactNode } from 'react';
import AdminSideBar from './AdminSideBar';
import type { Metadata } from 'next';
import { authOptions } from '../../../../lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '../../../../lib/prisma';

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard to manage the users rights',
};

const AdminDashboardLayout = async ({ children }: AdminDashboardLayoutProps) => {
  const session = await getServerSession(authOptions);

  // Redirect if there is no session
  if (!session) {
    redirect('/api/auth/signin');
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || '',
      },
    });

    // Redirect if the user doesn't exist or isn't an admin
    if (!user || user.role !== 'ADMIN') {
      redirect('/');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    redirect('/');
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default AdminDashboardLayout;
