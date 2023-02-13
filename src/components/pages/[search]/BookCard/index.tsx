import { Text, Image, VStack } from '@chakra-ui/react';

export type BookCardProps = {
  imageSrc?: string;
  title: string;
  author: string;
};

export const BookCard = ({ imageSrc, title, author }: BookCardProps) => (
  <VStack spacing="8px" align="left" maxW="120px">
    <Image
      src={imageSrc}
      alt={`book-cover-${title}`}
      objectFit="cover"
      w="120px"
      h="180px"
      borderRadius="5px"
    />

    <Text fontWeight={600} fontSize="12px" noOfLines={2}>
      {title}
    </Text>

    <Text fontWeight={400} fontSize="10px" color="#999999">
      {author}
    </Text>
  </VStack>
);
