'use client'
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";

import { useTeamData } from '@/context/TeamDataContext'

function RolesCheckboxGroup({ onChange }) {
    const { systemRoles } = useTeamData()

    return (
        <>
            {systemRoles ?
                < CheckboxGroup label="Roles" orientation='horizontal' onChange={onChange}>
                    {
                        systemRoles.map(role => (
                            <Checkbox key={role.id} id={role.id} value={role.id}>{role.name}</Checkbox>
                        ))
                    }
                </CheckboxGroup>
                : <p>Cargando roles...</p>// crear esqueleto
            }
        </>

    )
}

export default RolesCheckboxGroup