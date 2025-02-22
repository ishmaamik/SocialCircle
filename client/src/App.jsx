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
function App() {
  
  const mode= useSelector((state)=> state.auth.mode)
  const theme= useMemo(()=> createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app" >
      <ThemeProvider theme={theme}>
        {/* <CssBaseline/> */}
     <BrowserRouter >
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/topbar' element={<Topbar/>}/>
        </Routes>
     </BrowserRouter>
     </ThemeProvider>
    </div>
  );
}

export default App;
