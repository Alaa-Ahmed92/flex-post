import React from 'react';
import EditForm from '../components/EditForm/EditForm';

const EditProfile = (props) => {

    return (
        <div className='edit-profile page'>
            <div className='container'>
                <h1>Edit Profile</h1>
                <EditForm />
            </div>
        </div>
    )
};

export default EditProfile;