import HomePage from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import LoginPage from './Pages/Login/Login.jsx';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {ThemeProvider, CssBaseline} from '@mui/material'
import {createTheme} from '@mui/material';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import Topbar from "../src/components/Topbar/TopBar.jsx"
import Login from './Pages/Form/Login/Login.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
  
  const mode= useSelector((state)=> state.auth.mode)
  const theme= useMemo(()=> createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app" >
      <ThemeProvider theme={theme}>
        {/* <CssBaseline/> */}
        <GoogleOAuthProvider clientId='834068887309-co7og1fue3ue1okbuq0tjpa9k5l8ut5s.apps.googleusercontent.com'>
     <BrowserRouter >
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/topbar' element={<Topbar/>}/>
        </Routes>
     </BrowserRouter>
     </GoogleOAuthProvider>
     </ThemeProvider>
    </div>
  );
}

export default App;
