import { Button, type ButtonProps } from '@chakra-ui/react';

interface LargeButtonProps extends ButtonProps {}

export const LargeButton = ({ children, ...rest }: LargeButtonProps) => (
  <Button
    variant="unstyled"
    w="full"
    h="auto"
    px="20px"
    py="12px"
    fontSize="16px"
    fontWeight={600}
    color="#F1F7FC"
    textTransform="uppercase"
    {...rest}
  >
    {children}
  </Button>
);
