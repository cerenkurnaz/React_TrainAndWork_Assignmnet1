import React from "react";
import Modal from "react-modal";

const OrderHistoryModal = ({ isOpen, onRequestClose, orders = [] }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "700px",
          margin: "auto",
          marginTop: "100px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <div>
        <div style={{ display: "flex" }}>
          <h2>Sipariş Geçmişi</h2>
          <button
            style={{
              marginLeft: "400px",
              backgroundColor: "white",
              color: "red",
              border: "none",
              fontSize: "20px",
            }}
            onClick={onRequestClose}
          >
            X
          </button>
        </div>
        <hr></hr>
        {orders.length === 0 ? (
          <p>
<table>
  <tr>
    <th>Sipariş No</th>
    <th>Ürünler</th>
    <th>Tutar</th>
    <th>Tarih</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Antrasit Kaşe Kaban</td>
    <td>950 TL</td>
    <td>12.01.2023</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Antrasit Ceket</td>
    <td>639 TL</td>
    <td>12.01.2023</td>
  </tr>


</table>
           </p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <p>Sipariş ID: {order.id}</p>
                <p>Toplam Tutar: {order.totalPrice} TL</p>
                <p>Sipariş Tarihi: {new Date(order.orderDate).toLocaleDateString()}</p>
                {order.products && order.products.length > 0 && (
                  <ul>
                    {order.products.map((product) => {
                      return (
                        <li key={product.productId}>
                          <p>
                            Ürün Adı: {product.name}, Adet: {product.quantity}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default OrderHistoryModal;
