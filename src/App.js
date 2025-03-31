import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './commons/Layout/index.js';
import Home from './pages/MainPage/index.jsx';
import Auth from './pages/LoginPage/index.js'
import SignUpPage from './pages/SignUpPage/index.js'
import CreateMeetingForm from './pages/MeetingSetupPage/index.js'
import ChatRoom from './pages/ChatPage/index.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/chat" element={<Layout><ChatRoom /></Layout>} />
          <Route path="/auth" element={<Layout><Auth /></Layout>} />
          <Route path="/auth/signup" element={<Layout><SignUpPage/></Layout>} />
          <Route path="/meeting/setup" element={<Layout><CreateMeetingForm></CreateMeetingForm></Layout>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
