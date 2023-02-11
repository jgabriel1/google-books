import {
  Grid,
  Box,
  Text,
  Flex,
  VStack,
  Button,
  Center,
  Spinner,
  Image,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { BookCard } from '../components/BookCard';
import { FilterField } from '../components/FilterField';
import { PageWrapper } from '../components/PageWrapper';
import { State, store } from '../store';
import { booksApi } from '../store/booksApi';
import { increasePagination, initPagination } from '../store/booksPagination';
import {
  clearFilters,
  setAvailabilityFilter,
  setFormatFilter,
  setPriceFilter,
} from '../store/filters';
import {
  ORDERED_AVAILABILITY_FILTERS,
  ORDERED_FORMAT_FILTERS,
  ORDERED_PRICE_FILTERS,
  applyFilters,
} from '../helpers/filters';

const { useGetBooksQuery } = booksApi;

const Search = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: State) => state.filters);

  const router = useRouter();
  const searchValue = useMemo(() => router.query.search as string, [router]);
  const currentPage = useSelector(
    (state: State) => state.booksPagination.cachedPages[searchValue] || 0
  );

  useEffect(() => {
    if (searchValue) {
      dispatch(initPagination(searchValue));
    }
  }, [searchValue]);

  const books = useGetBooksQuery(
    { query: searchValue, page: currentPage },
    {
      skip: !searchValue,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const hasAnyFiltersOn = useMemo(
    () => Object.values(filters).some(Boolean),
    [filters]
  );

  const filteredBooks = useMemo(
    () => applyFilters(books.data, filters),
    [books.data, filters]
  );

  const { ref: bottomInViewRef } = useInView({
    onChange: (inView) => inView && dispatch(increasePagination(searchValue)),
  });

  return (
    <PageWrapper>
      <Grid gridTemplateColumns="1fr 4fr" gap="96px">
        <Box minW="200px">
          <Text fontWeight={600} fontSize="18px" mb="24px">
            Filtrar
          </Text>

          {hasAnyFiltersOn && (
            <Button
              mb="24px"
              variant="unstyled"
              fontWeight={600}
              fontSize="16px"
              color="#F1F7FC"
              background="#ADB7BF"
              w="full"
              h="auto"
              py="12px"
              onClick={() => dispatch(clearFilters())}
              px="20px"
            >
              <Flex justify="space-between">
                <Text>LIMPAR FILTRO</Text>

                <Image src="cancel.svg" />
              </Flex>
            </Button>
          )}

          <VStack spacing="24px" align="start">
            <FilterField
              title="Preço"
              options={ORDERED_PRICE_FILTERS}
              checkedOptionId={filters.price}
              onChangeOption={(option) => dispatch(setPriceFilter(option))}
            />

            <FilterField
              title="Disponibilidade para venda"
              options={ORDERED_AVAILABILITY_FILTERS}
              checkedOptionId={filters.availability}
              onChangeOption={(option) =>
                dispatch(setAvailabilityFilter(option))
              }
            />

            <FilterField
              title="Formatos disponíveis"
              options={ORDERED_FORMAT_FILTERS}
              checkedOptionId={filters.format}
              onChangeOption={(option) => dispatch(setFormatFilter(option))}
            />
          </VStack>
        </Box>

        <Box>
          <Text fontWeight={600} fontSize="16px" mb="32px">
            Resultados para: "{searchValue}"
          </Text>

          <Flex flexWrap="wrap" gap="24px">
            {filteredBooks.map((book) => (
              <BookCard
                key={`books-list-${book.id}`}
                author={book.volumeInfo.authors && book.volumeInfo.authors[0]}
                title={book.volumeInfo.title}
                imageSrc={book.volumeInfo?.imageLinks?.thumbnail}
              />
            ))}

            <Box ref={bottomInViewRef} />
          </Flex>

          {books.isFetching && (
            <Center py="32px">
              <Spinner />
            </Center>
          )}
        </Box>
      </Grid>
    </PageWrapper>
  );
};

export default Search;
