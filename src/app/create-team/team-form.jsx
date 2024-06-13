'use client'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { getAllRoles } from '@/lib/services/roles'
import { useEffect, useState } from 'react'
import { getRoles } from '@/actions/team-actions'
import RolesCheckboxGroup from '@/components/ui/roles-checkbox-group'

export function TeamForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()


    const handleRoleChange = (value) => {
        console.log('value', value)
    }

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
                        <div className='bg-white'>a</div>
                        <div className='bg-red-300'>a</div>

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