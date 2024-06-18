import { useState, useEffect } from 'react'
import Task from './task'
import { Button } from "@nextui-org/react";



function TaskList({ tasks, setTasks }) {

    const getTasks = () => tasks;

    const addTask = () => {
        const newTask = {
            id: tasks.length + 1,
            name: `Tarea ${tasks.length + 1}`,
            description: '',
            priority: null,
            status: null
        };
        setTasks([...tasks, newTask]);
    };
    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };


    const handleTaskChange = (taskId, field, value) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, [field]: value };
            }
            return task;
        });
        setTasks(updatedTasks);
    };
    return (
        <>
            <div className='flex flex-row items-center pr-2'>
                <div className='grid grid-cols-1'>
                    {tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            onDeleteClick={() => removeTask(task.id)}
                            onTaskChange={handleTaskChange}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-row items-center'>
                <Button color='secondary' onClick={addTask}>Añadir tarea</Button>

            </div>
        </>
    )
}

export default TaskList