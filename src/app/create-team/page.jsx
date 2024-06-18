import { TeamDataProvider } from "@/context/TeamDataContext"
import { TeamForm } from "./team-form"

function CreateTeamPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <TeamDataProvider>
                <TeamForm />
            </TeamDataProvider>
        </div>
    )
}

export default CreateTeamPage