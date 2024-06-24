import { useProjectData } from "@/context/ProjectDataContext"
import CardProject from "./card-project"

function CardGroup() {

    const { projects, updateContext } = useProjectData()

    return (
        <main className="grid grid-cols-4">
            {projects?.length > 0
                ? projects.map(project => (
                    <CardProject key={project.id} projectData={project} updateContext={updateContext} />
                ))
                : <p>No hay proyectos</p>
            }
        </main>




    )
}

export default CardGroup