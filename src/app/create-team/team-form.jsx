'use client'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";

import { useEffect, useState } from 'react'

import RolesCheckboxGroup from '@/components/ui/roles-checkbox-group'
import UsersCheckboxGroup from '@/components/ui/users-checkbox-group'
import { getMatchingRoleUsers } from '@/actions/team-actions'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import SelectTeamRole from '@/components/ui/select-team-role'

export function TeamForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()
    const [selectedRoles, setSelectedRoles] = useState([])
    const [matchingRoleUsers, setMatchingRoleUsers] = useState()
    const [selectedTeamMembers, setSelectedTeamMembers] = useState()
    const [info, setInfo] = useState()

    const handleRoleChange = (selectedRolesCheckbox) => {
        setSelectedRoles([selectedRolesCheckbox])
    }

    const handleUsersChange = (selectedUsersCheckbox) => {

        const filteredUsers = matchingRoleUsers.filter(user => selectedUsersCheckbox.includes(user.id))
        setSelectedTeamMembers(filteredUsers)


    }

    useEffect(() => {
        async function getUsers(selectedRoles) {
            const usersFound = await getMatchingRoleUsers(selectedRoles)
            setMatchingRoleUsers(usersFound['Data'])
        }
        getUsers(selectedRoles)
    }, [selectedRoles])



    useEffect(() => {
        console.log('info', info)
    }, [info])



    const onSubmit = handleSubmit(async (data) => {
        console.log('data', JSON.stringify(data))

    })


    return (
        <form onSubmit={onSubmit}>
            <Card className='w-[900px]' >
                <CardHeader>
                    <CardTitle>
                        Crear Equipo
                    </CardTitle>
                    <CardDescription>
                        Rellena la información del nuevo equipo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor='teamName'>Nombre del equipo</Label>
                        <Input type='text' {...register('teamName', { required: { value: true, message: 'El nombre de equipo es requerido.' } })} placeholder='Zona 1-a' />
                        {errors.teamName && (
                            <span className='text-red-600 text-sm'>{errors.teamName.message}</span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor='teamDescription'>Descripción del equipo</Label>
                        <Textarea type='text' {...register('teamDescription', { required: { value: true, message: 'La descripción de equipo es requerida.' } })} placeholder='Equipo encargado de detallar y planear el aprovechamiento de la zona 1-a' />
                        {errors.teamDescription && (
                            <span className='text-red-600 text-sm'>{errors.teamDescription.message}</span>
                        )}
                    </div>
                    <div className="flex flex-row  items-center justify-end gap-2 py-2">
                        <Input type='checkbox' id="team-active" {...register('team-active')} defaultChecked className="size-4" />
                        <Label htmlFor="team-active">Equipo activo?</Label>
                    </div>

                    <section>
                        <RolesCheckboxGroup onChange={handleRoleChange} />
                    </section>
                    <section className='grid grid-cols-2'>
                        <div className='border border-red-400'>
                            <UsersCheckboxGroup users={matchingRoleUsers} onChange={handleUsersChange} />
                        </div>
                        <div className='border border-white'>
                            <Listbox aria-label="Actions" onAction={(value) => setInfo(value)} {...register('team-info')}>
                                {selectedTeamMembers ? selectedTeamMembers.map(member => (
                                    <ListboxItem key={member.id} value={member.id}>
                                        <div className='flex justify-between items-center'>
                                            {member.username}
                                            <SelectTeamRole />
                                        </div>
                                    </ListboxItem>
                                )) : <ListboxItem key='empty'>vacio</ListboxItem>}
                            </Listbox>
                        </div>

                    </section>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
                    <Button type="submit">Crear</Button>
                </CardFooter>

            </Card>
        </form>
    )
}