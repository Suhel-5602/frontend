import React, { useEffect, useState } from 'react'
import './CreateTask.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CreateTask() {
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [status, setStatus] = useState("");
    const [deadline, setDeadline] = useState("");

    const [isEdit, setIsEdit] = useState(false);
    const params = useParams();

    useEffect(() => {
        if (params && params.id) {
            getTaskById(params.id);
        } else {
            setIsEdit(false);
        }
    }, [params]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title: title,
            discription: discription,
            status: status,
            deadline: deadline
        };

        try {
            let response;
            if (isEdit) {
                response = await axios.put(`http://localhost:5000/task/${params.id}`, data);

            }
            else {
                response = await axios.post("http://localhost:5000/task", data);
            }
            alert(response.data);
        } catch (error) {
            alert(error);
        }
    };

    const getTaskById = async (taskId) => {
        const response = await axios.get(`http://localhost:5000/task/${taskId}`);
        const data = response.data;
        setTitle(data.title);
        setDiscription(data.discription);
        setStatus(data.status);
        setDeadline(data.deadline);
        setIsEdit(true);
    };


    return (
        <div className='create-task-container'>
            <h4>Task Form</h4>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label>Title : </label>
                    <input type="text" placeholder='Enter Task Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className='form-control'>
                    <label>discription : </label>
                    <input type="text" placeholder='Enter Task Discription' value={discription} onChange={(e) => setDiscription(e.target.value)} required />
                </div>
                <div className='form-control'>
                    <label>Task Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value={"todo"} selected>
                            To-Do
                        </option>
                        <option value={"inProgress"}>In Progress</option>
                        <option value={"done"}>Done</option>
                    </select>
                </div>
                <div className='form-control'>
                    <label>Task DeadLine</label>
                    <input type="date" placeholder='Select task deadline' value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                </div>

                <button className='save-task-btn'>Save</button>
            </form>

        </div>
    )
};

export default CreateTask