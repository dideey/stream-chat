import React, { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './chat.css';
import axios from 'axios';

const Chat = ({ userId, selectedChat }) => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const endRef = useRef(null);
    const [image, setImage] = useState(null);

    // Function to generate room name
    const generateRoomName = (userId, recipientId) => {
        const ids = [userId, recipientId].sort((a, b) => a - b);
        return `personal_chat_${ids[0]}_${ids[1]}`;
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Enables WebSocket connection
    useEffect(() => {
        if (!selectedChat || selectedChat.id) return; // Do not set up socket if no selected chat

        const roomName = generateRoomName(userId, selectedChat.id);
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: data.message, own: data.sender_id === userId, timestamp: new Date() }
            ]);
        };

        socket.onclose = () => {
            console.log("Socket closed unexpectedly");
        };

        return () => {
            socket.close();
        };
    }, [userId, selectedChat]);

    useEffect(() => {
        if (isRecording && mediaRecorder) {
            mediaRecorder.start();
        } else if (mediaRecorder) {
            mediaRecorder.stop();
        }
    }, [isRecording, mediaRecorder]);

    useEffect(() => {
        const handleDataAvailable = (event) => {
            if (event.data.size > 0) {
                setAudioURL(URL.createObjectURL(event.data));
            }
        };

        const initMediaRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = handleDataAvailable;
                setMediaRecorder(recorder);
            } catch (err) {
                console.error("Error accessing microphone", err);
            }
        };

        initMediaRecorder();

        return () => {
            if (mediaRecorder) {
                mediaRecorder.stream.getTracks().forEach(track => track.stop());
                mediaRecorder.stop();
            }
        };
    }, [mediaRecorder]);

    const handleSend = async () => {
        if (text.trim() !== "") {
            // Send message to the WebSocket
            setMessages((prevMessages) => [
                ...prevMessages,
                { text, own: true, timestamp: new Date(), audio: audioURL, image: image }
            ]);

            // Reset inputs
            setText("");
            setAudioURL(null);
            setImage(null);

            // Send message to the API
            try {
                const response = await axios.post('http://195.35.37.100:8000/chat/', {
                    message: text,
                    sender_id: userId,
                    receiver_id: selectedChat.id,
                }, {
                    Headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Message sent:', response.data);
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleEmojiClick = (event, emojiObject) => {
        setText(prevText => prevText + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = URL.createObjectURL(event.target.files[0]);
            setImage(file); // Store image URL in state
        }
    };

    if (!selectedChat) {
        return <div>No chat selected</div>; // Fallback if no chat is selected
    }

    return (
        <div className="chat">
            <div className="top">
                {selectedChat && (
                    <>
                        <div className="user">
                            <img src={selectedChat.img || "./default-avatar.png"} alt={selectedChat.name} />
                            <div className="texts">
                                <span>{selectedChat.name}</span>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="icons">
                            <img src="./phone.png" alt="Phone icon" />
                            <img src="./video.png" alt="Video call icon" />
                            <img src="./info.png" alt="Information icon" />
                        </div>
                    </>
                )}
            </div>
            <div className="center">
                {messages.map((msg, index) => (
                    <div className={`message ${msg.own ? "own" : ""}`} key={index}>
                        {msg.own ? null : <img src="./default-avatar.png" alt="Sender's avatar" />}
                        <div className="texts">
                            <p>{msg.text}</p>
                            {msg.audio && <audio controls src={msg.audio} />}
                            {msg.image && <img src={msg.image} alt="Attached" />}
                            <span>{msg.timestamp.toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
                <div className="endRef" ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <input
                        type="file"
                        accept="image/*"
                        id="imageUpload"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="imageUpload">
                        <img src="./img.png" alt="Attachment icon" />
                    </label>
                    <img
                        src={isRecording ? "./stop.png" : "./mic.png"}
                        alt="Microphone icon"
                        onClick={() => setIsRecording(prev => !prev)}
                    />
                </div>
                <input
                    type="text"
                    placeholder="Type a Message...."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <div className="emoji">
                    <img
                        src="./emoji.png"
                        alt="Emoji picker"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                    {showEmojiPicker && (
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                        />
                    )}
                </div>
                <button className="sendButton" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
