'use client'

import { Select, SelectItem } from "@nextui-org/react";
import { useState } from 'react'
import { useTaskData } from '@/context/TaskDataContext';

function SelectTeams({ onTeamChange, color }) {
    const { teams } = useTaskData();
    const [selectedTeam, setSelectedTeam] = useState(null)

    console.log('teams', teams)

    const handleChange = (value) => {
        setSelectedTeam(value)
        onTeamChange(value)
    }

    return (

        teams
            ? <Select
                label='Equipo encargado:'
                labelPlacement="inside"
                placeholder="Seleccione un equipo."
                className="max-w-xs"
                size="md"
                variant="bordered"
                value={selectedTeam}
                onChange={handleChange}
                color={color}>
                {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id} textValue={team.name}>
                        {team.name}
                    </SelectItem>
                ))
                }
            </Select>
            : <p>Cargando equipos ...</p>

    )

}

export default SelectTeams