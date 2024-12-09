import HomePage from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import LoginPage from './Pages/Login/Login.jsx';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {ThemeProvider, CssBaseline} from '@mui/material'
import {createTheme} from '@mui/material';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from './theme';

function App() {
  
  const mode= useSelector((state)=> state.auth.mode)
  const theme= useMemo(()=> createTheme(themeSettings(mode)), [mode])
  return (
    <div className="App" style={{overflowX:'hidden', overflowY:'hidden', height:'100vh'}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
     <BrowserRouter >
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/profile/:username' element={<Profile/>}/>
        </Routes>
     </BrowserRouter>
     </ThemeProvider>
    </div>
  );
}

export default App;
