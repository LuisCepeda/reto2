import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import SelectPriority from './select-priority';
import SelectTaskStatus from './select-task-status';
import { Button } from "@nextui-org/react";

function Task({ task, onDeleteClick, onTaskChange }) {
    const { id, name, description, priority, status } = task;
    const handleDeleteClick = () => {
        onDeleteClick(id);
    };
    const handleTaskChange = (field, value) => {
        onTaskChange(id, field, value);
    };
    return (
        <div className='grid grid-cols-tasks justify-center items-center p-2 pl-2 pr-2 gap-1'>
            <Input id={`taskName-${id}`} name="taskName" value={name} placeholder="Nombre de la tarea" onChange={(e) => handleTaskChange('name', e.target.value)} />
            <Textarea id={`taskDescription-${id}`} name="taskDescription" value={description} placeholder="Descripción de la tarea" onChange={(e) => handleTaskChange('description', e.target.value)} />
            <SelectPriority selectedPriority={priority} onPriorityChange={(value) => handleTaskChange('priority', value)} />
            <SelectTaskStatus selectedStatus={status} onStatusChange={(value) => handleTaskChange('status', value)} />
            <Button color='danger' variant='bordered' className='w-20' onClick={handleDeleteClick}>Borrar</Button>
        </div>
    )
}

export default Task