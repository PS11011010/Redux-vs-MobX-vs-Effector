import React from 'react';
import { Link } from 'react-router-dom';
import './Home/Home.css'

const Home = () => (
    <div className="Home">
        <strong className="Home-Title">React app for compare performance of Redux, MobX and Effector</strong>
        <Link className="Home-Link" to="/redux">Redux</Link>
        <Link className="Home-Link" to="/mobx">MobX</Link>
        <Link className="Home-Link" to="/effector">Effector</Link>
    </div>
);

export default Home;

