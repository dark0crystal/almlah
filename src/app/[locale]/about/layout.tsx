import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-[100vh] w-screen">
      {children}
    </div>
  );
};

export default Layout;
