import Link from 'next/link';
import {
  Box,
  Container,
  Flex,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SearchInput } from './SearchInput';
import { AvatarMenu } from './AvatarMenu';

export const Header = () => {
  const router = useRouter();

  const isSmallestScreenSize = useBreakpointValue([true, false]);
  const isScreenSmallOrWider = useBreakpointValue([true, true, false]);

  return (
    <Container maxW="1680px" p="0">
      <Box
        p="20px"
        boxShadow={
          !isScreenSmallOrWider && '0px 4px 5px rgba(5, 59, 75, 0.06);'
        }
        borderBottom={isScreenSmallOrWider && '1px solid #F1F7FC'}
        background="#FFFFFF"
      >
        <Flex alignItems="center" justifyContent="space-between" gap="24px">
          <Link href="/" type="button">
            <Image
              aria-label="Logo"
              src="logo.svg"
              alt="Árvore"
              height={isScreenSmallOrWider && '24px'}
            />
          </Link>

          {!isSmallestScreenSize && (
            <SearchInput
              onSearch={(searchValue) => router.push(`/${searchValue}`)}
            />
          )}

          <AvatarMenu />
        </Flex>
      </Box>

      {isSmallestScreenSize && (
        <Box p="20px">
          <SearchInput
            onSearch={(searchValue) => router.push(`/${searchValue}`)}
          />
        </Box>
      )}
    </Container>
  );
};
