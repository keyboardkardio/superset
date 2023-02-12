import { IWorkout } from '@/Workout';

export interface IUser {
    id: string;
    username: string;
    password: string;
    role: string;
}

export interface IAppUser {
    user: {
        id: string;
        username: string;
        role: string;
        workouts?: IWorkout[];
    };
}