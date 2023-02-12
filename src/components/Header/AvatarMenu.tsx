import { HStack, Image, Text, useBreakpointValue } from '@chakra-ui/react';

const SmallScreenAvatarMenu = () => (
  <HStack spacing="24px">
    <Image aria-label="notifications" src="bell.svg" />

    <Image aria-label="avatar" src="avatar.png" borderRadius="50%" />
  </HStack>
);

const LargeScreenAvatarMenu = () => (
  <HStack spacing="20px">
    <Image aria-label="avatar" src="avatar.png" borderRadius="50%" />

    <HStack>
      <Text fontWeight={700} fontSize="16px" color="#406A76">
        Alessandra
      </Text>

      <Image
        aria-label="avatar menu"
        src="arrow.svg"
        transform="rotate(90deg)"
      />
    </HStack>
  </HStack>
);

export const AvatarMenu = () => {
  const isSmallScreenOrLarger = useBreakpointValue([true, true, false]);

  if (isSmallScreenOrLarger) {
    return <SmallScreenAvatarMenu />;
  }

  return <LargeScreenAvatarMenu />;
};
