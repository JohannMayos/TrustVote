// src/VoteDisplay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VoteDisplay.css';

const VoteDisplay = () => {
  const [publicVotes, setPublicVotes] = useState([]);
  const [privateVotes, setPrivateVotes] = useState([]);
  const [selectedVote, setSelectedVote] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const publicResponse = await axios.get('https://seu-backend.com/api/public-votes');
        const privateResponse = await axios.get('https://seu-backend.com/api/private-votes');
        setPublicVotes(publicResponse.data);
        setPrivateVotes(privateResponse.data);
      } catch (error) {
        console.error('Erro ao buscar votações:', error);
      }
    };

    fetchVotes();
  }, []);

  const handleVote = async (voteId) => {
    try {
      await axios.post(`https://seu-backend.com/api/vote/${voteId}`, { topic: selectedTopic });
      alert('Voto registrado com sucesso!');
      // Atualizar a lista de votações após votar
      const publicResponse = await axios.get('https://seu-backend.com/api/public-votes');
      const privateResponse = await axios.get('https://seu-backend.com/api/private-votes');
      setPublicVotes(publicResponse.data);
      setPrivateVotes(privateResponse.data);
    } catch (error) {
      console.error('Erro ao registrar voto:', error);
    }
  };

  const renderVoteDetails = (vote) => (
    <div className="vote-details">
      <h3>{vote.nome}</h3>
      <p>Tópico com mais votos: {vote.topicoMaisVotado.nome} ({vote.topicoMaisVotado.percentual}%)</p>
      <p>Tempo limite: {new Date(vote.tempoLimite).toLocaleString()}</p>
      <p>Total de votos: {vote.totalVotos}</p>
      <select onChange={(e) => setSelectedTopic(e.target.value)} value={selectedTopic}>
        <option value="" disabled>Escolha um tópico</option>
        {vote.topicos.map((topico) => (
          <option key={topico.nome} value={topico.nome}>{topico.nome}</option>
        ))}
      </select>
      <button onClick={() => handleVote(vote.id)}>Votar</button>
    </div>
  );

  return (
    <div className="vote-display-container">
      <h2>Votações Públicas</h2>
      <div className="votes-list">
        {publicVotes.map((vote) => (
          <div key={vote.id} className="vote-item" onClick={() => setSelectedVote(vote)}>
            <h3>{vote.nome}</h3>
          </div>
        ))}
      </div>

      <h2>Votações Privadas</h2>
      <div className="votes-list">
        {privateVotes.map((vote) => (
          <div key={vote.id} className="vote-item" onClick={() => setSelectedVote(vote)}>
            <h3>{vote.nome}</h3>
          </div>
        ))}
      </div>

      {selectedVote && renderVoteDetails(selectedVote)}
    </div>
  );
};

export default VoteDisplay;
