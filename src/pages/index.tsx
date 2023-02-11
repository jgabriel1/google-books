import { VStack } from '@chakra-ui/react';
import { BooksCarousel } from '../components/BooksCarousel';
import { PageWrapper } from '../components/PageWrapper';

const Home = () => {
  return (
    <PageWrapper>
      <VStack spacing="64px" align="stretch">
        <BooksCarousel title="Aventura" searchValue="subject:adventure" />

        <BooksCarousel title="Ação" searchValue="subject:action" />

        <BooksCarousel title="Infantil" searchValue="subject:cartoons" />
      </VStack>
    </PageWrapper>
  );
};

export default Home;
