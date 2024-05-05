/* eslint-disable react/prop-types */
// import React from 'react';
import style from '../styles/JobCard.module.css';
import { Button } from './Button';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className={style.jobPosting}>
      <div className={style.companyDetails}>
        <img src={job.logoUrl} alt='Company Logo' />
        <div className={style.profile}>
          <p
            style={{
              color: '#8b8b8b',
              fontWeight: '600',
              fontSize: '20px',
            }}
          >
            {job.companyName}
          </p>
          <p style={{ fontSize: '18px' }}>{job.jobRole}</p>
          <p style={{ fontSize: '15px' }}>{job.location}</p>
        </div>
      </div>
      <div className={style.jobDetails}>
        <p className={style.estimatedSalary}>
          Estimated Salary: {job.salaryCurrencyCode}
          {job.maxJdSalary} ✅
        </p>
        <h2 style={{ marginTop: '0.5rem' }}>About the Company</h2>
        <p className={style.description}>{job.jobDetailsFromCompany}</p>
        <div className={style.descriptionBlur1}></div>
        <div className={style.descriptionBlur2}></div>
        <Link to={`/${job.jdUid}`} className={style.showMore}>
          Show more
        </Link>
        <div
          style={{
            display: 'block',
            textAlign: 'left',
            width: '100%',
            margin: '1.5rem 0',
          }}
        >
          <p style={{ color: '#8b8b8b', fontWeight: '800' }}>
            Minimum Experience
          </p>
          <p>{job.minExp ? job.minExp : '0'} years</p>
        </div>
        <Button style={style.easyApply} text='⚡ Easy Apply' />
        <Button
          style={style.referral}
          icon={<FaUserCircle className={style.icon} />}
          text='Ask for referral'
        />
      </div>
    </div>
  );
};

export default JobCard;

// const myHeaders = new Headers();
// myHeaders.append('Content-Type', 'application/json');

// const body = JSON.stringify({
//   limit: 10,
//   offset: 0,
// });

// const requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body,
// };

// fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// companyName: 'Dropbox';
// jdLink: 'https://weekday.works';
// jdUid: 'cfff35ac-053c-11ef-83d3-06301d0a7178-92010';
// jobDetailsFromCompany: "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.";
// jobRole: 'frontend';
// location: 'delhi ncr';
// logoUrl: 'https://logo.clearbit.com/dropbox.com';
// maxExp: 6;
// maxJdSalary: 61;
// minExp: 3;
// minJdSalary: null;
// salaryCurrencyCode: 'USD';
