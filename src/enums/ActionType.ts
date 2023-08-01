export enum ActionType {
    SOIL_MOISTURE_MEASUREMENT = 0,
    WATERING = 1,
}

export const actionTypeTitles: Record<ActionType, string> = {
    [ActionType.SOIL_MOISTURE_MEASUREMENT]: 'Soil moisture measurement',
    [ActionType.WATERING]: 'Watering',
};