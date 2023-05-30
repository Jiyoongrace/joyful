import React from "react";

const Button = ({ text, bgcolor }) => {
    return (
        <button
        style={{
            backgroundColor: bgcolor ? "#ffffff" : "#7C8FFF",
            color: "white",
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: 10,
            boxShadow: "0px 1px 1px #000000",
            color: "rgba(255, 255, 255, 0.78)",
            border: "0.2px solid #001392",
            marginTop: "150px",
        }}
        >
            {text}
        </button>
    );
}

export default Button
