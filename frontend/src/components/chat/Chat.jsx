import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import "./chat.css";

const Chat = () => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const endRef = useRef(null);
    const [image, setImage] = useState(null); // Added state for image

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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

    const handleSend = () => {
        if (text.trim() !== "") {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text, own: true, timestamp: new Date(), audio: audioURL, image: image }
            ]);
            setText("");
            setAudioURL(null);
            setImage(null); // Clear image after sending
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

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="./avatar6.png" alt="Esther" />
                    <div className="texts">
                        <span>Esther</span>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="Phone icon" />
                    <img src="./video.png" alt="Video call icon" />
                    <img src="./info.png" alt="Information icon" />
                </div>
            </div>
            <div className="center">
                {messages.map((msg, index) => (
                    <div className={`message ${msg.own ? "own" : ""}`} key={index}>
                        {msg.own ? null : <img src="./avatar6.png" alt="Esther's avatar" />}
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
