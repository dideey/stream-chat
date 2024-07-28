import React, { useState } from 'react';
import axios from 'axios';
import './updateProfile.css'; // Importing CSS for this component

const UpdateProfile = ({ userId, onUpdate }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [bio, setBio] = useState('');

    const handleProfilePicChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePic', profilePic);
        formData.append('bio', bio);

        try {
            const response = await axios.put(`/api/users/${userId}/profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpdate(response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="profilePic">Profile Picture:</label>
                <input type="file" id="profilePic" onChange={handleProfilePicChange} />
            </div>
            <div>
                <label htmlFor="bio">Bio:</label>
                <textarea id="bio" value={bio} onChange={handleBioChange} />
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default UpdateProfile;