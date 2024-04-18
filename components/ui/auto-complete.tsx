'use client';
import React, { ChangeEventHandler } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

interface CustomAutocompleteProps {
  label: string;
  labelPlacement: any;
  placeholder?: string;
  data: { value: string; label: string }[];
  isDisabled: boolean;
  inputValue: string;
  onInputChange?: (value: string) => void;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  label,
  labelPlacement,
  placeholder,
  data,
  isDisabled,
  inputValue,
  onInputChange
}) => (
  <div className="mb-4">
    <Autocomplete
      isRequired
      isDisabled={isDisabled}
      label={label}
      labelPlacement={labelPlacement}
      placeholder={placeholder}
      inputValue={inputValue}
      allowsCustomValue={false}
      onInputChange={onInputChange}
    >
      {data.map((item) => (
        <AutocompleteItem key={item.value} value={item.value}>
          {item.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  </div>
);

export { CustomAutocomplete };
