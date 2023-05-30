import React from 'react'
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
// React Components
import Album from './Album'
import NewTrip from './NewTrip'
import TripDetail from './TripDetail';
import EditTrip from './EditTrip';
import StickyFooter from './StickyFooter';
// Material UI Components
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function App() {
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
        <Route path="/trips/:id" element={<TripDetail />} />
        <Route path="/trips/:id/edit" element={<EditTrip />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <StickyFooter />
    </div>
  );
}