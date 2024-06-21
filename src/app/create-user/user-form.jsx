'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { createUser, assignSystemRoleToUser } from '@/actions/user-actions'
import { useRouter } from 'next/navigation'



export function UserForm() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

    const onSubmit = handleSubmit(async (data) => {
        const newUserResponse = await createUser({ ...data, systemStatusId: 1 })

        console.log('userJson', newUserResponse)
        if (newUserResponse.Status !== 201) {
            alert('Error creando usuario.')
            router.refresh()
        }


        const assignRoleToUserResponse = await assignSystemRoleToUser(newUserResponse.Data.id, 2)
        if (assignRoleToUserResponse.Status === 201) {
            alert('El usuario se creo correctamente.')
            router.push('/')
        } else {
            return alert('Ocurrió un error creando el equipo.')
        }




    })

    return (
        <form onSubmit={onSubmit}>
            <Card className='w-[350px]' >
                <CardHeader>
                    <CardTitle>
                        Crear Usuario
                    </CardTitle>
                    <CardDescription>
                        Rellena la información del nuevo usuario.
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <div className='grid w-full items-center gap-4'>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor='username'>Nombre de usuario</Label>
                            <Input type='text' {...register('username', { required: { value: true, message: 'El nombre de usuario es requerido.' } })} placeholder='LuisCepeda' />
                            {errors.username && (
                                <span className='text-red-600 text-sm'>{errors.username.message}</span>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor='email'>Dirección de correo</Label>
                            <Input type="email" {...register('email', { required: { value: true, message: 'El email es requerido.' } })} placeholder='luis.cepeda.talentotech@usa.edu.co' />
                            {errors.email && (
                                <span className='text-red-600 text-sm'>{errors.email.message}</span>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor='password'>Contraseña</Label>
                            <Input type="password" {...register('password', { required: false })} placeholder='********' />
                            {errors.password && (
                                <span className='text-red-600 text-sm'>{errors.password.message}</span>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
                    <Button type="submit">Crear</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

