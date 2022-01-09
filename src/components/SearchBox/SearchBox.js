import React, {useState, useEffect} from 'react';
import './SearchBox.scss'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import RepoBox from 'components/RepoBox/RepoBox';
import SortingBox from 'components/SortingBox/SortingBox';
import {baseURL} from 'helpers/baseURL.js'

const SearchBox = () => {

    const [inputValue, setInputValue] = useState('');
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        //if no input, first rerender
        if (!inputValue) {
            return;
        }

        setLoading(true);

        axios.get(baseURL + inputValue + '/repos?page=1&per_page=100')
            .then(res => {              
                setRepos(res.data);            
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [inputValue]);

    const reposPerPage = 10;
    const pageVisited = pageNumber * reposPerPage;

    const displayRepos = repos
        .slice(pageVisited, pageVisited + reposPerPage)
        .map(repo => {
            const {id, name, html_url, stargazers_count, description} = repo;
            return(
                <RepoBox
                    key={id}
                    name={name}
                    html_url={html_url}
                    stargazers_count={stargazers_count}
                    description={description}
                />
            )
        });

    const pageCount = Math.ceil(repos.length / reposPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const displayPagination = inputValue ? '__display' : '';

    return (
        <div>
            <div className='search-box'>
                <form className='search-form' onSubmit={event => {
                    event.preventDefault();
                    setInputValue(event.target.elements.query.value);
                }}>
                    <input
                        className='search-input'
                        type='text'
                        name='query'
                        placeholder='Search GitHub User'
                    />
                    <button className='search-btn' type='submit'> Search </button>
                </form>
            </div>

            {loading ? 'Results are loading...' : 
                <div>
                    <SortingBox
                        repos={repos}
                        inputValue={inputValue}
                        setRepos={setRepos}                   
                    />
            
                    <ul className='repo-list'>
                        {displayRepos}
                    </ul>

                    <div className={'pagination' + displayPagination}>
                    <ReactPaginate 
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'paginationBtns'}
                        pageClassName={'paginationBtn'}
                        previousClassName={'paginationBtn paginationBtn__previousBtn'}
                        nextClassName={'paginationBtn paginationBtn__nextBtn'}
                        disableClassName={'paginationBtn paginationBtn__paginationDisabled'}
                        activeClassName={'paginationBtn paginationBtn__paginationActive'}
                    />
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchBox;