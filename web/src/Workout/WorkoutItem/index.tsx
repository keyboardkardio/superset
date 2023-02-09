import { Set } from './WorkoutSet';

export interface WorkoutItem {
    id?: string;
    exerciseId: number;
    sets: Set[];
}