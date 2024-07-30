import React from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";

const Input = ({ message, setMessage, img, setImg, onSend }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={handleKeyPress}
      />
      <div className="send">
        <img src={Attach} alt="Attach file" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="Add image" />
        </label>
        <button onClick={onSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
