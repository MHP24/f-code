import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context/auth';
import type { AppProps } from 'next/app';
import { ChallengeProvider } from '@/context';
import '@/styles/app.css';
import 'animate.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <ChallengeProvider>
          <Component {...pageProps} />
        </ChallengeProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
