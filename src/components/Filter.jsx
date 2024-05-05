/* eslint-disable react/prop-types */
import style from '../styles/Filter.module.css';
import MultiSelect from './MultiSelect';
import { roles, experience, remote, salary } from './data';

const Filter = ({
  onFilterChange,
  locationSearch,
  setLocationSearch,
  companySearch,
  setCompanySearch,
}) => {
  const handleFilterChange = (selectedOptions, field) => {
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      [field]: selectedOptions.map((option) => option.value),
    }));
  };

  return (
    <div className={style.filter}>
      <MultiSelect
        placeholder={'Role'}
        style={style.role}
        options={roles}
        onChange={(selectedOptions) =>
          handleFilterChange(selectedOptions, 'role')
        }
      />
      <MultiSelect
        placeholder={'Experience'}
        style={style.experience}
        options={experience}
        onChange={(selectedOptions) =>
          handleFilterChange(selectedOptions, 'experience')
        }
      />
      <MultiSelect
        placeholder={'Remote'}
        style={style.remote}
        options={remote}
        onChange={(selectedOptions) =>
          handleFilterChange(selectedOptions, 'remote')
        }
      />
      <MultiSelect
        placeholder={'Minimum Base pay Salary'}
        style={style.salary}
        options={salary}
        onChange={(selectedOptions) =>
          handleFilterChange(selectedOptions, 'salary')
        }
      />
      <input
        type='text'
        name='location'
        id='location'
        placeholder='Search Location'
        className={style.search}
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
      />

      <input
        type='text'
        name='company'
        id='company'
        placeholder='Search Company Name'
        className={style.search}
        value={companySearch}
        onChange={(e) => setCompanySearch(e.target.value)}
      />
    </div>
  );
};

export default Filter;
