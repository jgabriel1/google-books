import { Container, Flex, Text, Box } from '@chakra-ui/react';
import { BooksCarousel } from '../components/BooksCarousel';

const Home = () => (
  <Flex direction="column" gap="64px" align="stretch" py="60px">
    <BooksCarousel title="Aventura" searchValue="subject:adventure" />

    <BooksCarousel title="Ação" searchValue="subject:action" />

    <Box w="full" bg="#DAF6F3" paddingTop="64px" paddingBottom="88px">
      <BooksCarousel
        title={
          <Text
            color="#A977D8"
            fontWeight={600}
            fontSize={{ sm: '16px', md: '22px', lg: '28px' }}
          >
            Destaques
          </Text>
        }
        searchValue="featured"
      />
    </Box>

    <BooksCarousel title="Infantil" searchValue="subject:cartoons" />
  </Flex>
);

export default Home;
