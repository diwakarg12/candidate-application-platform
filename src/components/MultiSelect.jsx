/* eslint-disable react/prop-types */
import Select from 'react-select';

const MultiSelect = ({ placeholder, style, options, onChange }) => {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      isMulti={true}
      className={style}
      onChange={onChange}
    />
  );
};

export default MultiSelect;
