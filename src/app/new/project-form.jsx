"use client"
import * as React from "react"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Textarea } from "@/components/ui/textarea"
import { RadioButtonsGroup } from "@/components/ui/radio-buttons-group"
//import { createProject } from '@/actions/project-actions'
import { DatePickerForm } from "@/components/ui/date-picker2"

const projectFormSchema = z.object({
  name: z.string().min(6, { message: 'El nombre del proyecto debe tener al menos 6 caracteres.' }).max(30, { message: 'El nombre del proyecto debe tener como máximo 30 caracteres.' }),
  description: z.string().min(6, { message: 'La descripción del proyecto debe tener al menos 6 caracteres.' }).max(400, { message: 'La descripción del proyecto debe tener como máximo 400 caracteres.' }),
  duration: z.date({ message: 'El proyecto debe tener un rango aceptable.' }),
  team: z.string().min(1, { message: 'Se debe seleccionar 1 equipo.' })
})
export function ProjectForm() {
  const [duration, setDuration] = React.useState({ from: null, to: null });


  async function createProject(formData) {

    const name = formData.get("name")
    const description = formData.get("description")
    //const duration = formData.get("duration")
    const team = formData.get("team")
    const status = formData.get("status")

    const project = { name, description, duration, team, status }


    console.log('data', project)
  }


  return (


    <form action={createProject}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Crear proyecto</CardTitle>
          <CardDescription>Rellena la información del nuevo proyecto.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" placeholder="Nombre del proyecto" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id='description' name="description" placeholder="Descripción del proyecto" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="duration">Duración del proyecto</Label>
              <DatePickerWithRange name="duration" id="duration" onChange={(date) => setDuration(date)} />

            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="team">Equipo encargado</Label>
              <Select name="team">
                <SelectTrigger id="team">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <RadioButtonsGroup name="status" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button type="submit">Crear</Button>
        </CardFooter>
      </Card>
    </form>


  )
}
