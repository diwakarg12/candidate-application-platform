// import React from 'react'
import style from '../styles/Filter.module.css';
import MultiSelect from './MultiSelect';

const Filter = () => {
  return (
    <div className={style.filter}>
      <MultiSelect placeholder={"Role"} style={style.role} />
      <MultiSelect placeholder={"Number of Employees"} style={style.employees} />
      <MultiSelect placeholder={"Experience"} style={style.experience} />
      <MultiSelect placeholder={"Remote"} style={style.remote} />
      <MultiSelect placeholder={"Tech Stack"} style={style.tech} />
      <MultiSelect placeholder={"Minimum Base pay Salary"} style={style.salary} />
      <input type="text" name="search" id="search" placeholder='Search Company Name' className={style.search} />
    </div>
  );
};

export default Filter;
