'use client'
import { getResources } from "@/actions/project-actions";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from 'react'

function SelectResource({ onResourceChange }) {

    const [resources, setResources] = useState(null)
    const [selectedResource, setSelectedResource] = useState(null)

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const resources = await getResources()
                setResources(resources)
            } catch (error) {
                console.log('error', error)
            }
        }
        fetchResources()
    }, [])

    const handleChange = (value) => {
        setSelectedResource(value)
        onResourceChange(value)
    }
    return (
        resources ?
            <Select
                label='Recurso:'
                labelPlacement="inside"
                placeholder="Seleccione un recurso."
                className="max-w-xs"
                size="md"
                variant="bordered"
                value={selectedResource}
                onChange={handleChange}>
                {resources.map(resource => (
                    <SelectItem key={resource.id} value={resource.id} textValue={resource.name}>
                        {resource.name}
                    </SelectItem>
                ))}
            </Select>
            : <p>Cargando recursos ...</p>

    )
}

export default SelectResource