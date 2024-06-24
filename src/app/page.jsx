'use client'
import CardGroup from "@/components/ui/card-group";
import { useSession } from "next-auth/react";
import { ProjectDataProvider } from "@/context/ProjectDataContext"

function HomePage() {
  const { data: session } = useSession();

  return (
    <ProjectDataProvider>
      <CardGroup />
    </ProjectDataProvider>
  )
}

export default HomePage
