import React from 'react';
import wave1 from '../static/CheckBox.png';
import './boxes.css';

const Progress = () => {
    return (
        <div className="progress-container">
            <div className="progress-task-completed-container" style={{ background: "#EFF2FF" }}>
                <div>
                    <img src={wave1} alt="Image 1" />
                </div>
                <div>
                    <p>Task Complete</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <h3 style={{ paddingRight: "3px" }}>50</h3>
                        <p style={{ position: "relative", top: "5px", left: "0px", }}>This week</p>
                    </div>
                </div>
            </div>
            <div className="progress-task-completed-container" style={{ background: "#FFB1B5" }}>
                <div>
                    <img src={wave1} alt="Image 1" />
                </div>
                <div>
                    <p>Task Complete</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <h3 style={{ paddingRight: "3px" }}>50</h3>
                        <p style={{ position: "relative", top: "5px", left: "0px", }}>This week</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;
