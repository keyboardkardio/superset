import { Prisma, Workout } from '@prisma/client';
import { prisma } from '#shared/services/prisma.service';

export async function createWorkout(userId: string): Promise<string> {
    const workout = await prisma.workout.create({ data: { user: { connect: { id: userId } } } });

    return workout.id;
}

export async function createWorkoutItem(data: Prisma.WorkoutItemCreateInput): Promise<string> {
    const workoutItem = await prisma.workoutItem.create({ data });

    return workoutItem.id;
}

export async function createSet(data: Prisma.SetCreateInput): Promise<string> {
    const set = await prisma.set.create({ data });

    return set.id;
}

export async function createWorkoutItemWithSets(workoutId: string, exerciseId: number, sets: Prisma.SetCreateManyWorkoutItemInput[]) {
    const workoutItem = await prisma.workoutItem.create({
        data: {
            workoutId,
            exerciseId,
            sets: {
                create: sets.map((set) => ({ data: set })),
            },
        },
    });

    return workoutItem.id;
}

export async function deleteWorkout(id: string) {
    const workout = await prisma.workout.findUnique({ where: { id } });
    if (!workout) {
        return null;
    }

    await prisma.workout.delete({ where: workout });

    return;
}

export async function findAllWorkouts(): Promise<Partial<Workout>[]> {
    const workouts = await prisma.workout.findMany({
        select: getWorkoutSelection(),
    });

    return workouts;
}

export async function findById(id: string): Promise<Partial<Workout> | null> {
    const workout = await prisma.workout.findUnique({
        where: { id },
        select: getWorkoutSelection(),
    });

    return workout;
}

export const getWorkoutSelection = () => ({
    id: true,
    date: true,
    user: {
        select: {
            username: true,
        },
    },
    workoutItems: {
        select: {
            exercise: {
                select: {
                    name: true,
                },
            },
            sets: {
                select: {
                    reps: true,
                    weight: true,
                },
            },
        },
    },
});
