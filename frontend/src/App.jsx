import React from "react";
import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Detail from "./components/detail/Detail"; // Corrected import for Detail
// import Stories from "./components/stories/Stories";
// import SettingsPage from "./components/settings/SettingsPage"; // Import statement fixed for SettingsPage
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification";
import "./App.css"; // Assuming you have a CSS file for global styles or additional styling

const App = () => {

  const user = true;
  // Sample data for Stories (commented out since Stories component is not used)
  // const sampleStories = [
  //   { id: 1, isNew: true, image: 'image1.jpg' },
  //   { id: 2, isNew: false, image: 'image2.jpg' },
  //   // Add more sample stories as needed
  // ];

  // const handleAddStory = () => {
  //   // Logic for adding a new story
  // };

  return (
    <div className="container">
      {
        user ? (
          <>
            <List />
            <Chat />
            <Detail />
          </>
        ) : (
          <Login /> // Assuming you have a Login component
        )
      }
      <Notification />
      {/* Commented out Stories and SettingsPage components */}
      {/* <SettingsPage /> */}
      {/* <Stories stories={sampleStories} onAddStory={handleAddStory} /> */}
    </div>
  );
};

export default App;
