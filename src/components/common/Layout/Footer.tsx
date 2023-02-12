import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

export const Footer = () => {
  const isSmallestScreenSize = useBreakpointValue([true, false]);
  const isScreenSmallOrWider = useBreakpointValue([true, true, false]);

  return (
    <Flex align="center" borderTop="0.5px solid #D9D9D9" marginTop="auto">
      <Container maxW="1120px">
        <Flex justify={['center', 'space-between']} align="center" p="28px">
          <Text
            color="#B2B4B9"
            fontSize="13px"
            fontWeight={500}
            textAlign={['center', 'left']}
          >
            Copyright © 2021 Árvore. {isScreenSmallOrWider && <br />} Todos os
            direitos reservados.
          </Text>

          {!isSmallestScreenSize && (
            <HStack spacing="12px">
              <Button
                variant="outline"
                color="#B2B4B9"
                fontSize="16px"
                fontWeight={500}
              >
                Política de privacidade
              </Button>

              <Button
                variant="outline"
                color="#B2B4B9"
                fontSize="16px"
                fontWeight={500}
              >
                Ajuda
              </Button>
            </HStack>
          )}
        </Flex>
      </Container>
    </Flex>
  );
};
