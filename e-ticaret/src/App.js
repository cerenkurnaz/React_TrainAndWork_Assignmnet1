import React, { createContext, useState } from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import productsData from './data/products.json';
import ReactDOM from 'react-dom'



export const AppContext = createContext();


const App = () => {
    
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(productsData.products);
  const [users, setUsers] = useState(productsData.users);
  const [favorites, setFavorites] = useState([]);
  const [modalFavorites, setModalFavorites] = useState([]);
  

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const addToFavorites = (productId) => {
    console.log(productId);
    if (!favorites.includes(productId)) {
      setFavorites((prevFavorites) => [...prevFavorites, productId]);
      setModalFavorites((prevModalFavorites) => [...prevModalFavorites, productId]);
    } else {
      setModalFavorites((prevModalFavorites) =>
        prevModalFavorites.filter((id) => id !== productId)
      );
    }
  
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, favorites: (product.favorites || 0) + 1 }
          : product
      )
    );
  };
  


  return (
    
    <AppContext.Provider
      value={{ cart, addToCart, removeFromCart, products, addToFavorites, favorites }}
    >
      <div>
        <Navbar />
        <Body addToFavorites={{addToFavorites}}/>
      </div>
    </AppContext.Provider>
  );
};

export default App;
