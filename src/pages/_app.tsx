import '@/styles/app.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  console.log({ Component, pageProps });
  return <Component {...pageProps} />
}
