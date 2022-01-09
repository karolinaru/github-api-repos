import React from 'react';
import './SortingBox.scss';

const SortingBox = ({inputValue, repos, setRepos}) => {


  const sorting = (order, col) => {
    switch (order) {
      case 'largest': {
        const sorted = [...repos].sort((a,b) => b[col] - a[col]);
        setRepos(sorted);
        break;}
      case 'smallest':{
        const sorted = [...repos].sort((a,b) => a[col] - b[col]);
        setRepos(sorted);
        break;}
    }
  };

  const searchedClass = inputValue ? '_inputSearched' : '';
  const reposNumber = repos.length;

  return (
    <div className={'results-summary' + searchedClass}>
      {reposNumber >= 100 ? 
        <p>{inputValue} has at least {reposNumber} repositories: </p> : 
        <p>{inputValue} has {reposNumber} repositories: </p> }
        <div className='sorting-wrapper'>
          <label className='sorting-label'>Sort by stars: </label>
          <select className='sorting-select' onChange={(e)=>sorting(e.target.value, 'stargazers_count')}>
            <option value=''>--Chose an option--</option>
            <option value='smallest'>Smallest to Largest</option>
            <option value='largest'>Largest to Smallest</option>
          </select>
        </div>   
    </div>
  )
}

export default SortingBox;