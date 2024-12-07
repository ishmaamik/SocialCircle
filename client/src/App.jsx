import HomePage from './pages/HomePage/Home';
import Profile from './pages/ProfilePage/Profile';
import LoginPage from './pages/LoginPage/Login';
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
    <div className="App">
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
