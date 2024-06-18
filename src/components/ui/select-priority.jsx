'use client'

import { Select, SelectItem } from "@nextui-org/react";
import { useState } from 'react'
import { useTaskData } from '@/context/TaskDataContext';

function SelectPriority({ onPriorityChange }) {

    const [selectedPriority, setSelectedPriority] = useState(null)
    const { priorities } = useTaskData()

    const handleChange = (value) => {
        setSelectedPriority(value.target.value)
        onPriorityChange(value.target.value)
    }

    return (
        priorities ?
            <Select
                label='Prioridad:'
                labelPlacement="inside"
                placeholder="Seleccione un prioridad."
                className="max-w-xs"
                size="sm"
                variant="bordered"
                value={selectedPriority}
                onChange={handleChange}>
                {priorities.map((priority) => (
                    <SelectItem key={priority.id} value={priority.id} textValue={priority.value}  >
                        {priority.value}
                    </SelectItem>
                ))
                }
            </Select>
            : <p>Cargando prioridades ...</p>
    )

}

export default SelectPriority