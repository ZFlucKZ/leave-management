import { type ReactNode } from 'react';

interface LayoutPros {
  children: ReactNode;
}

const Layout = ({ children }: LayoutPros) => {
  return <div>{children}</div>;
};

export default Layout;
