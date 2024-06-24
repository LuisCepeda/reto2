'use client';
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { useEffect, useState } from "react";

function TasksCheckboxGroup({ tasks, onSelectedChange }) {
    const completedTaskIds = tasks.filter(task => task.task.projectStatusId === 3).map(item => item.taskId)
    const [selected, setSelected] = useState({});
    //const [completedTaskIds, setCompletedTaskIds] = useState([])

    useEffect(() => {
        onSelectedChange(selected);
    }, [selected, onSelectedChange]);

    const handleCheckboxChange = (taskId) => {
        setSelected((prevSelected) => ({
            ...prevSelected,
            [taskId]: !prevSelected[taskId],
        }));
    };

    useEffect(() => {
        setSelected(completedTaskIds.reduce((acc, current) => {
            acc[current] = true;
            return acc;
        }, {}))
    }, [tasks])

    return (
        <>
            {tasks ? (
                tasks.length > 0 ? (
                    <CheckboxGroup
                        label="Tareas:"
                        defaultValue={completedTaskIds}
                    >
                        {tasks.map((task) => (
                            <Checkbox
                                key={`task-${task.taskId}`}
                                id={task.taskId}
                                value={task.taskId}
                                size="sm"
                                isSelected={selected[task.taskId] || false}
                                onChange={() => handleCheckboxChange(task.taskId)}
                            >
                                {task.task.name}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                ) : (
                    <p>Cargando...</p>
                )
            ) : (
                <p>No hay tareas</p>
            )}
        </>
    );
}

export default TasksCheckboxGroup;
