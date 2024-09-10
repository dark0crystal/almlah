'use client';
import { useEffect, ComponentType } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Zagah<T extends object>(Component: ComponentType<T>) {
  return function WithAuth(props: T) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/api/auth/signin'); // Redirect to home if not authenticated
      }
    }, [status, router]);

    if (status === 'loading') {
      return <div>Loading...</div>; // Optional loading state
    }

    if (status === 'unauthenticated') {
      return null; // Prevent rendering the component if not authenticated
    }

    return <Component {...props} />;
  };
}
