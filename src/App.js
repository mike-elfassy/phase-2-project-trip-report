import React from 'react'
// import logo from './logo.svg';
// import './App.css';
import { Routes, Route } from "react-router-dom";
import Album from './Album'
import NewTrip from './NewTrip'
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <div className="App">
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Trip Report
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
          <Route path="/" element={<Album />} />
          <Route path="/trips/new" element={<NewTrip />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;