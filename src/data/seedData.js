export const projectStatusInit = [
    { value: "Planeado(a)" },
    { value: "En progreso(a)" },
    { value: "Completado(a)" },
    { value: "Bloqueado(a)" },
    { value: "Removido(a)" }
];

export const systemStatusInit = [
    { value: "Activo" },
    { value: "Inactivo" }
];

export const resourceTypeInit = [
    { name: "Humano" },
    { name: "Material" },
    { name: "Financiero" },
    { name: "Mueble" },
    { name: "Inmueble" },
    { name: "Tiempo" }
];

export const unitOfMeasureInit = [
    { value: "Personas" },
    { value: "Horas de trabajo" },
    { value: "Unidades" },
    { value: "Toneladas" },
    { value: "Cajas" },
    { value: "Kilogramos" },
    { value: "Grados Centígrados" }
];
export const systemRoleInit = [
    { name: "Administrador" },
    { name: "Usuario básico" },
    { name: "Auditor" }
];
export const teamRoleInit = [
    { name: "Consultor Tareas" },
    { name: "Supervisor del información" },
    { name: "Líder de Proyecto" },
    { name: "Coordinador(a)" },
    { name: "Ingeniero(a) Agroforestal" },
    { name: "Ingeniero(a) Ambiental" }
];
export const priorityInit = [
    { value: "Crítica" },
    { value: "Alta" },
    { value: "Media" },
    { value: "Baja" },
    { value: "Muy Baja" }
];

export const resourceInit = [
    {
        name: "Computadoras Dell OptiPlex",
        description: "Computadoras de escritorio rápidas y confiables para oficinas.",
        resourceTypeId: 2,
        availableQuantity: 40,
        unitOfMeasureId: 3
    },
    {
        name: "Materiales de construcción: Cemento Portland",
        description: "Cemento utilizado en proyectos de construcción variados.",
        resourceTypeId: 2,
        availableQuantity: 25,
        unitOfMeasureId: 5
    },
    {
        name: "Fondos de inversión en acciones",
        description: "Fondos para inversión en el mercado de valores.",
        resourceTypeId: 3,
        availableQuantity: 100,
        unitOfMeasureId: 3
    },
    {
        name: "Muebles de oficina ergonómicos",
        description: "Sillas y escritorios diseñados para confort y productividad en oficinas.",
        resourceTypeId: 4,
        availableQuantity: 10,
        unitOfMeasureId: 3
    },
    {
        name: "Inmueble: Edificio de oficinas en el centro",
        description: "Edificio con múltiples espacios de oficina y servicios modernos.",
        resourceTypeId: 5,
        availableQuantity: 75,
        unitOfMeasureId: 3
    }
];

export const ecosystemInit = [
    {
        id: 1,
        name: "Lago",
        description: "Descripción del Lago 1",
        latitude: 5.0221,
        longitude: -74.027,
        createdAt: "2024-06-14T00:08:55.260Z",
        updatedAt: "2024-06-14T00:08:55.260Z"
    },
    {
        id: 2,
        name: "Bosque Tropical",
        description: "Bosque húmedo con diversidad biológica única.",
        latitude: -0.7893,
        longitude: -73.321,
        createdAt: "2024-06-14T10:15:30.120Z",
        updatedAt: "2024-06-14T10:15:30.120Z"
    },
    {
        id: 3,
        name: "Arrecife de Coral",
        description: "Arrecife submarino lleno de vida marina colorida.",
        latitude: 8.4567,
        longitude: -80.123,
        createdAt: "2024-06-13T18:45:00.500Z",
        updatedAt: "2024-06-13T18:45:00.500Z"
    },
    {
        id: 4,
        name: "Desierto",
        description: "Área extensa de tierra árida y escasa vegetación.",
        latitude: 31.2365,
        longitude: -114.543,
        createdAt: "2024-06-15T08:30:45.890Z",
        updatedAt: "2024-06-15T08:30:45.890Z"
    },
    {
        id: 5,
        name: "Manglar",
        description: "Bosque inundado que protege la costa y alberga vida silvestre.",
        latitude: -4.5678,
        longitude: -79.876,
        createdAt: "2024-06-16T14:20:15.700Z",
        updatedAt: "2024-06-16T14:20:15.700Z"
    }
];
