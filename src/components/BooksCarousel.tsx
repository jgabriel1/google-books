import { Box, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { booksApi } from '../store/booksApi';

const { useGetBooksQuery } = booksApi;

type BooksCarouselProps = {
  title: string;
  searchValue: string;
};

export const BooksCarousel = ({ title, searchValue }: BooksCarouselProps) => {
  const currentPage = useSelector(
    (state: State) => state.booksPagination.cachedPages[searchValue] || 0
  );

  const books = useGetBooksQuery(
    { query: searchValue, page: currentPage },
    {
      skip: !searchValue,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <Box>
      <Text fontWeight={600} fontSize="16px" mb="40px">
        {title}
      </Text>

      <Box position="relative">
        <IconButton
          aria-label="scroll-left"
          position="absolute"
          bottom="50%"
          left="-20px"
          onClick={() => {
            carouselRef.current.scroll({
              behavior: 'smooth',
              left: carouselRef.current.scrollLeft - 300,
            });
          }}
          rounded="full"
          icon={<Image src="arrow.svg" transform={'rotate(180deg)'} />}
        />

        <HStack
          ref={carouselRef}
          overflowX="auto"
          spacing="32px"
          scrollSnapType="x mandatory"
          sx={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {books.data?.map(
            (book) =>
              book.volumeInfo?.imageLinks?.thumbnail && (
                <Image
                  objectFit="cover"
                  w="200px"
                  h="300px"
                  borderRadius="10px"
                  src={book.volumeInfo.imageLinks.thumbnail}
                />
              )
          )}
        </HStack>

        <IconButton
          aria-label="scroll-right"
          position="absolute"
          bottom="50%"
          right="-20px"
          onClick={() => {
            carouselRef.current.scroll({
              behavior: 'smooth',
              left: carouselRef.current.scrollLeft + 300,
            });
          }}
          rounded="full"
          icon={<Image src="arrow.svg" />}
        />
      </Box>
    </Box>
  );
};