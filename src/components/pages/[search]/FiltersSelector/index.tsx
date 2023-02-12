import { VStack } from '@chakra-ui/react';
import {
  ORDERED_AVAILABILITY_FILTERS,
  ORDERED_FORMAT_FILTERS,
  ORDERED_PRICE_FILTERS,
} from '../../../../helpers/filters';
import { FilterField } from './FilterField';

export type FiltersSelectorProps = {
  filters: {
    price?: string;
    availability?: string;
    format?: string;
  };
  onSetPriceFilter: (filter?: string) => void;
  onSetAvailabilityFilter: (filter?: string) => void;
  onSetFormatFilter: (filter?: string) => void;
};

export const FiltersSelector = ({
  filters,
  onSetPriceFilter,
  onSetAvailabilityFilter,
  onSetFormatFilter,
}: FiltersSelectorProps) => (
  <VStack spacing="24px" align="start">
    <FilterField
      title="Preço"
      options={ORDERED_PRICE_FILTERS}
      checkedOptionId={filters.price}
      onChangeOption={onSetPriceFilter}
    />

    <FilterField
      title="Disponibilidade para venda"
      options={ORDERED_AVAILABILITY_FILTERS}
      checkedOptionId={filters.availability}
      onChangeOption={onSetAvailabilityFilter}
    />

    <FilterField
      title="Formatos disponíveis"
      options={ORDERED_FORMAT_FILTERS}
      checkedOptionId={filters.format}
      onChangeOption={onSetFormatFilter}
    />
  </VStack>
);
