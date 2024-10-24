import React from "react";

const LoginModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <div style={styles.inputGroup}>
                        <label>Email:</label>
                        <input type="email" required style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Password:</label>
                        <input type="password" required style={styles.input} />
                    </div>
                    <button type="submit" style={styles.submitButton}>Submit</button>
                </form>
                <button onClick={onClose} style={styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

// Styles for modal
const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        width: "300px",
    },
    inputGroup: {
        marginBottom: "10px",
    },
    input: {
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    submitButton: {
        padding: "10px 20px",
        backgroundColor: "#4566EC",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        width: "100%",
    },
    closeButton: {
        marginTop: "10px",
        padding: "5px 10px",
        border: "none",
        backgroundColor: "red",
        color: "#FFFFFF",
        cursor: "pointer",
    },
};

export default LoginModal;
