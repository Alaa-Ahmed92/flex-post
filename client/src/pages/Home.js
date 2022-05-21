import React, { Component } from 'react';
import FindPeople from '../components/FindPeople/FindPeople';
import Posts from '../components/Posts/Posts';
import { isAuthenticated } from '../helpers/auth-helper';

class Home extends Component {

    render() {
        if (!isAuthenticated()) {
            return (
                <div>Please! Login</div>
            )
        }
        return (
            <div className='home-page page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-2'>
                            Test
                        </div>
                        <div className='col-lg-6'>
                            <Posts />
                        </div>
                        <div className='col-lg-4'>
                            <FindPeople />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Home;
