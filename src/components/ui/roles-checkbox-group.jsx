'use client'
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { getSystemRoles } from '@/actions/team-actions'
import { useEffect, useState } from 'react'


function RolesCheckboxGroup({ onChange }) {
    const [roles, setRoles] = useState(null)
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const roles = await getSystemRoles()
                setRoles(roles.Data)
            } catch (error) {
                console.log('error', error)
            }
        }
        fetchRoles()
    }, [])
    return (
        <>
            {roles ?
                < CheckboxGroup label="Roles" orientation='horizontal' onChange={onChange}>
                    {
                        roles.map(role => (
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