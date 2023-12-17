/* eslint-disable react/prop-types */
import './styles.livro.css'
function Livro({titulo, autor, ano="Desconhecido"  }) {
  
  return (
    <div className="livro">
      <h3>Titulo:</h3>
      <p className='titulo'>{titulo}</p>
      <hr />
      <h4>Autor:</h4>
      <p>{autor}</p>
      <hr />
      <h4>Ano:</h4>
      <p>{ano}</p>
    </div>
  );
}export default Livro;  // Exporta o componente Livro para ser usado em outros arquivos