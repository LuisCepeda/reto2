'use server'


export async function createProject(formData) {
    const name = formData.get("name")
    const description = formData.get("description")
    const duration = formData.get("duration")
    const team = formData.get("team")
    const status = formData.get("status")

    const project = { name, description, duration, team, status }


    console.log('data', project)
}