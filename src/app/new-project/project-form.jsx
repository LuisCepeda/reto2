"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

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

import { DateRangePicker } from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";
import { Textarea } from "@/components/ui/textarea"

import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { createProject } from "@/actions/project-actions"
import SelectTeams from "@/components/ui/select-teams"
import TaskList from "@/components/ui/task-list"

export function ProjectForm() {
  const now = new Date()
  const dateFormatted = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${(now.getDate()).toString().padStart(2, '0')}`

  const { register, handleSubmit, formState: { errors } } = useForm()

  const [selectedTeam, setSelectedTeam] = React.useState(null)
  const [componentsColor, setComponentsColor] = React.useState("default")
  const [tasks, setTasks] = React.useState([])
  const [duration, setDuration] = React.useState({
    start: parseDate(dateFormatted),
    end: parseDate(dateFormatted),
  })
  let formatter = useDateFormatter({ dateStyle: "long" });


  const handleTeamChange = (team) => {
    setSelectedTeam(team.target.value)
  }

  const onSubmit = handleSubmit(async (data) => {

    const projectData = {
      data, selectedTeam, tasks, projectDuration: {
        start: duration.start.toDate(getLocalTimeZone()),
        end: duration.end.toDate(getLocalTimeZone())
      }
    }
    setComponentsColor(selectedTeam ? "default" : "danger")

    const responses = await createProject(projectData)

    const allStatusAreCreated = responses.every(response => response.Status === 201);
    if (allStatusAreCreated) {
      alert('El proyecto se creo correctamente.')
      router.push('/')
    } else {
      return alert('Ocurrió un error creando el equipo.')
    }
  })


  return (


    <form onSubmit={onSubmit}>
      <Card className="w-[900px]">
        <CardHeader>
          <CardTitle>Crear proyecto</CardTitle>
          <CardDescription>Rellena la información del nuevo proyecto.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name"  {...register('projectName', { required: { value: true, message: 'El nombre de proyecto es requerido.' } })} placeholder="Nombre del proyecto" />
              {errors.projectName && (
                <span className='text-red-600 text-sm'>{errors.projectName.message}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id='description' {...register('projectDescription', { required: { value: true, message: 'La descripción del proyecto es requerida.' } })} placeholder="Descripción del proyecto" />
              {errors.projectDescription && (
                <span className='text-red-600 text-sm'>{errors.projectDescription.message}</span>
              )}
            </div>

            <div className="grid grid-cols-2">
              <div className="flex flex-col space-y-1.5  justify-center">
                <Label htmlFor="duration">Duración estimada del proyecto</Label>
                <DateRangePicker name="duration" id="duration" aria-label='Date range picker' className="max-w-xs" variant="bordered" value={duration} onChange={setDuration} color={componentsColor} />
                <p className="text-default-500 text-sm">
                  Periodo elegido:{" "}
                  {duration
                    ? formatter.formatRange(
                      duration.start.toDate(getLocalTimeZone()),
                      duration.end.toDate(getLocalTimeZone()),
                    )
                    : "--"}
                </p>
              </div>
              <div className="flex flex-col space-y-1.5 items-center justify-center" >
                <SelectTeams onTeamChange={handleTeamChange} color={componentsColor} />
              </div>
            </div>
            <div>
              <h3 className="text-base">Tareas</h3>
              <div className="border border-slate-400 rounded flex flex-col gap-y-3 space-y-3">
                <div className="flex  flex-col items-center pb-6 space-y-6">
                  <TaskList tasks={tasks} setTasks={setTasks} />
                </div>

              </div>
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
