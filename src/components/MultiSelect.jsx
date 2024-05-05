/* eslint-disable react/prop-types */
import Select from 'react-select';

const MultiSelect = ({ placeholder, style, options }) => {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      isMulti={true}
      className={style}
    />
  );
};

export default MultiSelect;
