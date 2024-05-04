/* eslint-disable react/prop-types */
// import React from 'react'

export const Button = ({ style, text, icon }) => {
  return (
    <button className={style}>
      {icon}
      {text}
    </button>
  );
};
