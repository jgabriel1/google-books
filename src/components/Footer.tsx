import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';

export const Footer = () => (
  <Flex align="center" borderTop="0.5px solid #D9D9D9" marginTop="auto">
    <Container maxW="1120px">
      <Flex justify="space-between" align="center" p="28px">
        <Text color="#B2B4B9" fontSize="13px" fontWeight={500}>
          Copyright © 2021 Árvore. Todos os direitos reservados.
        </Text>

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
      </Flex>
    </Container>
  </Flex>
);
