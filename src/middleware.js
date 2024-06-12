export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/new',
        '/api/ecosystems',
        '/api/projects',
        '/api/resources',
        '/api/resources-on-projects',
        '/api/tasks',
        '/api/tasks-on-projects',
        '/api/teams',
        '/api/teams-on-projects',
        '/api/users',
        '/api/users-on-teams',
    ]
}

