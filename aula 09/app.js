import React, { useState } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

function Produto({ produto, adicionarComentario }) {
  const [comentario, setComentario] = useState("");
  
  const handleComentario = () => {
    if (comentario.trim()) {
      adicionarComentario(produto.id, comentario);
      setComentario("");
    }
  };

  return (
    <div className="produto">
      <img src={produto.imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>Preço: R${produto.preco.toFixed(2)}</p>

      {/* Seção de vídeo */}
      <video controls>
        <source src={produto.video} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>

      {/* Seção de comentários */}
      <div className="comentarios">
        <h4>Comentários</h4>
        <ul>
          {produto.comentarios.map((coment, index) => (
            <li key={index}>{coment}</li>
          ))}
        </ul>
        <textarea
          placeholder="Deixe seu comentário"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
        <button onClick={handleComentario}>Enviar Comentário</button>
      </div>
    </div>
  );
}

function App() {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "Maçã",
      preco: 2.99,
      imagem: "https://via.placeholder.com/150",
      video: "https://www.w3schools.com/html/mov_bbb.mp4", // URL do vídeo de demonstração
      comentarios: [],
    },
    {
      id: 2,
      nome: "Leite",
      preco: 4.59,
      imagem: "https://via.placeholder.com/150",
      video: "https://www.w3schools.com/html/mov_bbb.mp4", // URL do vídeo de demonstração
      comentarios: [],
    },
    {
      id: 3,
      nome: "Arroz",
      preco: 18.99,
      imagem: "https://via.placeholder.com/150",
      video: "https://www.w3schools.com/html/mov_bbb.mp4", // URL do vídeo de demonstração
      comentarios: [],
    },
  ]);

  const adicionarComentario = (produtoId, comentario) => {
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) =>
        produto.id === produtoId
          ? { ...produto, comentarios: [...produto.comentarios, comentario] }
          : produto
      )
    );
  };

  return (
    <div className="app">
      <div className="produtos">
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            produto={produto}
            adicionarComentario={adicionarComentario}
          />
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
