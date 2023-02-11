import { ChakraProvider } from '@chakra-ui/react';
import { Inter } from '@next/font/google';
import { Provider } from 'react-redux';
import { Layout } from '../components/Layout';
import { store } from '../store';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <main className={inter.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </ChakraProvider>
    </Provider>
  );
}
