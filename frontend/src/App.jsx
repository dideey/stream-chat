import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Detail from "./components/chat/Chat";
import Stories from "./components/stories/Stories";
import SettingsPage from "./components/settings/SettingsPage";

const App = () =>{
  return (
    <div className='container'>
      <List/>
      <Chat/>
      <Detail/>
	<Settings/>
	<Stories/>

    </div>
  )

  }

export default App
