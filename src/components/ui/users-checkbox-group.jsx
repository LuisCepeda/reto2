'use client'
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";



function UsersCheckboxGroup({ users, onChange }) {
    return (
        <CheckboxGroup label='Usuarios disponibles' onChange={onChange}>
            {users ? users.map(user => (
                <Checkbox key={user.id} value={user.id}>{user.username}</Checkbox>
            )) : <p>Cargando...</p>}
        </CheckboxGroup>
    )
}

export default UsersCheckboxGroup