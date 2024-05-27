// src/CreateVote.js
import React, { useState } from 'react';
import axios from 'axios';
import './CreateVote.css';

const CreateVote = () => {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'publica',
    eleitores: '',
    topicos: '',
    duracao: 5,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, tipo, eleitores, topicos, duracao } = formData;

    // Processando listas de eleitores e tópicos
    const eleitoresList = eleitores.split(',').map((email) => email.trim());
    const topicosList = topicos.split(',').map((topico) => topico.trim());

    const votoData = {
      nome,
      tipo,
      eleitores: eleitoresList,
      topicos: topicosList,
      duracao,
    };

    try {
      const response = await axios.post('https://seu-backend.com/api/create-vote', votoData);
      console.log('Votação criada com sucesso:', response.data);
      // Aqui você pode redirecionar o usuário ou exibir uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao criar votação:', error);
      // Aqui você pode exibir uma mensagem de erro
    }
  };

  return (
    <div className="container">
      <h2>Criar Votação</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="publica">Pública</option>
            <option value="privada">Privada</option>
          </select>
        </div>
        <div>
          <label htmlFor="eleitores">Lista de Eleitores (separados por vírgula):</label>
          <input
            type="text"
            id="eleitores"
            name="eleitores"
            value={formData.eleitores}
            onChange={handleChange}
            required={formData.tipo === 'privada'}
            disabled={formData.tipo === 'publica'}
          />
        </div>
        <div>
          <label htmlFor="topicos">Lista de Tópicos (separados por vírgula):</label>
          <input
            type="text"
            id="topicos"
            name="topicos"
            value={formData.topicos}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="duracao">Duração (minutos):</label>
          <input
            type="number"
            id="duracao"
            name="duracao"
            value={formData.duracao}
            onChange={handleChange}
            min="5"
            max="1440"
            required
          />
        </div>
        <button type="submit">Criar Votação</button>
      </form>
    </div>
  );
};

export default CreateVote;
