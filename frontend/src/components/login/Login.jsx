import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";

const Login = () => {
    const [avatar, setAvatar] = useState ({
        file:null,
        url:""
    })

    const handleAvatar = e =>{
        if(e.target.files[0]){
        setAvatar ({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
    }
    }

    const handleLogin = e =>{
        e.preventDefault()
        
    }

    return (
        <div className="login">
            <div className="item">
                <h3>Welcome Back</h3>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="password" name="password" />
                    <button>Sign in</button>  
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h3>Create an Account</h3>
                <form>
                    <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    Upload Profile Picc </label>
                    <input type="file" id="file" style={{display:"none"}}onChange={handleAvatar}/>
                    <input type="text" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="password" name="password" />
                    <button>Sign up</button>  
                </form>
            </div>
        </div>
    );
};

export default Login;


