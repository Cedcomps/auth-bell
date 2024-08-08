'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import BellLogo from '@/components/BellLogo';
import { useUser } from '@auth0/nextjs-auth0/client'; // Import du hook useUser

const Navbar: React.FC = () => {
  const { user, error, isLoading } = useUser(); // Utilisation du hook pour obtenir l'état de l'utilisateur

  useEffect(() => {
    if (isLoading) {
      console.log('Loading user information...');
    } else if (error) {
      console.log('Error fetching user information:', error);
    } else if (user) {
      console.log('User information:', user); // Affichage des informations de l'utilisateur
    } else {
      console.log('No user is logged in.');
    }
  }, [user, error, isLoading]); // Utilisation de useEffect pour surveiller les changements d'état

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white shadow-md">
      <div className="w-full max-w-6xl flex justify-between items-center p-3 text-sm">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:text-base"
          >
            <BellLogo />
            <span className="sr-only">Bell</span>
          </Link>
          <span className="font-bold">Mobility</span>
          <div className="hidden md:flex space-x-4">
            <Link href="/internet" className="hover:underline">Internet</Link>
            <Link href="/tv" className="hover:underline">TV</Link>
            <Link href="/smart-home" className="hover:underline">Smart Home</Link>
            <Link href="/home-phone" className="hover:underline">Home phone</Link>
            <Link href="/bundles" className="hover:underline">Bundles</Link>
            <Link href="/promotions" className="hover:underline">Promotions</Link>
            <Link href="/support" className="hover:underline">Support</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 cursor-pointer" />
          <ShoppingCart className="w-6 h-6 cursor-pointer" />
          {isLoading ? (
            <span>Loading...</span>
          ) : user ? (
            <a href="/api/auth/logout">Logout</a> // Affichage du lien de déconnexion si l'utilisateur est connecté
          ) : (
            <a href="/api/auth/login">Login</a> // Affichage du lien de connexion si l'utilisateur n'est pas connecté
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;