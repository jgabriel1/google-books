import { Box, Flex, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { FiltersSelector, type FiltersSelectorProps } from './FiltersSelector';
import { LargeButton } from './LargeButton';

interface FiltersModalProps extends FiltersSelectorProps {
  onClickClose: () => void;
  onClickConfirmFilter: () => void;
}

export const FiltersModal = ({
  filters,
  onSetPriceFilter,
  onSetAvailabilityFilter,
  onSetFormatFilter,
  onClickClose,
  onClickConfirmFilter,
}: FiltersModalProps) => (
  <Flex
    direction="column"
    position="fixed"
    top="0"
    bottom="0"
    left="0"
    right="0"
    bg="#FFFFFF"
    py="32px"
    px="16px"
  >
    <Flex align="center" justify="space-between" mb="32px">
      <Text fontWeight={600} fontSize="18px">
        Filtrar
      </Text>

      <IconButton
        variant="outline"
        border="none"
        aria-label="close filters modal"
        icon={<Image src="cancel-dark.svg" height="10px" width="10px" />}
        onClick={onClickClose}
      />
    </Flex>

    <Box flex="1">
      <FiltersSelector
        filters={filters}
        onSetPriceFilter={onSetPriceFilter}
        onSetAvailabilityFilter={onSetAvailabilityFilter}
        onSetFormatFilter={onSetFormatFilter}
      />
    </Box>

    <LargeButton bg="#8553F4" onClick={onClickConfirmFilter}>
      <HStack justify="center">
        <Image src="filter.svg" />

        <Text>Filtrar Agora</Text>
      </HStack>
    </LargeButton>
  </Flex>
);
