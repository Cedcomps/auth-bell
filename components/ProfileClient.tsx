'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

// Typage des propriétés de l'utilisateur
interface User {
  picture?: string | null;
  name?: string | null;
  email?: string | null;
}

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div style={{
        backgroundColor: '#f0f8ff', // Couleur pastel claire
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <img
          src={user.picture ?? ''}
          alt={user.name ?? 'User'}
          style={{
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            marginBottom: '10px'
          }}
        />
        <h2 style={{ margin: '10px 0', color: '#333' }}>{user.name ?? 'No name available'}</h2>
        <p style={{ color: '#666' }}>{user.email ?? 'No email available'}</p>
      </div>
    )
  );
}