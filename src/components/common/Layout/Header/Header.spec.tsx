import { render, screen } from '@testing-library/react';
import { Header } from '.';
import { ChakraProvider } from '@chakra-ui/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const renderWithWrapper = () => render(<Header />, { wrapper: ChakraProvider });

describe('<Header />', () => {
  it('renders the logo', () => {
    renderWithWrapper();

    expect(screen.getByAltText('Árvore')).toBeInTheDocument();
  });

  it('triggers router push when search is submitted', async () => {
    const routerPushMock = jest.fn();
    const useRouterSpy = jest.spyOn(require('next/router'), 'useRouter');
    useRouterSpy.mockReturnValue({
      push: routerPushMock,
    });

    renderWithWrapper();

    const searchValue = 'some-search-value';

    await userEvent.type(screen.getByTestId('search-input'), searchValue);
    await userEvent.keyboard('{Enter}');

    expect(routerPushMock).toHaveBeenCalledWith(`/${searchValue}`);
  });
});
