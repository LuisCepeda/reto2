'use client'
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";



function UsersCheckboxGroup({ users, onChange }) {

    return (
        <>
            {users ?
                users.length > 0 ?
                    < CheckboxGroup label='Usuarios disponibles' onChange={onChange} >
                        {users.map(user => (
                            <Checkbox key={user.id} value={user.id}>{user.username}</Checkbox>
                        ))}
                    </CheckboxGroup>
                    : < p > Selecciona al menos un rol.</p >
                : < p > Selecciona al menos un rol.</p >
            }
        </>
    )
}

export default UsersCheckboxGroup