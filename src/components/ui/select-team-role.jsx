'use client'
import { getTeamRoles } from "@/actions/team-actions";
import { useTeamData } from "@/context/TeamDataContext";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from 'react'

function SelectTeamRole({ onRoleChange }) {
    const { teamRoles } = useTeamData()
    const [selectedRole, setSelectedRole] = useState(null);

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