'use client'
import { getTeamRoles } from "@/actions/team-actions";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from 'react'

function SelectTeamRole() {
    const [teamRoles, setTeamRoles] = useState(null)
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
    return (
        teamRoles ?
            <Select label='Rol a desempeñar' labelPlacement="inside" placeholder="Seleccione un rol" className="max-w-xs" size='sm' variant="bordered">
                {teamRoles.map((role) => (
                    <SelectItem key={role.id} textValue={role.name} >
                        {role.name}
                    </SelectItem>
                ))}
            </Select>
            : <p>no</p>

    )
}

export default SelectTeamRole