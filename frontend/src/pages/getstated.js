import React, { useState } from "react";
import LoginModal from "../components/login";  // Adjust the path accordingly
import SignUpModal from "../components/signup"; // Adjust the path accordingly
import wave1 from "../static/wave1.png";
import wave2 from "../static/wave2.png";
import { useNavigate } from "react-router-dom";

function GetStarted() {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isSignUpOpen, setSignUpOpen] = useState(false);
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        setLoginOpen(false);
        navigate('/dashboard'); // Navigate to home after login
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        setSignUpOpen(false);
        navigate('/dashboard'); // Navigate to home after signup
    };

    const onSignUp = (e) => {
        e.preventDefault();
        setLoginOpen(false);
        setSignUpOpen(true);
    }

    return (
        <>
            <div style={{ position: "relative", width: "100%" }}>
                <div style={{ backgroundColor: "#4566EC", width: "100%", height: "100vh", position: "relative", zIndex: 1 }}>
                    <img
                        src={wave1}
                        alt="Left Image"
                        style={{ position: "absolute", left: "0", top: "125px", width: "100px", height: "auto" }}
                    />
                    <img
                        src={wave2}
                        alt="Right Image"
                        style={{ position: "absolute", right: "0", top: "250px", width: "100px", height: "auto" }}
                    />
                </div>
                <div style={{ backgroundColor: "#FFFFFF", width: "100%", height: "292px", position: "absolute", bottom: "0", zIndex: 2 }}>
                    <div style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}>
                        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold", fontSize: "24px" }}>
                            Manage What To Do
                        </h1>
                        <p style={{ marginTop: "10px" }}>
                            The best way to manage what you have to do, don't forget your plans.
                        </p>
                        <button
                            onClick={() => setLoginOpen(true)}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#4566EC",
                                color: "#FFFFFF",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                width: "100%",
                                marginTop: "20px",
                            }}
                        >
                            Get Started
                        </button>

                    </div>
                </div>
            </div>

            {/* Modals */}
            <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onSubmit={handleLoginSubmit} onSignUp={onSignUp} />
            <SignUpModal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} onSubmit={handleSignUpSubmit} />
        </>
    );
}

export default GetStarted;
