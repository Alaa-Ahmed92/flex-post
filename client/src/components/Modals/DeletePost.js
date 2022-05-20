import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import {
    ExclamationIcon
} from '@heroicons/react/outline';
import './style.css';

const DeletePost = (props) => {
    const {visible, onCancel, onOk} = props;

    return (
        <>
            <Modal
                size="sm"
                show={visible}
                onHide={onCancel}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <div className='bodyIcon'>
                        <ExclamationIcon />
                    </div>
                    <h6>Delete Post</h6>
                    <p>You're going to delete the post. Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>
                        No, Keep it.
                    </Button>
                    <Button variant="danger" onClick={onOk}>Yes, Delete!</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default DeletePost;