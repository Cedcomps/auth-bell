'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Typage étendu pour inclure les informations de passkey
interface ExtendedUser {
  picture?: string | null;
  name?: string | null;
  email?: string | null;
  sub?: string | null;
  passkeyInfo?: {
    hasPasskey: boolean;
    canRevoke: boolean;
    canDelete: boolean;
  };
}

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const [deviceCredentials, setDeviceCredentials] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const userId = user.sub ?? ''; // Fournit une chaîne vide si user.sub est null ou undefined
      if (userId) {
        const fetchDeviceCredentials = async () => {
          try {
            const accessToken = await getAccessToken();
            const credentials = await getDeviceCredentials(accessToken, userId);
            setDeviceCredentials(credentials);
          } catch (err) {
            console.error('Failed to fetch device credentials:', err);
          }
        };

        fetchDeviceCredentials();
      }
    }
  }, [user]);
  
  if (!process.env.AUTH0_DOMAIN) {
    console.error('AUTH0_DOMAIN is not defined');
  }
  
  const getAccessToken = async (): Promise<string> => {
    if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_CLIENT_SECRET) {
      throw new Error('Auth0 environment variables are not properly configured');
    }
  
    const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials',
    });
  
    return response.data.access_token;
  };

  const getDeviceCredentials = async (accessToken: string, userId: string): Promise<any[]> => {
    const response = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/device-credentials`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        user_id: userId,
        type: 'public_key'
      }
    });
    return response.data;
  };

  const revokePasskey = async (credentialId: string) => {
    try {
      const accessToken = await getAccessToken();
      await axios.delete(`https://${process.env.AUTH0_DOMAIN}/api/v2/device-credentials/${credentialId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      alert('Passkey revoked successfully');
      setDeviceCredentials(deviceCredentials.filter(dc => dc.id !== credentialId));
    } catch (err) {
      console.error('Failed to revoke passkey:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // Cast l'utilisateur en type étendu
  const extendedUser = user as ExtendedUser;

  return (
    extendedUser && (
      <div style={{
        backgroundColor: '#f0f8ff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        margin: '0 auto'
      }}>
        <img
          src={extendedUser.picture ?? ''}
          alt={extendedUser.name ?? 'User'}
          style={{
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            marginBottom: '10px'
          }}
        />
        <h2 style={{ margin: '10px 0', color: '#333' }}>{extendedUser.name ?? 'No name available'}</h2>
        <p style={{ color: '#666' }}>{extendedUser.email ?? 'No email available'}</p>
        
        <pre style={{
          textAlign: 'left',
          backgroundColor: 'black',
          padding: '10px',
          borderRadius: '4px',
          overflowX: 'auto',
          color: '#fff'
        }}>
          {JSON.stringify(extendedUser, null, 2)}
        </pre>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#333' }}>Passkey Information</h3>
          {deviceCredentials && deviceCredentials.length > 0 ? (
            deviceCredentials.map((credential) => (
              <div key={credential.id}>
                <p>ID: {credential.id}</p>
                <p>Name: {credential.name}</p>
                <button onClick={() => revokePasskey(credential.id)}>Revoke</button>
              </div>
            ))
          ) : (
            <p>No passkey associated with this account.</p>
          )}
        </div>
      </div>
    )
  );
}