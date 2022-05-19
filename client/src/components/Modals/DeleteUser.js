import React, { useState } from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import { isAuthenticated } from '../../helpers/auth-helper';
import { useNavigate } from 'react-router-dom';
import {
    TrashIcon,
    ExclamationIcon
} from '@heroicons/react/outline';
import './style.css';

const DeleteUser = (props) => {
    const [show, setShow] = useState(false);
    const { user, deleteUser, className } = props;
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function confirmDelete() {
        let userId = user._id;
        let token = isAuthenticated().token;
        deleteUser(userId, token);
        navigate('/');
    }

    return (
        <>
            <button className={className} onClick={handleShow}><TrashIcon /> <span>Delete Profile</span></button>
            <Modal
                size="sm"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={'deleteUserModal'}
            >
                <Modal.Body>
                    <div className='bodyIcon'>
                        <ExclamationIcon />
                    </div>
                    <h6>Delete Account</h6>
                    <p>You're going to delete your account. Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No, Keep it.
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>Yes, Delete!</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default DeleteUser;