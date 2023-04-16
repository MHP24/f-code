import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context/auth';
import '@/styles/app.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}
