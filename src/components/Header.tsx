import { FormEvent, useRef } from 'react';
import Link from 'next/link';
import { Box, Container, Flex, Input, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const Header = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSubmitSearch = (event: FormEvent) => {
    event.preventDefault();

    const searchedValue = searchInputRef.current.value;

    if (searchedValue) {
      router.push(`/${searchedValue}`);
    }
  };

  return (
    <Container
      py="20px"
      maxW="1680px"
      boxShadow="0px 4px 5px rgba(5, 59, 75, 0.06);"
      background="#FFFFFF"
    >
      <Flex alignItems="center" justifyContent="space-between" gap="24px">
        <Link href="/" type="button">
          <img src="logo.svg" alt="Árvore" />
        </Link>

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

        <Box w="120px" />
      </Flex>
    </Container>
  );
};
