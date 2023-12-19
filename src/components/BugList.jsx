import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BugListItem from './BugListItem';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState({
    keywords: '',
    classification: '',
    maxAge: '',
    minAge: '',
    closed: null,
    sortBy: '',
  });

  useEffect(() => {
    const fetchInitialBugs = async () => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/bug/list`, {
          withCredentials: true,
          params: { pageSize: 6, pageNumber: 1},
        })
        .then((response) => {
          setBugs(response.data.bugs);
          console.log(response.data.bugs);
          setTotalPages(Math.ceil(response.data.totalCount / 6));
          setCurrentPage(1);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchInitialBugs();
  }, []);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
  
    // Get values from form data
    const keywords = formData.get('keywords');
    const minAge = formData.get('minAge');
    const maxAge = formData.get('maxAge');
    const classification = formData.get('classification');
    const sortBy = formData.get('sortBy');
    const closed =
    formData.get('closed') === 'true'
      ? true
      : formData.get('closed') === 'false'
      ? false
      : null; // Convert string to boolean
  
    // Update searchParams with the new values
    const newSearchParams = { keywords, minAge, maxAge, classification, sortBy, closed };
    setSearchParams(newSearchParams);
  
    // Fetch bugs with the updated parameters
    fetchBugs({ ...newSearchParams, pageSize: 6, pageNumber: 1 });
  };

  const fetchBugs = (params) => {
    const { closed, ...otherParams } = params;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bug/list`, {
        withCredentials: true,
        params:{...otherParams,
          ...(closed !== null && { closed }), pageSize: 6}},
      )
      .then((response) => {
        setBugs(response.data.bugs);
        console.log(response.data.bugs);
        setTotalPages(Math.ceil(response.data.totalCount / 6));
        setCurrentPage(params.pageNumber || 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageChange = (pageNumber) => {
    console.log(`Page number clicked: ${pageNumber}`);
    console.log(searchParams);
    fetchBugs({ ...searchParams, pageNumber });
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  

  return (
    <>
      <h1>Bug List</h1>
      <div className='row'>
        <form onSubmit={(evt) => onFormSubmit(evt)}>
          <div className='form-group'>
            <label htmlFor='keywords'>Search</label>
            <input
              type='text'
              className='form-control'
              id='keywords'
              name='keywords'
              placeholder='Search for Bug by keywords'
              value={searchParams.keywords}
              onChange={(e) =>
                setSearchParams({ ...searchParams, keywords: e.target.value })
              }
            />
          </div>

          <div className='col-4'>
            <label htmlFor='classification' className='form-label'>
              Classification
            </label>
            <select
              className='form-select'
              id='classification'
              name='classification'
              value={searchParams.classification}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  classification: e.target.value,
                })
              }
            >
              <option value=''>Any</option>
              <option value='approved'>Approved</option>
              <option value='unapproved'>Unapproved</option>
              <option value='duplicate'>Duplicate</option>
              <option value='unclassified'>Unclassified</option>
            </select>
          </div>

          <div className='col-4'>
            <label htmlFor='sortBy' className='form-label'>
              Sort By
            </label>
            <select
              className='form-select'
              id='sortBy'
              name='sortBy'
              value={searchParams.sortBy}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  sortBy: e.target.value,
                })
              }
            >
              <option value=''>None</option>
              <option value='oldest'>Newest</option>
              <option value='newest'>Oldest</option>
              <option value='title'>Title</option>
              <option value='classification'>Classification</option>
              <option value='assignedTo'>Assigned To</option>
              <option value='createdBy'>Reported By</option>
            </select>
          </div>

          <div className='col-4'>
            <label htmlFor='closed' className='form-label'>
              Closed
            </label>
            <select
              className='form-select'
              id='closed'
              name='closed'
              value={searchParams.closed}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  closed: e.target.value === 'any' ? null : e.target.value,
                })
              }
            >
              <option value=''>Any</option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>

          <button type='submit' className='btn btn-primary'>
            Search
          </button>
        </form>
        {bugs.map((bug) => (
            <BugListItem bug={bug} key={bug._id}/>
        ))}
        <nav aria-label='Page navigation'>
          <ul className='pagination'>
            {generatePageNumbers().map((pageNumber) => (
              <li
                className={`page-item ${
                  pageNumber === currentPage ? 'active' : ''
                }`}
                key={pageNumber}
              >
                <button
                  className='page-link'
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default BugList;
