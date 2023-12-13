import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import Modal from "react-modal";
import OrderHistoryModal from "./OrderHistoryModal";
import productsData from "../data/products.json";

const Navbar = () => {
  const {
    cart,
    removeFromCart,
    favorites,
    addToFavorites,
    users,
    orders: contextOrders,
    modalFavorites,
  } = useContext(AppContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isOrdersModalOpen, setOrdersModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(contextOrders);
  }, [contextOrders]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleFavoritesToggle = () => {
    setFavoritesOpen(!isFavoritesOpen);
    if (!isFavoritesOpen) {
      setModalOpen(true);
    }
  };

  const handleAddToFavorites = (productId) => {
    addToFavorites(productId);
    setModalOpen(true);
  };

  const handleLoginModalToggle = () => {
    setLoginModalOpen(!isLoginModalOpen);
    setLoginError(false);
  };

  const handleSuccessModalToggle = () => {
    setSuccessModalOpen(!isSuccessModalOpen);
  };

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  const handleOrdersModalToggle = () => {
    setOrdersModalOpen(!isOrdersModalOpen);
  };

  const handleSearch = () => {
    console.log(`Arama Yapılıyor: ${searchTerm}`);
  };

  const handleCheckout = () => {
    const checkoutOrder = {
      id: Math.random(),
      userId: 1,
      products: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      totalPrice: cart.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      ),
      orderDate: new Date().toISOString().slice(0, 10),
    };

    setOrders((prevOrders) => [...prevOrders, checkoutOrder]);
    resetCart();
    setOrdersModalOpen(true);
  };

  const resetCart = () => {};

  const handleLogin = () => {
    const user =
      users &&
      users.find((user) => user.email === email && user.password === password);

    if (user) {
      setIsLoginSuccessful(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setIsLoginSuccessful(false);
    }
    setLoginModalOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#ff7f00",
        height: "70px",
      }}
    >
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaFBpMZBtYYfviU6UrQbqZq3iLbCNqelTb5g&usqp=CAU"
          alt=""
          style={{ width: "auto", height: "69px", paddingLeftLeft: "0px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
      >
        <div>
          <input
            type="text"
            placeholder="Aradığınız ürün, kategori veya markayı yazınız"
            style={{
              width: "350px",
              marginRight: "20px",
              textAlign: "center",
              height: "30px",
              border: "none",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            style={{
              marginRight: "300px",
              borderRadius: "20%",
              color: "#ff7f00",
              border: "none",
              backgroundColor: "white",
            }}
          >
            Ara
          </button>
        </div>
        <button
          style={{
            marginRight: "30px",
            borderRadius: "20%",
            backgroundColor: "#ff7f00",
            border: "none",
            color: "white",
          }}
          onClick={handleOrdersModalToggle}
        >
          Siparişlerim
        </button>
        {/* <button style={{ marginRight: '30px', borderRadius:'20%' }}>Favorilerim</button> */}
        <button
          style={{
            marginRight: "30px",
            borderRadius: "20%",
            backgroundColor: "#ff7f00",
            border: "none",
            color: "white",
          }}
          onClick={handleFavoritesToggle}
        >
          Favorilerim ({modalFavorites ? modalFavorites.length : 0})
        </button>
        {/* ... diğer kodlar */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalToggle}
          // ... (other styling)
        >
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex" }}>
              <h2 style={{ paddingRight: "55px" }}>Favorilerim</h2>
              <button
                onClick={handleModalToggle}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: "Red",
                  width: "30px",
                  height: "30px",
                  fontSize: "20px",
                }}
              >
                X
              </button>
            </div>
            <hr></hr>
            {modalFavorites &&
              modalFavorites.map((productId) => {
                const product = productsData.products.find(
                  (product) => product.id === productId
                );
                return (
                  <div key={productId} style={{ display: "flex" }}>
                    <img
                      style={{ width: "50px" }}
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <p style={{ margin: "10px", padding: "10px" }}>
                      Ürün Adı: {product.name}
                    </p>
                    <p style={{ margin: "10px", padding: "10px" }}>
                      Ürün Fiyatı: {product.price} TL
                    </p>
                  </div>
                );
              })}
          </div>
        </Modal>
        <div
          onMouseEnter={handleDropdownToggle}
          onMouseLeave={handleDropdownToggle}
          style={{ position: "relative" }}
        >
          <button
            style={{
              marginRight: "50px",
              borderRadius: "20%",
              backgroundColor: "#ff7f00",
              border: "none",
              color: "white",
            }}
          >
            Sepetim ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                width: "250px",
                background: "#fff",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                zIndex: 1,
              }}
            >
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "5px",
                    }}
                  >
                    <div>
                      <span>
                        {item.product.name} - Adet: {item.quantity} -{" "}
                        {item.product.price} TL
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "20%",
                        height: "40px",
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <hr></hr>
              <p>
                Toplam Tutar:{" "}
                {cart.reduce(
                  (total, item) => total + item.quantity * item.product.price,
                  0
                )}{" "}
                TL
              </p>
              <button
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  borderRadius: "10% ",
                  marginLeft: "100px",
                }}
              >
                Satın Al
              </button>
            </div>
          )}
        </div>
        <button
          onClick={handleLoginModalToggle}
          style={{ backgroundColor: "#ff7f00", border: "none", color: "white" }}
        >
          Giriş Yap
        </button>

        <Modal
          isOpen={isLoginModalOpen}
          onRequestClose={handleLoginModalToggle}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "300px",
              margin: "auto",
              marginTop: "100px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <div>
            <h2>Giriş Yap</h2>
            <hr />
            <p>E-mail:</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Şifre:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button className="btn btn-success" onClick={handleLogin}>
              Giriş Yap
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={isSuccessModalOpen}
          onRequestClose={handleSuccessModalToggle}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "250px",
              height: "200px",
              margin: "auto",
              marginTop: "150px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              color: "green",
            },
          }}
        >
          <div>
            <h2 style={{ marginTop: "50px" }}>
              {loginError ? "Giriş Başarılı" : "Giriş Başarılı"}
            </h2>
            {loginError && (
              <p
                onClick={handleSuccessModalToggle}
                style={{ cursor: "pointer" }}
              ></p>
            )}
          </div>
        </Modal>
        <OrderHistoryModal
          isOpen={isOrdersModalOpen}
          onRequestClose={handleOrdersModalToggle}
          orders={orders}
        />
      </div>
    </div>
  );
};

export default Navbar;
