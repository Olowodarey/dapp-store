import React from "react";

type Item = {
  productname: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        color: "white",
        borderRadius: "16px",
        padding: "20px",
        margin: "10px",
        width: "250px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            backgroundColor: "#333",
            height: "150px",
            borderRadius: "8px",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={item.imageUrl || "https://via.placeholder.com/150"}
            alt={item.productname}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          {item.productname}
        </h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
          ${item.price.toFixed(2)}
        </p>
        <p style={{ fontSize: "1rem", color: "#aaa" }}>
          Quantity: {item.quantity}
        </p>
        <p style={{ fontSize: "0.9rem", marginTop: "15px", color: "#ccc" }}>
          High-quality product description here.
        </p>
      </div>
      <button
        style={{
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default ItemCard;
