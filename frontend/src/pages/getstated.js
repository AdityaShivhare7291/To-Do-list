import React from "react"
import wave1 from "../static/wave1.png"
import wave2 from "../static/wave2.png"
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/login.js";
import { useState } from "react";

function GetStarted() {
    const Navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log("User logged in");
        setModalOpen(false); // Close the modal after login
    };

    return <>
        <div style={{ position: "relative", width: "100%" }}>
            <div style={{ backgroundColor: "#4566EC", width: "100%", height: "100vh", position: "relative", zIndex: 1 }}>
                <img
                    src={wave1}
                    alt="Left Image"
                    style={{ position: "absolute", left: "0", top: "125px", width: "100px", height: "auto" }}
                />

                {/* Right image, positioned 250px below the top */}
                <img
                    src={wave2}
                    alt="Right Image"
                    style={{ position: "absolute", right: "0", top: "250px", width: "100px", height: "auto" }}
                />
            </div>
            <div style={{ backgroundColor: "#FFFFFF", width: "100%", height: "292px", position: "absolute", bottom: "0", zIndex: 2 }}>
                <div style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}> {/* Added padding */}
                    <h1 style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        fontSize: "24px"
                    }}>
                        Manage What To Do
                    </h1>
                    <p style={{ marginTop: "10px" }}> {/* Added margin for spacing */}
                        The best way to manage what you have to do, don't forget your plans.
                    </p>
                    <button
                        onClick={() => setModalOpen(true)}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#4566EC",
                            color: "#FFFFFF",
                            width: "100%",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            marginTop: "20px" // Spacing above the button
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div >
        <LoginModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)} // Close modal function
            onSubmit={handleLoginSubmit} // Handle submit
        />
    </>
}

export default GetStarted;