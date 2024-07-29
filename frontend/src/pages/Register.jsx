import React from "react";
import Add from "../img/avatar6.png"

const Register = () => {
    return (
        <div className="formcontainer">
            <div className="formwrapper">
            <span className="login">Stream Chat</span>
            <span className="title">Register</span>
            <form>
                <input type="text" placeholder="display name" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <input style={{display:"none"}} type="file" id="file"/>
                <label htmlfor = "file">
                    <img src= {Add} alt="" />
                    <span>Add an Avater</span>
                </label>
                <button>sign up</button>
            </form>
            <p>you do have an account? log in</p>
            </div>
        </div>
    )
}

export default Register