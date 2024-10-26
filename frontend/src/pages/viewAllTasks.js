import React, { useEffect, useState } from 'react';
import '../components/taskList/taskList.css';
import TaskBar from '../components/taskBar/taskbar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, setTasks } from '../redux/slice/taskslice';
import { useNavigate } from 'react-router-dom';

function ViewAllTasks() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector((state) => state.taskList.tasks);


    const deleteTasky = async (id) => {
        try {
            const token = localStorage.getItem('authToken-todo');
            const response = await axios.delete(
                `${process.env.REACT_APP_SERVER_PORT}/tasks/deleteTask/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the token in the headers
                    },
                }
            );
            console.log('Task Deleted successfully:', response.data);
            dispatch(deleteTask(id));
        } catch (e) {
            console.log('Caught error while deleting task');
        }
    };

    return (
        <div>
            <div className="task-container-1">
                <p style={{ fontSize: '18px', fontWeight: '600' }}>Tasks Today</p>
                <p
                    style={{ fontSize: '11px', fontWeight: '400', color: 'blue' }}
                    onClick={() => {
                        navigate('/dashboard');
                    }}
                >
                    Go Back
                </p>
            </div>
            <div>
                {tasks
                    .map((item, index) => {
                        if (new Date(item.date).getDate() === new Date().getDate())
                            return <TaskBar task={item} deleteTask={deleteTasky} />;
                    })
                }
            </div>
        </div>
    );
}

export default ViewAllTasks;
