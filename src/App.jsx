import React, { useState, useEffect } from 'react';
import './App.css';
import Livro from './components/Livro';

function App() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const response = await fetch('https://serverapi.jhonnatasribeir.repl.co/livros');

        if (!response.ok) {
          throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setLivros(data);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      }
    };

    carregarLivros();
  }, []); // Remova [livros] como dependência

  const cadastrarLivro = async () => {
    try {
      const response = await fetch('https://serverapi.jhonnatasribeir.repl.co/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, autor }),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setLivros((livros) => [...livros, data]);

      setTitulo('');
      setAutor('');
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error.message);
    }
  };

  const deletarLivro = async (livroId) => {
    try {
      const response = await fetch(`https://serverapi.jhonnatasribeir.repl.co/livros/${livroId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      setLivros((livros) => livros.filter((livro) => livro.id !== livroId));
    } catch (error) {
      console.error('Erro ao deletar livro:', error.message);
    }
  };

  return (
    <div>
      <h1>Cadastrar Livro</h1>
      <form>
        <label htmlFor="titulo">Titulo:</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />
        <label htmlFor="autor">Autor:</label>
        <input
          type="text"
          id="autor"
          value={autor}
          onChange={(event) => setAutor(event.target.value)}
        />
        <button type="button" onClick={cadastrarLivro}>
          Cadastrar
        </button>
        {titulo && autor ? (
          <p>
            <strong>Titulo:</strong> {titulo} <strong>Autor:</strong> {autor}
          </p>
        ) : (
          <p>Preencha os campos acima para cadastrar um novo livro</p>
        )}
      </form>
      <h1>Todos os Livros</h1>
      <div className="todosOsLivros">
        {livros.map((livro) => (
          <div key={livro.id}>
            <Livro titulo={livro.titulo} autor={livro.autor} />
            <button type="button" onClick={() => deletarLivro(livro.id)}>
              Deletar Livro
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
