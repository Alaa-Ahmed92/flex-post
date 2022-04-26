import React, { Component } from 'react';
import Posts from '../components/Posts/Posts';

class Home extends Component {
    render() {
        return (
            <div className='home-page page'>
                <div className='container'>
                    <Posts />
                </div>
            </div>
        )
    }
};

export default Home;
