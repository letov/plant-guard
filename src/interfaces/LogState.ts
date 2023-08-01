import { CommonState } from './CommonState.ts';
import { LogLine } from './LogLine.ts';

export interface LogState extends CommonState<LogLine[]> {}
