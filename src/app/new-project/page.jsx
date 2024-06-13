import { ProjectForm } from "./project-form"
import { getServerSession } from 'next-auth/next'
async function NewPage() {
  const session = await getServerSession()
  const user = session?.user
  return (
    <div className="flex justify-center items-center h-screen">
      <ProjectForm />
      <p>{session.user?.name}</p>
    </div>
  )
}

export default NewPage