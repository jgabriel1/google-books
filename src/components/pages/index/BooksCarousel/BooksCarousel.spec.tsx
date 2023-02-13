import { render, screen } from '@testing-library/react';
import { BooksCarousel, type BooksCarouselProps } from '.';
import { booksApi } from '../../../../store/booksApi';
import { useSelector } from 'react-redux';
import { ChakraProvider, useBreakpointValue } from '@chakra-ui/react';

jest.mock('../../../../store/booksApi', () => ({
  booksApi: {
    useGetBooksQuery: jest.fn(),
  },
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useBreakpointValue: jest.fn(),
}));

const renderWithWrapper = (props: BooksCarouselProps) =>
  render(<BooksCarousel {...props} />, { wrapper: ChakraProvider });

describe('<BooksCarousel />', () => {
  beforeEach(() => {
    (booksApi.useGetBooksQuery as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          volumeInfo: {
            imageLinks: {
              thumbnail: 'http://example.com/book1.jpg',
            },
          },
        },
        {
          id: 2,
          volumeInfo: {
            imageLinks: {
              thumbnail: 'http://example.com/book2.jpg',
            },
          },
        },
      ],
      isLoading: false,
      isError: false,
    });

    (useSelector as jest.Mock).mockReturnValue(0);

    (useBreakpointValue as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the book carousel with left and right buttons', () => {
    renderWithWrapper({
      title: 'Books',
      searchValue: 'test',
    });

    expect(screen.getByText('Books')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-left-button')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-right-button')).toBeInTheDocument();
  });

  it('renders book covers', () => {
    renderWithWrapper({
      title: 'Books',
      searchValue: 'test',
    });

    const bookCovers = screen.getAllByRole('img');

    expect(bookCovers.length).toBe(2);
    expect(bookCovers[0]).toHaveAttribute(
      'src',
      'http://example.com/book1.jpg'
    );
    expect(bookCovers[1]).toHaveAttribute(
      'src',
      'http://example.com/book2.jpg'
    );
  });

  it('does not render left and right buttons when the screen size is small', () => {
    (useBreakpointValue as jest.Mock).mockReturnValue(true);

    renderWithWrapper({
      title: 'Books',
      searchValue: 'test',
    });

    expect(screen.queryByTestId('scroll-left-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('scroll-right-button')).not.toBeInTheDocument();
  });
});
