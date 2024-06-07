import { z } from 'zod'

export const ecosystemSchema = z.object({
    name: z.string().trim(),
    description: z.string().trim().optional(),
    latitude:z.number().min(-90).max(90),
    longitude:z.number().min(-180).max(180),
}).strict()

export const ecosystemUpdateSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
}).strict();


export const prioritySchema = z.object({
    value:z.string().trim()
}).strict()

export const priorityUpdateSchema = z.object({
    value: z.string().trim().optional(),
}).strict();


export const projectSchema = z.object({
    name:z.string().trim(),
    description:z.string().trim().optional(),
    progress:z.number(),
    projectStatusId:z.number().min(1),
    ecosystemId:z.number().min(1),
}).strict()

export const projectUpdateSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    progress: z.number().optional(),
    projectStatusId: z.number().min(1).optional(),
    ecosystemId: z.number().min(1).optional(),
}).strict();


export const projectStatusSchema = z.object({
    value:z.string().trim()
}).strict()

export const projectStatusUpdateSchema = z.object({
    value: z.string().trim().optional(),
}).strict();


export const resourceSchema = z.object({
    name:z.string().trim(),
    description: z.string().trim().optional(),
    resourceTypeId: z.number().min(1),
    availableQuantity: z.number(),
    unitOfMeasureId:z.number().min(1)
}).strict()

export const resourceUpdateSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    resourceTypeId: z.number().min(1).optional(),
    availableQuantity: z.number().optional(),
    unitOfMeasureId: z.number().min(1).optional(),
}).strict();


export const resourcesOnProjectsSchema = z.object({
    projectId:z.number().min(1),
    resourceId: z.number().min(1),
    assignedAmount: z.number().min(1)
}).strict()

export const resourcesOnProjectsUpdateSchema = z.object({
    projectId: z.number().min(1).optional(),
    resourceId: z.number().min(1).optional(),
    assignedAmount: z.number().min(1).optional(),
}).strict();


export const resourceTypeSchema = z.object({
    name:z.string().trim(),
    description: z.string().trim().optional(),
}).strict()

export const resourceTypeUpdateSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
}).strict();


export const roleSchema = z.object({
    name:z.string().trim(),
    description: z.string().trim().optional(),
}).strict()

export const roleUpdateSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
}).strict();


export const systemStatusSchema = z.object({
    value:z.string().trim()
}).strict()

export const systemStatusUpdateSchema = z.object({
    value: z.string().trim().optional(),
}).strict();


export const taskSchema = z.object({
    name:z.string().trim(),
    description: z.string().trim().optional(),
    projectStatusId: z.number().min(1),
    priorityId: z.number().min(1),
    startDate: z.string().trim().datetime(),
    endDate: z.string().trim().datetime()    
}).strict()

export const taskUpdateSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    projectStatusId: z.number().min(1).optional(),
    priorityId: z.number().min(1).optional(),
    startDate: z.string().trim().datetime().optional(),
    endDate: z.string().trim().datetime().optional(),
}).strict();


export const tasksOnProjectsSchema = z.object({
    projectId:z.number().min(1),
    taskId: z.number().min(1),
    creatorUserId: z.number().min(1),
    assignedUserId: z.number().min(1)
}).strict()

export const tasksOnProjectsUpdateSchema = z.object({
    projectId: z.number().min(1).optional(),
    taskId: z.number().min(1).optional(),
    creatorUserId: z.number().min(1).optional(),
    assignedUserId: z.number().min(1).optional(),
}).strict();


export const teamSchema = z.object({
    name:z.string().trim(),
    description: z.string().trim().optional(),
    systemStatusId: z.number().min(1),
}).strict()

export const teamUpdateSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    systemStatusId: z.number().min(1).optional(),
}).strict();


export const teamsOnProjectsSchema = z.object({
    projectId:z.number().min(1),
    teamId: z.number().min(1),
}).strict()

export const teamsOnProjectsUpdateSchema = z.object({
    projectId: z.number().min(1).optional(),
    teamId: z.number().min(1).optional(),
}).strict();


export const unitOfMeasureSchema = z.object({
    value:z.string().trim()
    }).strict()
    
export const unitOfMeasureUpdateSchema = z.object({
    value: z.string().trim().optional(),
}).strict();


export const userSchema = z.object({
    username: z.string().trim(),
    email: z.string().trim().email(),
    password: z.string().trim().optional(),
    systemStatusId:z.number().min(1)
}).strict()

export const userUpdateSchema = z.object({
    username: z.string().trim().optional(),
    email: z.string().trim().email().optional(),
    password: z.string().trim().optional(),
    systemStatusId: z.number().min(1).optional(),
}).strict();


export const usersOnTeamsSchema = z.object({
    userId:z.number().min(1),
    teamId: z.number().min(1),
    roleId: z.number().min(1)
}).strict()

export const usersOnTeamsUpdateSchema = z.object({
    userId: z.number().min(1).optional(),
    teamId: z.number().min(1).optional(),
    roleId: z.number().min(1).optional(),
}).strict();