import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AddTask = ({ isOpen, onClose }) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [taskDate, setTaskDate] = useState(null);
    const [description, setDescription] = useState(null);

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2>Add New Task</h2>
                    <FontAwesomeIcon
                        icon={faTimes}
                        style={styles.closeIcon}
                        onClick={onClose}
                    />
                </div>
                <form>
                    <div style={styles.inputGroup}>
                        <label>Task title:</label>
                        <input type="text" required style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Password:</label>
                        <input type="password" required style={styles.input} />
                    </div>

                    {/* Start Time */}
                    <div style={styles.inputGroup}>
                        <label>Start Time:</label>
                        <Flatpickr
                            value={startTime}
                            onChange={(date) => setStartTime(date[0])}
                            options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "h:i K", // 12-hour format
                                time_24hr: false,
                            }}
                            style={styles.input}
                        />
                    </div>

                    {/* End Time */}
                    <div style={styles.inputGroup}>
                        <label>End Time:</label>
                        <Flatpickr
                            value={endTime}
                            onChange={(date) => setEndTime(date[0])}
                            options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "h:i K", // 12-hour format
                                time_24hr: false,
                            }}
                            style={styles.input}
                        />
                    </div>

                    {/* Task Date */}
                    <div style={styles.inputGroup}>
                        <label>Task Date:</label>
                        <Flatpickr
                            value={taskDate}
                            onChange={(date) => setTaskDate(date[0])}
                            options={{
                                dateFormat: "Y-m-d", // Year-Month-Day format
                            }}
                            style={styles.input}
                        />
                    </div>

                    {/* Description Field */}
                    <div style={styles.inputGroup}>
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={styles.textarea}
                            placeholder="Enter task details..."
                        />
                    </div>

                    <button type="submit" style={styles.submitButton}>Submit</button>
                </form>
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
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    closeIcon: {
        cursor: "pointer",
        fontSize: "20px",
        color: "red",
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
};

export default AddTask;
