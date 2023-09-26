import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import Home from './pages/Home';
import Header from './topBar/header';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import { useContext } from 'react';
import { Context } from './context/Context';


function App() {
  const {user}= useContext(Context);
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home/> :<Register />} />
        <Route path="/login" element={user ? <Home/> :<Login/>} />
        <Route path="/write" element={user ? <Write/> :<Register/>} />
        <Route path="/settings" element={user ? <Settings/> :<Register/>} />
        <Route path="/post/:postId" element={user ? <Single/> :<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
