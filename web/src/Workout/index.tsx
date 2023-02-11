import { IWorkoutItem } from './WorkoutItem';

export interface IWorkout {
    id?: string;
    date?: Date;
    userId?: string;
    workoutItems: IWorkoutItem[];
}
