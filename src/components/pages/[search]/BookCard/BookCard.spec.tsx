import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { BookCard, BookCardProps } from '.';

const renderWithWrapper = (props: BookCardProps) =>
  render(<BookCard {...props} />, { wrapper: ChakraProvider });

describe('BookCard', () => {
  it('should render the title and author', () => {
    const title = 'The Lord of the Rings';
    const author = 'J.R.R. Tolkien';

    renderWithWrapper({
      title,
      author,
    });

    const titleElement = screen.getByText(title);
    const authorElement = screen.getByText(author);

    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
  });

  it('should render the image', () => {
    const imageSrc = 'https://example.com/book-cover.jpg';
    const title = 'The Lord of the Rings';

    renderWithWrapper({
      imageSrc,
      title,
      author: 'J.R.R. Tolkien',
    });

    const imageElement = screen.getByAltText(`book-cover-${title}`);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', imageSrc);
  });

  it('should render the title with a maximum of 2 lines', () => {
    const title = 'The Lord of the Rings';

    renderWithWrapper({
      title,
      author: 'J.R.R. Tolkien',
    });

    const titleElement = screen.getByText(title);
    const titleStyle = window.getComputedStyle(titleElement);

    expect(titleStyle.getPropertyValue('text-overflow')).toBe('ellipsis');
    expect(titleStyle.getPropertyValue('--chakra-line-clamp')).toBe('2');
  });
});
