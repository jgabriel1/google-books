import { ChakraProvider, extendTheme, Theme } from '@chakra-ui/react';
import { Inter } from '@next/font/google';
import { Provider } from 'react-redux';
import { Layout } from '../components/common/Layout';
import { store } from '../store';

const inter = Inter({ subsets: ['latin'] });

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
} as Theme);

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <main className={inter.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </ChakraProvider>
    </Provider>
  );
}
