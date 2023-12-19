//

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserListItem from './UserListItem';
import UserEditor from './UserEditor';
import { Link } from 'react-router-dom';

const UserList = ({ userRole }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState({keywords: '', role: '', maxAge: '', minAge: '', sortBy: ''});

  useEffect(() => {
    const fetchInitialUsers = () => {
      axios.get(`${import.meta.env.VITE_API_URL}/api/user/list/`, {withCredentials: true,params: {pageSize: 5,pageNumber: 1}
        }).then((response) => {
          setUsers(response.data.users);
          setTotalPages(Math.ceil(response.data.totalCount / 5));
          setCurrentPage(1);
        }).catch((error) => {
          console.error(error);
        });
    };
    fetchInitialUsers();
  }, []);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const keywords = formData.get('keywords');
    const minAge = formData.get('minAge');
    const maxAge = formData.get('maxAge');
    const role = formData.get('role');
    const sortBy = formData.get('sortBy');
    const newSearchParams = { keywords, minAge, maxAge, role, sortBy };
    setSearchParams(newSearchParams);
    fetchUsers({...newSearchParams, pageSize: 5, pageNumber: 1});
  }

  const fetchUsers = (params) => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/user/list`, {withCredentials: true, params:{...params, pageSize: 5},})
      .then((response) => {
        setUsers(response.data.users);
        console.log(response.data.users);
        setTotalPages(Math.ceil(response.data.totalCount / 5));
        setCurrentPage(params.pageNumber || 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }; 

  const handlePageChange = (pageNumber) => {
    console.log(`Page number clicked: ${pageNumber}`);
    console.log(searchParams);
    fetchUsers({ ...searchParams, pageNumber });
  };

  return (
    <>
      <h1>User List</h1>
      <div className='row'>
        <form onSubmit={(evt) => onFormSubmit(evt)}>
          <div className='form-group'>
            <label htmlFor='keywords'>Search</label>
            <input
              type='text'
              className='form-control'
              id='keywords'
              name='keywords'
              placeholder='Search for User by keywords'
              value={searchParams.keywords}
              onChange={(e) =>
                setSearchParams({ ...searchParams, keywords: e.target.value })
              }
            />
          </div>

          <div className='col-4'>
            <label htmlFor='role' className='form-label'>
              Role
            </label>
            <select
              className='form-select'
              id='role'
              name='role'
              value={searchParams.role}
              onChange={(e) =>
                setSearchParams({ ...searchParams, role: e.target.value })
              }
            >
              <option value=''>All</option>
              <option value='Developer'>Developer</option>
              <option value='Quality Analyst'>Quality Analyst</option>
              <option value='Business Analyst'>Business Analyst</option>
              <option value='Product Manager'>Product Manager</option>
              <option value='Technical Manager'>Technical Manager</option>
            </select>
          </div>

          <div className='row'>
            <div className='col-4'>
              <label htmlFor='minAge'>Min Age</label>
              <input
                type='number'
                className='form-control'
                id='minAge'
                name='minAge'
                placeholder='Min Age'
                value={searchParams.minAge}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, minAge: e.target.value })
                }
              />
            </div>
            <div className='col-4'>
              <label htmlFor='maxAge'>Max Age</label>
              <input
                type='number'
                className='form-control'
                id='maxAge'
                name='maxAge'
                placeholder='Max Age'
                value={searchParams.maxAge}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, maxAge: e.target.value })
                }
              />
            </div>
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
                setSearchParams({ ...searchParams, sortBy: e.target.value })
              }
            >
              <option value=''>None</option>
              <option value='givenName'>Given Name</option>
              <option value='familyName'>Family Name</option>
              <option value='role'>Role</option>
              <option value='newest'>Newest</option>
              <option value='oldest'>Oldest</option>
            </select>
          </div>

          <button type='submit' className='btn btn-primary'>
            Search
          </button>
        </form>
        {users.map((user) => (
          <UserListItem user={user} key={user._id} />
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

export default UserList;