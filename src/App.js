// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import CreateVote from './CreateVote';
import VoteDisplay from './VoteDisplay';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/register">Cadastro</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/create-vote">Criar Votação</Link></li>
            <li><Link to="/vote-display">Exibir Votações</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-vote" element={<CreateVote />} />
          <Route path="/vote-display" element={<VoteDisplay />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
