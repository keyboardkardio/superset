export interface IAppUser {
    id: string;
    username: string;
    role: string;
}

export interface IUser extends IAppUser {
    password: string;
}

export interface IMuscleGroup {
    id: number;
    name: string;
    split: string;
}

export interface IExercise {
    id: number;
    name: string;
    movementType: string;
    muscleGroups?: IMuscleGroup[];
}

export interface IWorkout {
    id: string;
    date: Date | string;
    userId: string;
    workoutItems: IWorkoutItem[]
}

export interface IWorkoutItem {
    id: string;
    workoutId: string;
    exerciseId: number;
    sets: ISet[];
}

export interface ISet {
    id: string;
    workoutItemId: string;
    reps: number;
    weight: number;
}