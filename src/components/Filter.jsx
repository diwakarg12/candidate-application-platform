
import style from '../styles/Filter.module.css';
import MultiSelect from './MultiSelect';
import { roles, employees, experience, remote, salary } from './data';

const Filter = () => {
  return (
    <div className={style.filter}>
      <MultiSelect placeholder={'Role'} style={style.role} options={roles} />
      <MultiSelect
        placeholder={'Number of Employees'}
        style={style.employees}
        options={employees}
      />
      <MultiSelect
        placeholder={'Experience'}
        style={style.experience}
        options={experience}
      />
      <MultiSelect
        placeholder={'Remote'}
        style={style.remote}
        options={remote}
      />
      <MultiSelect
        placeholder={'Minimum Base pay Salary'}
        style={style.salary}
        options={salary}
      />
      <input
        type='text'
        name='search'
        id='search'
        placeholder='Search Company Name'
        className={style.search}
      />
    </div>
  );
};

export default Filter;
