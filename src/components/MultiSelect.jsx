/* eslint-disable react/prop-types */
import { useState } from 'react';
import Select from 'react-select';
import { options } from './data';

const MultiSelect = ({ placeholder, style }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  return (
    <Select
      placeholder={placeholder}
      options={options}
      isMulti={true}
      value={selectedOptions}
      onChange={handleChange}
      className={style}
    />
  );
};

export default MultiSelect;
