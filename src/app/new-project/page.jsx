import { ProjectForm } from "./project-form"
import { getServerSession } from 'next-auth/next'
import { TaskDataProvider } from '@/context/TaskDataContext';
async function NewPage() {
  const session = await getServerSession()
  const user = session?.user
  return (
    <div className="flex justify-center items-center h-screen">
      <TaskDataProvider>
        <ProjectForm />
      </TaskDataProvider>

    </div>
  )
}

export default NewPage