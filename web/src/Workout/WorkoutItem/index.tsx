import { ISet } from './WorkoutSet';

export interface IWorkoutItem {
    id?: string;
    workoutId: string;
    exerciseId: number;
    sets: ISet[];
}