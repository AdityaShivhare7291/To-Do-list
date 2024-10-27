// SearchBar.js
import React, { useState } from 'react';
// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../redux/slice/searchSlice';

const SearchBar = () => {
  const searchQuery = useSelector((state) => state.searchTask.task);
  const dispatch = useDispatch();

  return (
    <form style={styles.form}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search All week task"
          value={searchQuery}
          onChange={(e) => {
            dispatch(search({ task: e.target.value }));
          }}
          style={styles.input}
        />
        <FontAwesomeIcon icon={faSearch} style={styles.icon} />
      </div>
    </form>
  );
};

// Styles
const styles = {
  form: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E6E6E6',
    borderRadius: '4px',
    width: '100%',
  },
  icon: {
    width: '24px',
    height: '24px',
    color: 'black',
    marginRight: '10px', // Spacing between icon and input
  },
  input: {
    flex: 1,
    width: '339px',
    height: '47px',
    padding: '10px',
    border: 'none',
    outline: 'none', // Remove outline on focus
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4566EC',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default SearchBar;
