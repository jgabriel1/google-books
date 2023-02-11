import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

type PageWrapperProps = {
  children?: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => (
  <Container maxW="1120px" p="60px">
    {children}
  </Container>
);
