import React, { useState } from "react";
import "./chat.css"
import EmojiPicker from "emoji-picker-react"
const Chat =() => {
    const [open,setOpen] =useState(false)
    const [text, setText] = useState("alpha");
    const handleEmoji =e => {
        setText((prev) => prev + e.emoji);
        setOpen(false)
    };

    console.log(text)
    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Tim Jay</span>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texrs">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et 
                        incidunt quibusdam tenetur dignissimos! Deleniti suscipit numquam nihil tempora eos
                        doloremque maiores iusto, voluptatem officia? Eius quia
                        ullam commodi mollitia corrupti.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message 0wn">
                    <div className="texrs">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et 
                        incidunt quibusdam tenetur dignissimos! Deleniti suscipit numquam nihil tempora eos
                        doloremque maiores iusto, voluptatem officia? Eius quia
                        ullam commodi mollitia corrupti.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texrs">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et 
                        incidunt quibusdam tenetur dignissimos! Deleniti suscipit numquam nihil tempora eos
                        doloremque maiores iusto, voluptatem officia? Eius quia
                        ullam commodi mollitia corrupti.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texrs">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et 
                        incidunt quibusdam tenetur dignissimos! Deleniti suscipit numquam nihil tempora eos
                        doloremque maiores iusto, voluptatem officia? Eius quia
                        ullam commodi mollitia corrupti.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texrs">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et 
                        incidunt quibusdam tenetur dignissimos! Deleniti suscipit numquam nihil tempora eos
                        doloremque maiores iusto, voluptatem officia? Eius quia
                        ullam commodi mollitia corrupti.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texrs">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et 
                        incidunt quibusdam tenetur dignissimos! Deleniti suscipit numquam nihil tempora eos
                        doloremque maiores iusto, voluptatem officia? Eius quia
                        ullam commodi mollitia corrupti.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./image.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type='text' placeholder="Type a Message...."
                value={text}
                onChange={e=>setText(e.target.value)}/>
                <div className="emoji">
                    <img src="./emoji.png" 
                    alt="" 
                    onClick={() => setOpen((prev) => !(prev))}
                    />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    )
}

export default Chat
