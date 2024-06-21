export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/new-project',
        '/create-user',
        '/create-team',
        
        // '/api/ecosystem',
        // '/api/priorities',
        // '/api/projects',
        // '/api/resources',
        // '/api/resources-on-projects',
        // '/api/system-roles',
        // '/api/system-roles-on-users',
        // '/api/task-status',
        // '/api/tasks',
        // '/api/tasks-on-projects',
        // '/api/team-roles',
        // '/api/teams',
        // '/api/teams-on-projects',
        // '/api/users-on-teams',
        
    ]
}
/* 
export const config = {
    matcher: [
        '/new',
        '/api/:path*'
    ]
}
 */
