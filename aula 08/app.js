import React, { useState, useEffect } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

function Produto({ produto, adicionarAoCarrinho }) {
  return (
    <div className="produto">
      <img src={produto.imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>Preço: R${produto.preco.toFixed(2)}</p>
      <p>Validade: {produto.validade}</p>
      <p>Corredor: {produto.corredor} | Gôndola: {produto.gondola}</p>
      {produto.promocao && <span className="promocao">Promoção!</span>}
      <button onClick={() => adicionarAoCarrinho(produto)}>Comprar</button>
    </div>
  );
}

function Carrinho({ carrinho, removerDoCarrinho }) {
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco, 0).toFixed(2);
  };

  return (
    <div className="carrinho">
      <h2>Carrinho de Compras</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map((item, index) => (
            <div key={index} className="item-carrinho">
              <p>{item.nome} - R${item.preco.toFixed(2)}</p>
              <button onClick={() => removerDoCarrinho(index)}>Remover</button>
            </div>
          ))}
          <h3>Total: R${calcularTotal()}</h3> {/* Mostra o preço total */}
        </>
      )}
    </div>
  );
}

function Promocoes() {
  const [promocoes, setPromocoes] = useState([]);

  useEffect(() => {
    setPromocoes([
      { id: 1, descricao: "Leve 3, pague 2 em produtos de limpeza!" },
      { id: 2, descricao: "10% de desconto em frutas frescas." },
    ]);
  }, []);

  return (
    <div className="promocoes">
      <h2>Oportunidades de Promoção</h2>
      <ul>
        {promocoes.map((promo) => (
          <li key={promo.id}>{promo.descricao}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [produtos, setProdutos] = useState([
    {
      nome: "Maçã",
      preco: 2.99,
      validade: "15/10/2024",
      corredor: 4,
      gondola: 2,
      imagem: "https://via.placeholder.com/150",
      promocao: true,
    },
    {
      nome: "Leite",
      preco: 4.59,
      validade: "10/11/2024",
      corredor: 7,
      gondola: 3,
      imagem: "https://via.placeholder.com/150",
      promocao: false,
    },
    {
      nome: "Arroz",
      preco: 18.99,
      validade: "20/12/2024",
      corredor: 5,
      gondola: 1,
      imagem: "https://via.placeholder.com/150",
      promocao: false,
    },
    {
      nome: "Banana",
      preco: 3.49,
      validade: "12/10/2024",
      corredor: 4,
      gondola: 2,
      imagem: "https://via.placeholder.com/150",
      promocao: true,
    },
  ]);

  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  return (
    <div className="app">
      <div className="produtos">
        {produtos.map((produto, index) => (
          <Produto key={index} produto={produto} adicionarAoCarrinho={adicionarAoCarrinho} />
        ))}
      </div>
      <Carrinho carrinho={carrinho} removerDoCarrinho={removerDoCarrinho} />
      <Promocoes />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
