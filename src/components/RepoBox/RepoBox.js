import React from 'react';
import './RepoBox.scss';
import { ReactComponent as Star } from 'components/star.svg';

const RepoBox = ({name, stargazers_count, html_url, description}) => {
    return (
        <li className='repo-wrapper'>
            <div>
                <a className='repo-name' href={html_url} target='_blank'>{name}</a>
                <p className='repo-description'>{description}</p>
            </div>
            <div className='repo-stars'>
                <Star/>
                <p className='repo-stars__number'>{stargazers_count}</p>
            </div>
        </li>
    )
}

export default RepoBox;