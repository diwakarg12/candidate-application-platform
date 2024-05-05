import { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import JobCard from './components/JobCard';

function App() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadMoreJobs = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // Ensure fetching 12 items per request
    const body = JSON.stringify({
      limit: 12, // Fetching 12 items per request
      offset: page * 12, // Calculating offset based on the current page
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body,
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

      // Check if the response contains the expected properties
      if (data.jdList && Array.isArray(data.jdList)) {
        setJobs((prevJobs) => [...prevJobs, ...data.jdList]); // Append new jobs to the existing array
        setPage((prevPage) => prevPage + 1); // Increment the page counter
      } else {
        console.error(
          'Expected an array of jobs, but received something else:',
          data
        );
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadMoreJobs();
  }, []);
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    if (scrollPercentage > 98 && !loading) {
      loadMoreJobs();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <>
      <Filter />
      <div className='app'>
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </>
  );
}

export default App;
