const { useState } = React;

const products = [
  { id: 1, name: 'Product 1', price: 10, image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Product 2', price: 20, image: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Product 3', price: 30, image: 'https://via.placeholder.com/50' }
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    const updatedTotal = total + product.price;
    setCart(updatedCart);
    setTotal(updatedTotal);
  };

  return (
    <div className="container">
      <h1>React Shopping Cart</h1>
      <div>
        {products.map(product => (
          <div key={product.id} className="product">
            <div className="product-info">
              <img src={product.image} alt={product.name} />
              <span>{product.name}</span>
            </div>
            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart - ${product.price}</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
        <div className="cart-total">Total: ${total}</div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
