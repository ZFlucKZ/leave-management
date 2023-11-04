import { type ReactNode } from 'react';
import Link from 'next/link';
import Navbar from '../Navbar';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar>
        <Navbar.Navbrand></Navbar.Navbrand>
      </Navbar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
