const ChatComponent = ({ onSelectChat }) => {
    const handleClick = () => {
        console.log(onSelectChat); // Check if this logs the function
        const chatId = 1; // Example chat ID
        if (typeof onSelectChat === 'function') {
            onSelectChat(chatId);
        } else {
            console.error('onSelectChat is not a function');
        }
    };

    return (
        <div onClick={handleClick}>
            Select Chat
        </div>
    );
};

