import {
  Grid,
  Box,
  Text,
  Flex,
  VStack,
  Center,
  Spinner,
  Image,
  Container,
  useBreakpointValue,
  useDisclosure,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { BookCard } from '../components/BookCard';
import { FilterField } from '../components/FilterField';
import { State } from '../store';
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
import { LargeButton } from '../components/LargeButton';

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

  const isSmallestScreen = useBreakpointValue([true, false]);

  const filtersModal = useDisclosure();

  return (
    <>
      <Container maxW="1120px" p={['20px', '60px']}>
        <Grid
          gridTemplateColumns={['1fr', '1fr 4fr']}
          gap={['40px', '40px', '80px']}
        >
          {!isSmallestScreen && (
            <Box minW="200px">
              <Text fontWeight={600} fontSize="18px" mb="24px">
                Filtrar
              </Text>

              {hasAnyFiltersOn && (
                <LargeButton
                  bg="#ADB7BF"
                  onClick={() => dispatch(clearFilters())}
                  rightIcon={<Image src="cancel.svg" />}
                  mb="24px"
                >
                  Limpar Filtro
                </LargeButton>
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
          )}

          <VStack spacing={['24px', '32px']} align="left">
            <Text fontWeight={600} fontSize="16px">
              Resultados para: "{searchValue}"
            </Text>

            {isSmallestScreen && (
              <>
                <LargeButton background="#8553F4" onClick={filtersModal.onOpen}>
                  <HStack justify="center">
                    <Image src="filter.svg" />

                    <Text>FILTRAR</Text>
                  </HStack>
                </LargeButton>

                {hasAnyFiltersOn && (
                  <LargeButton
                    bg="#ADB7BF"
                    onClick={() => dispatch(clearFilters())}
                  >
                    Limpar Filtro
                  </LargeButton>
                )}
              </>
            )}

            <Flex
              flexWrap="wrap"
              gap="24px"
              justify={['center', 'center', 'start']}
            >
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
          </VStack>
        </Grid>
      </Container>

      {filtersModal.isOpen && (
        <Flex
          direction="column"
          position="fixed"
          top="0"
          bottom="0"
          left="0"
          right="0"
          bg="#FFFFFF"
          py="32px"
          px="16px"
        >
          <Flex align="center" justify="space-between" mb="32px">
            <Text fontWeight={600} fontSize="18px">
              Filtrar
            </Text>

            <IconButton
              variant="outline"
              border="none"
              aria-label="close filters modal"
              icon={<Image src="cancel-dark.svg" height="10px" width="10px" />}
              onClick={() => {
                dispatch(clearFilters());
                filtersModal.onClose();
              }}
            />
          </Flex>

          <Box flex="1">
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

          <LargeButton bg="#8553F4" onClick={filtersModal.onClose}>
            <HStack justify="center">
              <Image src="filter.svg" />

              <Text>Filtrar Agora</Text>
            </HStack>
          </LargeButton>
        </Flex>
      )}
    </>
  );
};

export default Search;
