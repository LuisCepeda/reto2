'use client'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'


import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import RolesCheckboxGroup from '@/components/ui/roles-checkbox-group'
import UsersCheckboxGroup from '@/components/ui/users-checkbox-group'
import SelectTeamRole from '@/components/ui/select-team-role'

import { useRouter } from 'next/navigation'

import { createTeam, getMatchingRoleUsers, getProjectLeaderRoleId } from '@/actions/team-actions'
import { useTeamData } from '@/context/TeamDataContext'

export function TeamForm() {
    const router = useRouter()

    const [selectedSystemRoles, setSelectedSystemRoles] = useState([])
    const [matchingRoleUsers, setMatchingRoleUsers] = useState()
    const [selectedTeamMembers, setSelectedTeamMembers] = useState([])
    const [selectedTeamRoles, setSelectedTeamRoles] = useState({})

    const { leaderRoleId } = useTeamData()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleSystemRoleChange = (selectedRolesCheckbox) => {
        setSelectedSystemRoles(selectedRolesCheckbox)
    }

    const handleTeamMemberRoleChange = (memberId, roleId) => {
        setSelectedTeamRoles(prev => ({
            ...prev,
            [memberId]: parseInt(roleId.target.value)
        }))
    }

    const handleUsersChange = (selectedUsersCheckbox) => {
        const filteredUsers = matchingRoleUsers.filter(user => selectedUsersCheckbox.includes(user.id))
        setSelectedTeamMembers(prevUsers => {
            const usersSet = new Set(prevUsers.map(user => user.id));
            const newUsers = filteredUsers.filter(user => !usersSet.has(user.id));
            return [...prevUsers, ...newUsers];
        })
    }

    useEffect(() => {
        async function fetchUsers(selectedRoles) {
            const usersFound = await getMatchingRoleUsers(selectedRoles)
            setMatchingRoleUsers(usersFound['Data'])
        }
        if (selectedSystemRoles.length > 0) {
            fetchUsers(selectedSystemRoles)
        }
    }, [selectedSystemRoles])



    const onSubmit = handleSubmit(async (data) => {

        const hasProjectLeader = Object.values(selectedTeamRoles).includes(leaderRoleId)

        if (selectedTeamMembers.length === 0) return alert('El equipo debe tener al menos un integrante.')
        if (!hasProjectLeader) return alert('El equipo debe tener un líder.')

        const teamData = { ...data, selectedTeamRoles }

        const responses = await createTeam(teamData)

        const allStatusAreCreated = responses.every(response => response.Status === 201);
        if (allStatusAreCreated) {
            alert('El equipo se creo correctamente.')
            router.push('/')
        } else {
            return alert('Ocurrió un error creando el equipo.')
        }
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
                        <Input type='checkbox' id="isTeamActive" {...register('isTeamActive')} defaultChecked className="size-4" />
                        <Label htmlFor="isTeamActive">Equipo activo?</Label>
                    </div>

                    <section>
                        <RolesCheckboxGroup onChange={handleSystemRoleChange} />
                    </section>

                    {
                        selectedSystemRoles ?
                            <section className='grid grid-cols-2'>
                                {
                                    (selectedSystemRoles.length > 0) ?
                                        <div className=''>
                                            <UsersCheckboxGroup users={matchingRoleUsers} onChange={handleUsersChange} />
                                        </div>
                                        : <div></div>
                                }
                                <div className=''>
                                    {
                                        selectedTeamMembers ?
                                            <Listbox aria-label="Actions" >
                                                {selectedTeamMembers.map(member => (
                                                    <ListboxItem key={member.id} value={member.id} textValue={member.username}>
                                                        <div className='flex justify-between items-center'>
                                                            {member.username}
                                                            <SelectTeamRole onRoleChange={(roleId) => handleTeamMemberRoleChange(member.id, roleId)} />
                                                        </div>
                                                    </ListboxItem>
                                                ))}
                                            </Listbox> : <p className='hidden'>Esto debe estar oculto</p>
                                    }
                                </div>
                            </section>
                            : <p className='hidden'>Esto debe estar oculto</p>}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
                    <Button type="submit">Crear</Button>
                </CardFooter>

            </Card>
        </form>
    )
}