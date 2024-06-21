

function turnArrayToObject(arr, property,filter) {
    const typeConversion = {
        'systemRoleId': item => parseInt(item),        
        'date': item => new Date(item).toISOString(),
        'float': item => parseFloat(item).toFixed(2)
    };
    const convert = typeConversion[property] || (item => item);
    return  arr.map(item => ({
            [property]: {
                [filter]:convert(item)
            }
        }))
    
}

export function joinQueryParams(arr,param) {
    return arr.map(item => `${param}=${item}`).join('&');
}

export function groupByUser(data) {
    const groupedData= data.reduce((acc, current) => {
        const { userId, users, systemRoles } = current;       
        if (acc[userId]) {
            acc[userId].roles.push(systemRoles);
        } else {            
            acc[userId] = {
                ...users,
                roles: [systemRoles]
            };
        }

        return acc;
    }, {});
    return Object.values(groupedData)
}

export function formatSystemRolesOnUsersParams(searchParams) {
    const whereClause = {}
    if (searchParams.has('role')) {
        const roles = searchParams.getAll('role')       
        if (roles.length > 1) {
            whereClause['OR'] = turnArrayToObject(roles,'systemRoleId','equals')
        }
        else {
            whereClause['systemRoleId'] = {equals:parseInt(roles[0])}
        }
    }
    return whereClause
}

export function formatTeamRolesQueryParams(searchParams) {
    const whereClause = {}
    if (searchParams.has('role-name')) whereClause['name']=searchParams.get('role-name')
    return whereClause
}

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

    if (searchParams.has('username')) {
        const usernames = searchParams.getAll('username')
        if (usernames.length > 1) {
            whereClause['OR'] = turnArrayToObject(usernames,'username')
        }
        else {
            whereClause['username'] = {contains:usernames[0]}
        }
    }
    if (searchParams.has('email')) whereClause['email']={equals:searchParams.get('email')}
    if (searchParams.has('system-status')) whereClause['systemStatusId'] = { equals: parseInt(searchParams.get('system-status') )}
    
    if (searchParams.has('created-after')) whereClause['createdAt'] = { ...whereClause['createdAt'], gte: new Date(searchParams.get('created-after')) }
    
    if(searchParams.has('created-before')) whereClause['createdAt']={...whereClause['createdAt'],lte:new Date(searchParams.get('created-before')+"T23:59:59.000+0500")}
   
    return whereClause
}

export function formatEcosystemQueryParams(searchParams) {
    const whereClause = {}
    if (searchParams.has('name')) whereClause['name']={contains:searchParams.get('name')}
    return whereClause
}

export function formatResourceQueryParams(searchParams) {
    const whereClause = {}
    if (searchParams.has('resourceType')) whereClause['resourceTypeId'] = { equals: parseInt(searchParams.get('resourceType')) }
    if (searchParams.has('min-available')) whereClause['availableQuantity']={gte:parseInt(searchParams.get('min-available'))}
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
    if (searchParams.has('activo')) whereClause['systemStatusId'] = { equals: (searchParams.get('activo') === 'true' ? 1 : 2) }
    if (searchParams.has('name')) whereClause['name']={contains: searchParams.get('name')}
    return whereClause
}

export function formatTeamsOnProjectsQueryParams(searchParams) {
    const whereClause = {}
    return whereClause
}

export function formatUsersOnTeamsQueryParams(searchParams) {
    const whereClause = {}
    if (searchParams.has('team')) {
        const teams = searchParams.getAll('team')       
        if (teams.length > 1) {
            whereClause['OR'] = turnArrayToObject(teams,'teamId','equals')
        }
        else {
            whereClause['teamId'] = {equals:parseInt(teams[0])}
        }
    }
    return whereClause
}
