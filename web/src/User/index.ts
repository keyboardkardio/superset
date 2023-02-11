import { IWorkout } from '@/Workout';

export interface IUser {
    id: string;
    username: string;
    password: string;
    role: string;
}

export interface IAppUser extends Partial<IUser> {
    token: string;
    workouts?: IWorkout[];
}
