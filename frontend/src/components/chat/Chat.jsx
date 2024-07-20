import React, { useEffect, useRef, useState } from "react";
import "./chat.css";

const Chat = () => {
    // const [open, setOpen] = useState(false); // Commented out to remove warning
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // const handleEmoji = (e) => { // Commented out to remove warning
    //     setText((prev) => prev + e.emoji);
    //     setOpen(false);
    // };

    const handleSend = () => {
        if (text.trim() !== "") {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text, own: true, timestamp: new Date() }
            ]);
            setText("");
        }
    };

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="./avatar6.png" alt="Profile picture of Esther" />
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
                        {msg.own ? null : <img src="./avatar6.png" alt="" />}
                        <div className="texts">
                            <p>{msg.text}</p>
                            <span>{msg.timestamp.toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
                <div className="endRef" ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./image.png" alt="Attachment icon" />
                    <img src="./camera.png" alt="Camera icon" />
                    <img src="./mic.png" alt="Microphone icon" />
                </div>
                <input
                    type="text"
                    placeholder="Type a Message...."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="emoji">
                    <img
                        src="./emoji.png"
                        alt="Emoji picker"
                        // onClick={() => setOpen((prev) => !prev)} // Commented out to remove warning
                    />
                    <div className="picker">
                        {/* EmojiPicker component */}
                    </div>
                </div>
                <button className="sendButton" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
