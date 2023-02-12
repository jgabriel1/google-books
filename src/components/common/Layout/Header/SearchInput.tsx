import { Flex, Image, Input } from '@chakra-ui/react';
import { FormEvent, useCallback, useRef } from 'react';

type SearchInputProps = {
  onSearch?: (searchValue: string) => void;
};

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitSearch = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const searchedValue = searchInputRef.current.value;

      if (searchedValue) {
        onSearch(searchedValue);
      }
    },
    [onSearch]
  );

  return (
    <Flex
      as="form"
      flex="1"
      py="10px"
      px="20px"
      maxW="1120px"
      borderRadius="120px"
      background="#F1F7FC"
      border="1px solid #DEE1E6"
      justifyContent="space-between"
      onSubmit={handleSubmitSearch}
    >
      <Input
        ref={searchInputRef}
        flex="1"
        variant="unstyled"
        placeholder="Search"
      />

      <button type="submit">
        <Image
          aria-label="Search"
          src="search.svg"
          height="16px"
          width="16px"
        />
      </button>
    </Flex>
  );
};
