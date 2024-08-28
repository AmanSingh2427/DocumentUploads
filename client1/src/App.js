import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm type="signup" onSubmit={(data) => console.log('Sign Up:', data)} />} />
        <Route path="/login" element={<AuthForm type="login" onSubmit={(data) => console.log('Login:', data)} />} />
        {/* Add other routes as needed */}
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
