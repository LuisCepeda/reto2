
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import TasksCheckboxGroup from "./tasks-checkbox-group";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import ProjectInfo from "./project-info";
import { useState, useEffect } from "react";


function CardProject({ projectData }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [progress, setProgress] = useState(projectData.progress)

    useEffect(() => {
        if (!isOpen) {
            setProgress(projectData.progress);
        }
    }, [isOpen, projectData.progress]);
    const handleProgressUpdate = (newProgress) => {
        setProgress(newProgress);

    };
    return (
        <Card className="max-w-[300px] gap-3" isPressable onPress={onOpen}>
            <CardHeader >
                <div className="grid-rows-2 ">
                    <p className="text-xl">{projectData.name}</p>
                    <span className="pt-1">
                        {projectData.teams[0].team.name}
                    </span>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small ">
                <p className="light:text-black dark:text-slate-400" >{projectData.description}</p>
            </CardBody>
            <CardFooter className="flex  justify-end">
                <div >
                    <p>{progress}%</p>
                </div>
            </CardFooter>
            <ProjectInfo projectData={projectData} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} ></ProjectInfo>
        </Card>
    )
}

export default CardProject