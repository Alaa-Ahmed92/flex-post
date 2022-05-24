import React, { useEffect, useState, useRef } from 'react';
import { getUsersSelector } from '../../selectors/userSelector';
import { connect } from 'react-redux';
import { getUsers } from './../../actions/profileActions';
import './FindUser.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FindUser = (props) => {
    const { users, getUsers } = props;
    // the value of the search field 
    const [name, setName] = useState('');
    // the search found users
    const [foundUsers, setFoundUsers] = useState(users);
    const [show, setShow] = useState(false);
    const wrapperRef = useRef(null);


    useEffect(() => {
        getUsers();
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShow(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filter = (e) => {
        let keyword = e.target.value;

        if (keyword !== '') {
            const results = users.filter(user => {
                return user.name.toLowerCase().includes(keyword.toLowerCase())
            });
            setFoundUsers(results);
            setShow(true);
        } else {
            // If the text field is empty, show all users
            setFoundUsers(users);
        }
        setName(keyword);
    }

    function onFocus() {
        setFoundUsers(users);
        setShow(true);
        setName('');
    }

    function onClickLink() {
        setShow(false);
        setName('');
    }


    return (
        <div className='findUser' ref={wrapperRef}>
            <input
                type={'search'}
                onChange={filter}
                value={name}
                className="form-control"
                onFocus={onFocus}
                placeholder="Search Users..."
            />
            <div className={`userListDropdown ${show ? 'show' : 'hide'}`}>
                <ul>
                    {foundUsers && foundUsers.length > 0 ? (
                        foundUsers.slice(0, 8).map((user) => (
                            <li key={user._id} className="userLink">
                                <Link onClick={onClickLink} to={`/user/${user._id}`}>
                                    <img
                                        className='img-fluid'
                                        src={`/user/photo/${user._id}`}
                                        onError={i => i.target.src = `/user/photo/defaultphoto`}
                                    />
                                    <span className="userName">{user.name}</span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className='noFound'>No results found!</li>
                    )}
                </ul>
            </div>
        </div >
    )
};

FindUser.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array
};

const mapStateToProps = state => ({
    users: getUsersSelector(state)
});

export default connect(mapStateToProps, { getUsers })(FindUser);