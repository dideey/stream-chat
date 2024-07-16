import { useState } from "react"
import "./chatList.css"

const ChatList =() => {
    const [addMode,setAddMode] = useState(false)
// jdhdhdhdhdh
    const chatItems = [
        {img: './avatar.png', name: 'Yetunde Adams', msg: 'Hello'},
        {img: './avatar.png', name: 'Timile Ben', msg: 'Hello'},
        {img: './avatar.png', name: 'Imole K.', msg: 'Chimobi!'},
        {img: './avatar.png', name: 'Esther.', msg: 'how are you!'},
        {img: './avatar.png', name: 'jimi.', msg: 'how are you!'},
        {img: './avatar.png', name: 'lusee.', msg: 'how are you!'},
        {img: './avatar.png', name: 'ife.', msg: 'how are you!'},
        {img: './avatar.png', name: 'mark.', msg: 'how are you!'},
        {img: './avatar.png', name: 'veekey.', msg: 'how are you!'},
    ];
    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="search" placeholder="search" />
                </div>
                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt =""
                    className="add"
                    onClick={() => setAddMode ((prev) => !(prev))}
                />
            </div>


            {chatItems.map(obj => {
                return (
                    <div className="item" key={obj.name}>
                        <img src={obj.img} alt="" />
                        <div className="texts">
                            <span>{obj.name}</span>
                            <p>{obj.msg}</p>
                        </div>
                    </div>
                );
            })}
{/* gdhgdghdhdhg */}

            {/* <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Yetude Adams</span>
                    <p>Hello</p>
                </div>

            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Tim Jay</span>
                    <p>Hello</p>
                </div>

            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Timile Ben</span>
                    <p>Hello</p>
                </div>

            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Tim Jay</span>
                    <p>Hello</p>
                </div>

            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Tim Jay</span>
                    <p>Hello</p>
                </div>

            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Tim Jay</span>
                    <p>Hello</p>
                </div>

            </div> */}
        </div>
    )
}

export default ChatList