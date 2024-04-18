'use client';
import React from 'react';
import { Radio, RadioGroup } from '@nextui-org/react';

interface RadioOptionsProps {
  label: string;
  data: { value: string; label: string }[];
  defaultValue: string;
  radioGroupProps?: React.ComponentProps<typeof RadioGroup>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioOptions: React.FC<RadioOptionsProps> = ({
  label,
  data,
  defaultValue,
  radioGroupProps,
  onChange  
}) => (
  <div className="mb-4">
    <RadioGroup label={label} defaultValue={defaultValue} {...radioGroupProps} onChange={onChange} >
      {data.map((item) => (
        <Radio key={item.value} value={item.value} >
          {item.label}
        </Radio>
      ))}
    </RadioGroup>
  </div>
);

export { RadioOptions };