import { ActionType } from '../enums/ActionType.ts';

export interface LogLine {
    createdAt: number,
    actionType: ActionType,
    value: number,
}