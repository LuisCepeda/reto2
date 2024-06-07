export function formatProjectQueryParams(searchParams) {
    const whereClause = {}
    if (searchParams.has('name')) whereClause['name'] = {contains:searchParams.get("name")} 
    
    if (searchParams.has('progress-gte')) whereClause['progress'] = { ...whereClause["progress"], gte: parseFloat(searchParams.get('progress-gte')) }
    
    if(searchParams.has('progress-lte')) whereClause['progress']={...whereClause["progress"],lte:parseFloat(searchParams.get('progress-lte'))}

    if (searchParams.has('progress')) whereClause['progress'] = { equals: parseFloat(searchParams.get('progress')) }

    if (searchParams.has('ecosystem')) whereClause['ecosystemId'] = { equals: parseFloat(searchParams.get('ecosystem')) }

    if (searchParams.has('created-after')) whereClause['createdAt'] = { ...whereClause['createdAt'], gte: new Date(searchParams.get('created-after')) }
    
    if(searchParams.has('created-before')) whereClause['createdAt']={...whereClause['createdAt'],lte:new Date(searchParams.get('created-before')+"T23:59:59.000+0500")}
    

    return whereClause
}

export function formatUserQueryParams(searchParams) {
    const whereClause = {}

    if (searchParams.has('system-status')) whereClause['systemStatusId'] = { equals: parseInt(searchParams.get('system-status') )}
    
    if (searchParams.has('created-after')) whereClause['createdAt'] = { ...whereClause['createdAt'], gte: new Date(searchParams.get('created-after')) }
    
    if(searchParams.has('created-before')) whereClause['createdAt']={...whereClause['createdAt'],lte:new Date(searchParams.get('created-before')+"T23:59:59.000+0500")}

    return whereClause
}

export function formatEcosystemQueryParams(searchParams) {
    const whereClause = {}
    return whereClause
}

export function formatResourceQueryParams(searchParams) {
    const whereClause = {}
    return whereClause
}

export function formatResourceOnProjectsQueryParams(searchParams) {
    const whereClause = {}
    return whereClause
}

export function formatTaskQueryParams(searchParams) {
    const whereClause = {}
    return whereClause
}

export function formatTasksOnProjectsQueryParams(searchParams) {
    const whereClause = {}
    return whereClause
}

export function formatTeamsQueryParams(searchParams) {
    const whereClause = {}
    return whereClause
}

export function formatTeamsOnProjectsQueryParams(searchParams) {
    const whereClause = {}
    return whereClause
}

export function formatUsersOnTeamsQueryParams(searchParams) {
    const whereClause = {}
    return whereClause
}
