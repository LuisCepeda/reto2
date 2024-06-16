'use client'
import { getTeamRoles } from "@/actions/team-actions";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from 'react'

function SelectTeamRole({ onRoleChange }) {
    const [teamRoles, setTeamRoles] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null);
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const roles = await getTeamRoles()
                setTeamRoles(roles.Data)
            } catch (error) {
                console.log('error', error)
            }
        }
        fetchRoles()
    }, [])

    const handleChange = (value) => {
        setSelectedRole(value);
        onRoleChange(value);
    };

    return (
        teamRoles ?
            <Select
                label='Rol a desempeñar'
                labelPlacement="inside"
                placeholder="Seleccione un rol"
                className="max-w-xs"
                size='sm'
                variant="bordered"
                onChange={handleChange}
                value={selectedRole}
            >
                {teamRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id} textValue={role.name} >
                        {role.name}
                    </SelectItem>
                ))}
            </Select>
            : <p>No hay roles disponibles</p>

    )
}

export default SelectTeamRole