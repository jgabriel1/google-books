import { Checkbox, Text, VStack } from '@chakra-ui/react';

export type Option = {
  id: string;
  title: string;
};

export type FilterFieldProps = {
  title: string;
  options: readonly Option[];
  checkedOptionId?: string;
  onChangeOption: (optionId?: string) => void;
};

export const FilterField = ({
  title,
  options,
  checkedOptionId,
  onChangeOption,
}: FilterFieldProps) => (
  <VStack spacing="20px" align="start">
    <Text fontWeight={600} color="#9EAEB7" fontSize="14px">
      {title}
    </Text>

    {options.map((option) => (
      <Checkbox
        key={`filter-option-${option.id}`}
        colorScheme="gray"
        borderColor="#053B4B"
        isChecked={checkedOptionId === option.id}
        onChange={(e) =>
          onChangeOption(e.target.checked ? option.id : undefined)
        }
      >
        <Text color="#053B4B" fontSize="14px">
          {option.title}
        </Text>
      </Checkbox>
    ))}
  </VStack>
);
