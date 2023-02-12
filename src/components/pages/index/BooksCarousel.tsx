import {
  Box,
  Container,
  HStack,
  IconButton,
  Image,
  useBreakpoint,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { booksApi } from '../../../store/booksApi';

const { useGetBooksQuery } = booksApi;

type BooksCarouselProps = {
  title: ReactNode;
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

  const isSmallestScreenSize = useBreakpointValue([true, false]);

  return (
    <Container maxW="1120px" px={['22px', '76px']}>
      {title}

      <Box position="relative">
        {!isSmallestScreenSize && (
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
        )}

        <HStack
          ref={carouselRef}
          overflowX="auto"
          spacing={['16px', '32px']}
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
                  w={['60px', '120px', '200px']}
                  h={['90px', '180px', '300px']}
                  borderRadius="5px"
                  src={book.volumeInfo.imageLinks.thumbnail}
                />
              )
          )}
        </HStack>

        {!isSmallestScreenSize && (
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
        )}
      </Box>
    </Container>
  );
};
