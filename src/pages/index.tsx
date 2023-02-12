import { Flex, Text, Box } from '@chakra-ui/react';
import { BooksCarousel } from '../components/pages/index/BooksCarousel';

const Home = () => (
  <Flex
    direction="column"
    gap={['24px', '64px']}
    align="stretch"
    py={['24px', '60px']}
  >
    <BooksCarousel
      title={
        <Text fontWeight={600} fontSize="16px" mb={['24px', '40px']}>
          Aventura
        </Text>
      }
      searchValue="subject:adventure"
    />

    <BooksCarousel
      title={
        <Text fontWeight={600} fontSize="16px" mb={['24px', '40px']}>
          Ação
        </Text>
      }
      searchValue="subject:action"
    />

    <Box
      w="full"
      bg="#DAF6F3"
      paddingTop={['24px', '64px']}
      paddingBottom={['36px', '88px']}
    >
      <BooksCarousel
        title={
          <Text
            color="#A977D8"
            fontWeight={600}
            fontSize={['16px', '22px', '28px']}
            mb={['24px', '40px']}
          >
            Destaques
          </Text>
        }
        searchValue="featured"
      />
    </Box>

    <BooksCarousel
      title={
        <Text fontWeight={600} fontSize="16px" mb={['24px', '40px']}>
          Infantil
        </Text>
      }
      searchValue="subject:cartoons"
    />
  </Flex>
);

export default Home;
