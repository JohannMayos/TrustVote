// src/Home.js
import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('publicas');

  const votacoesPublicas = [
    'Votação Pública 1',
    'Votação Pública 2',
    'Votação Pública 3',
  ];

  const votacoesPrivadas = [
    'Votação Privada 1',
    'Votação Privada 2',
    'Votação Privada 3',
  ];

  return (
    <div className="home-container">
      <h2>Home</h2>
      <div className="tabs">
        <button
          className={activeTab === 'publicas' ? 'active' : ''}
          onClick={() => setActiveTab('publicas')}
        >
          Votações Públicas
        </button>
        <button
          className={activeTab === 'privadas' ? 'active' : ''}
          onClick={() => setActiveTab('privadas')}
        >
          Votações Privadas
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'publicas' && (
          <div>
            <h3>Votações Públicas em Andamento</h3>
            <ul>
              {votacoesPublicas.map((votacao, index) => (
                <li key={index}>{votacao}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'privadas' && (
          <div>
            <h3>Votações Privadas em Andamento</h3>
            <ul>
              {votacoesPrivadas.map((votacao, index) => (
                <li key={index}>{votacao}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
