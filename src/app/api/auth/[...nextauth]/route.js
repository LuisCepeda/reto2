import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/lib/services/users'
import { checkUserByEmail, createUser, assignSystemRoleToUser } from '@/actions/user-actions'

const bcrypt = require('bcrypt');


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'luis.cepeda.talentotech@usa.edu.co' },
                password: { label: 'Contraseña', type: 'password' }
            },
            async authorize(credentials, req) {
                const userFound = await getUserByEmail(credentials.email)

                if (!userFound) return null
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
                if (!matchPassword) return null

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user }) {
            const { id, name, email, image } = user;

            const isUserRegistered = await checkUserByEmail(email)

            if (!isUserRegistered) {
                console.log(`Almacenando usuario...[${name}, ${email}]`);
                const response = await createUser({
                    username: name,
                    email: email,
                    systemStatusId: 1,
                    password: await bcrypt.hash("talentotech", 10)
                })
                if (!response) {
                    console.error('Error registrando.')
                    return false
                }
            }
            return true
        },
        async session({ session, token, account }) {
            if (session) {
                session.access_token = token.access_token
                session.token_type = token.token_type
                session.id_token = token.id_token
            }
            return session
        },
        async jwt({ token, account }) {
            if (account) {
                token.access_token = account.access_token
                token.token_type = account.token_type
                token.id_token = account.id_token

            }
            return token;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }