import React, { useState } from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import { isAuthenticated } from '../../helpers/auth-helper';
import { useNavigate } from 'react-router-dom';
import { TrashIcon } from '@primer/octicons-react';

const DeleteUser = (props) => {
    const [show, setShow] = useState(false);
    const { user, deleteUser } = props;
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
            <button onClick={handleShow}><TrashIcon size={18} /></button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Your Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete your account?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default DeleteUser;