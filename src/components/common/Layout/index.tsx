import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <Flex direction="column" minH="100vh">
    <Header />
    <Box flex="1">{children}</Box>
    <Footer />
  </Flex>
);
