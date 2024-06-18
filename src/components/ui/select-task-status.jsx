'use client'
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from 'react'
import { useTaskData } from '@/context/TaskDataContext';
function SelectTaskStatus({ onStatusChange }) {

    const [selectedTaskStatus, setSelectedTaskStatus] = useState(null)
    const { taskStatus } = useTaskData();

    const handleChange = (value) => {
        setSelectedTaskStatus(value.target.value)
        onStatusChange(value.target.value)
    }

    return (
        taskStatus ?
            <Select
                label='Estado:'
                labelPlacement="inside"
                placeholder="Seleccione un estado."
                className="max-w-xs"
                size="sm"
                variant="bordered"
                value={selectedTaskStatus}
                onChange={handleChange}>
                {taskStatus.map((taskStatus) => (
                    <SelectItem key={taskStatus.id} value={taskStatus.id} textValue={taskStatus.value}  >
                        {taskStatus.value}
                    </SelectItem>
                ))
                }
            </Select>
            : <p>Cargando posibles estados ...</p>
    )

}

export default SelectTaskStatus