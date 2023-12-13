import React, { useContext } from "react";
import { AppContext } from "../App";

const Body = () => {
  const { products, addToCart, addToFavorites } = useContext(AppContext);

  const chunkArray = (arr, size) => {
    return arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );
  };

  const chunkedProducts = chunkArray(products, 3);

  // Çok satanlar için rastgele bir ürün seç
  const getRandomProduct = () => {
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  };

  // Çok satanlar için rastgele ürünü al
  const bestSellers = [
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h2>Ürünler</h2>
      <div className="row g-4">
        {/* Ürün kartları - 9 grid */}
        <div className="col-md-9">
          {chunkedProducts.map((chunk, index) => (
            <div key={index} className="row row-cols-1 row-cols-md-3 g-4">
              {chunk.map((product) => (
                <div key={product.id} className="col mb-4">
                  <div className="card h-100">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.price} TL</p>
                      <p className="card-text">{product.description}</p>
                      <div style={{ color: "gray", fontSize: "12px", marginTop: "0", paddingTop: "0" }}>
                        <p className="card-text">{product.size}</p>
                        <p className="card-text">
                          Favori Sayısı: {product.favorites}
                        </p>
                      </div>
                      <div style={{ display: 'flex'}}>
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                        style={{backgroundColor: "orange", border: 'none', height: '40px', paddingRight: '10px', marginRight:'20px'}}  
                      >
                        Sepete Ekle
                      </button>
                      
                      <button
  className="btn btn-primary"
  onClick={() => addToFavorites(product.id)}
  style={{ backgroundColor: "orange", border: 'none', color: 'white' }}
>
  <i className="far fa-heart"></i>
  Favorilere Ekle
</button>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Çok Satanlar Alanı - 3 grid */}
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Çok Satanlar</h5>
              <div className="col-md-12">
                {bestSellers.map((product) => (
                  <div key={product.id}>
                    <div className="card h-100" style={{ display: "flex" }}>
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                        style={{
                          height: "100px",
                          width: '140px',
                          // width: "80px",
                          paddingLeft: "80px",
                          
                        }}
                      />
                      <div>
                        <h6 className="card-title">{product.name}</h6>
                        <p className="card-text" style={{ paddingTop: "0px" }}>
                          {product.description}
                        </p>
                        <p className="card-text" style={{ padding: "0px" }}>
                          {product.price} TL
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
