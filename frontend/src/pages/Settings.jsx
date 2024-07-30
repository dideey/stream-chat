import React, { useState } from 'react';
import { FaUserCircle, FaUpload } from 'react-icons/fa';
import styles from './Settings.module.css';

const Settings = () => {
    // Define state variables and setters
    const [notifications, setNotifications] = useState(true); // Set default value
    const [theme, setTheme] = useState('light'); // Set default value
    const [language, setLanguage] = useState('en'); // Set default value
    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState(''); // New state for name
    const [email, setEmail] = useState(''); // New state for email
    const [bio, setBio] = useState(''); // New state for bio
    const [message, setMessage] = useState('');

    // Handler for image upload
    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = URL.createObjectURL(event.target.files[0]);
            setProfileImage(file);
        }
    };

    // Handler for saving settings
    const handleSave = async () => {
        // Add your save logic here
        console.log('Settings saved');

        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, bio }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Profile updated successfully');
            } else {
                setMessage(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile');
        }
    };

    return (
        <div className={styles.settings}>
            <h1>Settings</h1>

            <div className={styles.container}>
                <div className={styles.section}>
                    <label className={styles.label}>Profile Picture</label>
                    <div 
                        className={styles.profilePicture} 
                        style={{ backgroundImage: `url(${profileImage})` }}
                    >
                        {!profileImage && <FaUserCircle size={100} color="#ccc" />}
                    </div>
                    <label className={styles.uploadButton} htmlFor="file-upload">
                        <FaUpload /> Upload Profile Picture
                    </label>
                    <input 
                        className={styles.hiddenInput} 
                        id="file-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                    />
                </div>
            </div>

            <section className={styles.settingsSection}>
                <h2>Notification Preferences</h2>
                <label>
                    Enable Notifications:
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={() => setNotifications(prev => !prev)}
                    />
                </label>
            </section>

            <section className={styles.settingsSection}>
                <h2>Theme</h2>
                <label>
                    <input
                        type="radio"
                        value="light"
                        checked={theme === 'light'}
                        onChange={() => setTheme('light')}
                    />
                    Light
                </label>
                <label>
                    <input
                        type="radio"
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={() => setTheme('dark')}
                    />
                    Dark
                </label>
            </section>

            <section className={styles.settingsSection}>
                <h2>Language</h2>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                </select>
            </section>

            <button className={styles.saveButton} onClick={handleSave}>Save Changes</button>
        </div>
    );
};

export default Settings;
