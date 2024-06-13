export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/new',
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
