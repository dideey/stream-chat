import Chat from "./components/chat/Chat";
import List from "./components/list/List";
<<<<<<< HEAD
import Detail from "./components/detail/Detail";
=======
import Detail from "./components/chat/Chat";
import Stories from "./components/stories/Stories";
import SettingsPage from "./components/settings/SettingsPage";
>>>>>>> b0c9db33af04d95b12c746fcd78cbc8101c37331

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
