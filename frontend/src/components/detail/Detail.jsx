import React, { useState } from 'react';
import Modal from '..//Modal'; 
import "./detail.css";

const Detail = ({ selectedChat }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!selectedChat) {
        return <div className="detail">Select a chat to view details</div>;
    }

    const handleAvatarClick = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="detail">
            <div className="user">
                <img
                    src={selectedChat.img}
                    alt={`Profile picture of ${selectedChat.name}`}
                    onClick={handleAvatarClick}
                />
                <h2>{selectedChat.name}</h2>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>General Setting</span>
                        <img src="./arrowUp.png" alt="Arrow pointing up" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Chat Setting</span>
                        <img src="./arrowUp.png" alt="Arrow pointing up" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy and Help</span>
                        <img src="./arrowUp.png" alt="Arrow pointing up" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photo</span>
                        <img src="./arrowDown.png" alt="Arrow pointing down" />
                    </div>
                    <div className="photos">
                        <div className="photoitems">
                            <div className="photoDetails">
                                <img src="./download.jpeg" alt="Shared photo thumbnail" />
                                <span>photo002</span>
                            </div>
                            <img src="./download.png" alt="Download icon" className="icon" />
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="Arrow pointing up" />
                    </div>
                </div>
                <button>Block User</button>
                <button className="logout">Logout</button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>{selectedChat.name}</h2>
                <p>{selectedChat.msg}</p>
                <p>Additional user information goes here...</p>
            </Modal>
        </div>
    );
};

export default Detail;
