// components/Navbar.tsx

import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import BellLogo from '@/components/BellLogo';
import AuthButton from './AuthButton';
import { createClient } from '@/utils/supabase/server';
import { buttonVariants } from './ui/button';

const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  
const Navbar: React.FC = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white shadow-md">
      <div className="w-full max-w-6xl flex justify-between items-center p-3 text-sm">
        <div className="flex items-center space-x-4">
        <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:text-base"
            >
              <BellLogo/>
              <span className="sr-only">Bell</span>
            </Link>          <span className="font-bold">Mobility</span>
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
          {isSupabaseConnected && <AuthButton />}
            {!isSupabaseConnected && (
              <><Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link><Link
              href="/signup"
              className={buttonVariants({})}
            >
                Signup
              </Link></>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
