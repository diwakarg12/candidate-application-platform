import { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import JobCard from './components/JobCard';
import JobNoFound from './components/JobNoFound';

function App() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    role: [],
    employees: [],
    experience: [],
    remote: [],
    salary: [],
  });

  const [locationSearch, setLocationSearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');

  // const [updatedJobs, setUpdatedJobs] = useState([]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  // Assuming `jobs` is your original array of jobs and `filters` is your object containing filter criteria

  // Combine all filters into a single filtering logic
  const filteredJobs = jobs.filter((job) => {
    // Filter by role
    if (filters.role.length && !filters.role.includes(job.jobRole)) {
      return false;
    }

    // Filter by experience
    if (filters.experience.length && !filters.experience.includes(job.minExp)) {
      return false;
    }

    // Filter by remote work options
    if (filters.remote.length && !filters.remote.includes(job.remote)) {
      return true;
    }

    if (filters.salary.length) {
      // Check if any of the selected salary values are less than job.minJdSalary
      const isSalarySelected = filters.salary.some(
        (selectedSalary) => selectedSalary >= job.maxJdSalary
      );
      if (!isSalarySelected) {
        return false; // Exclude jobs where none of the selected salaries are less than or equal to job.minJdSalary
      }
    }

    if (
      locationSearch &&
      !job.location.toLowerCase().includes(locationSearch.toLowerCase())
    ) {
      return false;
    }

    // Filter by company name
    if (
      companySearch &&
      !job.companyName.toLowerCase().includes(companySearch.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Update the state with the filtered jobs
  // setUpdatedJobs(filteredJobs);

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
      console.log(data);

      // Check if the response contains the expected properties
      if (data.jdList && Array.isArray(data.jdList)) {
        setJobs((prevJobs) => [...prevJobs, ...data.jdList]); // Append new jobs to the existing array
        console.log(jobs);
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
      <Filter
        onFilterChange={handleFilterChange}
        locationSearch={locationSearch}
        setLocationSearch={setLocationSearch}
        companySearch={companySearch}
        setCompanySearch={setCompanySearch}
      />

      <div className='app'>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <JobNoFound />
        )}
      </div>
      {loading && <div>Loading...</div>}
    </>
  );
}

export default App;
