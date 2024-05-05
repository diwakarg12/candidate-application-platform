import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DetailDescription = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      // Ensure fetching 12 items per request

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          'https://api.weekday.technology/adhoc/getSampleJdJSON',
          requestOptions
        );
        if (!response.ok) {
          console.error('Network response was not ok:', response.status);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        // Check if the response contains the expected properties
        if (data.jdList && Array.isArray(data.jdList)) {
          const matchingJob = data.jdList.find((job) => job.jdUid === id);
          if (matchingJob) {
            setJob(matchingJob);
          } else {
            console.error('Could not find a matching job with the provided ID');
          }
        } else {
          console.error(
            'Expected an array of jobs, but received something else:',
            data
          );
        }
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchJob();
  }, [id]); // Re-fetch if the job ID changes

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div>
      <Link
        to='/'
        style={{
          display: 'flex',
          textDecoration: 'none',
          margin: '2rem 0 0 2rem ',
        }}
      >
        <svg
          className='MuiSvgIcon-root MuiSvgIcon-fontSize14px css-ll59uz'
          focusable='false'
          aria-hidden='true'
          viewBox='0 0 24 24'
          data-testid='ArrowBackIcon'
          style={{ width: '25px', height: '18px' }}
        >
          <path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z'></path>
        </svg>
        Go to Home page
      </Link>
      <h1 style={{ textTransform: 'Uppercase', marginLeft: '2rem' }}>
        {job.jobRole} Engineer
      </h1>
      <div style={{ width: '50%', margin: 'auto' }}>
        <h1>About the Role</h1>
        <h3>Overview</h3>
        <p>
          Company Name:{' '}
          <span style={{ fontWeight: '600' }}>{job.companyName}</span>
        </p>
        <h3 style={{ fontWeight: '600', margin: '1rem 0' }}>
          Role: {job.jobRole} Engineer
        </h3>
        <ul>
          <li style={{ margin: '0.6rem 0' }}>
            Salary: USD {job.minJdSalary} - {job.maxJdSalary} per Month
          </li>
          <li style={{ margin: '0.6rem 0' }}>
            Experience: {job.minExp} - {job.maxExp} Years
          </li>
          <li style={{ margin: '0.6rem 0' }}>Location: {job.location}</li>
          <li style={{ margin: '0.6rem 0' }}>Type: Full time</li>
        </ul>
        <h2 style={{ marginTop: '2rem' }}>Job Description</h2>
        <p>{job.jobDetailsFromCompany}</p>
        <button
          style={{
            width: '95%',
            padding: '10px 20px',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            borderRadius: '10px',
            margin: '1rem 0',
            backgroundColor: '#4943da',
            color: '#fff',
          }}
        >
          Apply For this Job
        </button>
      </div>
    </div>
  );
};

export default DetailDescription;
