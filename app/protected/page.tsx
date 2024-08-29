// pages/profile.js
'use client';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import ProfileClient from '@/components/ProfileClient';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
    <Nav/>
    <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
      <main className="flex-1 flex flex-col gap-6">
        <h2 className="font-bold text-4xl mb-4">Profile protected</h2>
        <p>User Info</p>
        <ProfileClient/>
      </main>
    </div>
  <Footer/>
       </div>
  );
}