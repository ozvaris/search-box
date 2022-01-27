import React, { useState } from 'react';
import _ from 'lodash';
import { fetchData } from '../../services/movies';
import ResultListComponent from '../ResultList';
import './index.scss';

const SearchBarComponent = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState({});
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [errorMssg, setErrorMssg] = useState('');
  
  const onChange = ({ target: { value } }) => {
    setQuery(value);

    const search = _.debounce(fetchData, 100);

    setSearchQuery(prevSearch => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    if (value) {
      setIsLoading(true);
      search(value, setDataList, setIsLoading);
    } else {
      setDataList([]);
      setIsLoading(false);
      setErrorMssg('');
    }
  };


  return (
    <div>
      <div className="SearchBar">
        <p className="SearchBar_title">Type to search!</p>
        <input
          className="SearchBar_input"
          type="text"
          value={query}
          placeholder="Enter Movie Title"
          onChange={onChange}
        />
      </div>
      <div>
        <ResultListComponent items={dataList} />
        {errorMssg}
      </div>
    </div>
  );
};

export default SearchBarComponent;
