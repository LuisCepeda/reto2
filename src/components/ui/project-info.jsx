import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import TasksCheckboxGroup from "./tasks-checkbox-group";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { updateProjectProgress, updateProjectsTask } from "@/actions/project-actions";
import { taskUpdateSchema } from "@/schemas/schemas";
import { useRouter } from 'next/navigation'
function ProjectInfo({ projectData, isOpen, onOpenChange }) {
    const [selectedTasks, setSelectedTasks] = useState({});
    const [close, setClose] = useState()
    const [tasksUpdated, setTasksUpdated] = useState({})
    const [progressUpdated, setProgressUpdated] = useState({})

    const router = useRouter()

    const handleSelectedChange = (selected) => {
        setSelectedTasks(selected);
    };


    const updateTasks = async (id) => {
        try {

            const tasksUpdated = await updateProjectsTask(selectedTasks)
            const progressUpdated = await updateProjectProgress(id)
            setTasksUpdated(tasksUpdated)
            setProgressUpdated(progressUpdated)
            onOpenChange(false)
            router.replace('/')

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {
                        (onClose) => (
                            <>
                                <ModalHeader>{projectData.name}</ModalHeader>
                                <ModalBody>
                                    <p >{projectData.description}</p>
                                    <TasksCheckboxGroup tasks={projectData.tasks} onSelectedChange={handleSelectedChange} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={() => updateTasks(projectData.id)}>Actualizar</Button>
                                </ModalFooter>
                            </>
                        )
                    }

                </ModalContent>
            </Modal>
        </div>
    )
}

export default ProjectInfo