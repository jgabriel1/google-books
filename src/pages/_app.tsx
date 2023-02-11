import { ChakraProvider, extendTheme, extendBaseTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { Inter } from '@next/font/google';
import { Provider } from 'react-redux';
import { Layout } from '../components/Layout';
import { store } from '../store';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider
        theme={extendBaseTheme({
          breakpoints: createBreakpoints({
            xl: '1900px',
            lg: '1680px',
            md: '744px',
            sm: '320px',
          }),
        })}
      >
        <main className={inter.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </ChakraProvider>
    </Provider>
  );
}
