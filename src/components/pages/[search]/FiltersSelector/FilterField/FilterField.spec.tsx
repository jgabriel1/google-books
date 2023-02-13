import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterField, type Option, type FilterFieldProps } from '.';

const options: readonly Option[] = [
  { id: 'option1', title: 'Option 1' },
  { id: 'option2', title: 'Option 2' },
  { id: 'option3', title: 'Option 3' },
];

const renderWithWrapper = (props: FilterFieldProps) =>
  render(<FilterField {...props} />, { wrapper: ChakraProvider });

describe('<FilterField />', () => {
  it('renders the title and options', () => {
    renderWithWrapper({
      title: 'Filter Title',
      options,
      onChangeOption: () => {},
    });

    expect(screen.getByText('Filter Title')).toBeInTheDocument();

    options.forEach((option) => {
      expect(screen.getByText(option.title)).toBeInTheDocument();
    });
  });

  it('marks the checked option as selected', () => {
    const checkedOptionId = 'option1';

    renderWithWrapper({
      title: 'Filter Title',
      options,
      checkedOptionId,
      onChangeOption: () => {},
    });

    expect(screen.getByRole('checkbox', { name: 'Option 1' })).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: 'Option 2' })
    ).not.toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: 'Option 3' })
    ).not.toBeChecked();
  });

  it('calls onChangeOption with its value when an option is checked', async () => {
    const onChangeOption = jest.fn();

    renderWithWrapper({
      title: 'Filter Title',
      options,
      onChangeOption,
    });

    await userEvent.click(screen.getByRole('checkbox', { name: 'Option 2' }));

    expect(onChangeOption).toHaveBeenCalledWith('option2');
  });

  it('calls onChangeOption with undefined when an option is unchecked', async () => {
    const onChangeOption = jest.fn();

    renderWithWrapper({
      title: 'Filter Title',
      options,
      checkedOptionId: 'option2',
      onChangeOption,
    });

    await userEvent.click(screen.getByRole('checkbox', { name: 'Option 2' }));

    expect(onChangeOption).toHaveBeenCalledWith(undefined);
  });
});
