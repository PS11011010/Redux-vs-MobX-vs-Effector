import React from 'react';
import { Link } from 'react-router-dom';
import './BackLink.css'

const BackLink = () => {
    return (
        <div className="Home-BackLink">
            <Link className="Home-BackLink__link" to="/">&lt;&nbsp;Back</Link>
            {' '}
        </div>
    )
}

export default BackLink;
