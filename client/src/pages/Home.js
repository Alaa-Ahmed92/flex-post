import React, { Component } from 'react';
import FindPeople from '../components/FindPeople/FindPeople';
import Posts from '../components/Posts/Posts';
import Sider from '../components/Sider/Sider';
import { isAuthenticated } from '../helpers/auth-helper';
import { Row, Col } from 'antd';

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
                    <Row gutter={16}>
                        <Col className="gutter-row" span={5}>
                            <Sider />
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Posts />
                        </Col>
                        <Col className="gutter-row" span={7}>
                            <FindPeople />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
};

export default Home;
