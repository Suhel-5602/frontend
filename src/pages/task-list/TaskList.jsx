import React, { useEffect, useState } from 'react'
import "./TaskList.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskList() {
    const [TaskList, setTaskList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTaskList();
    }, []);
    const handleNavigate = (path) => {
        navigate(path);
    }

    const getTaskList = async () => {
        try {
            const response = await axios.get("http://localhost:5000/task");
            setTaskList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTaskEdit = (taskId) => {
        navigate(`/edit-task/${taskId}`);
    };

    const handleTaskDelete = async (taskId) => {
        if (window.confirm("Are you sure want to delete this task?")) {
            try {
                const response = await axios.delete(
                    `http://localhost:5000/task/${taskId}`
                );
                alert(response.data);
                getTaskList();
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <div className='tasks-container'>
            <div className='tasks-header'>
                <h3>All Tasks</h3>
                <button onClick={() => handleNavigate("/create-task")}>
                    Create task
                </button>
            </div>
            <div className='tasks-body'>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Discription</th>
                            <th>status</th>
                            <th>deadline</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TaskList.map((task) => {
                            return (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.discription}</td>
                                    <td>{task.status}</td>
                                    <td>{task.deadline}</td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleTaskEdit(task._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleTaskDelete(task._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TaskList