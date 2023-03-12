import { Workout } from '@prisma/client';
import { prisma } from '../shared/services/prisma.service';

export async function createWorkout(userId: string): Promise<string> {
    const workout = await prisma.workout.create({
        data: { userId },
    });

    return workout.id;
}

export async function createWorkoutItem(workoutId: string, exerciseId: number): Promise<string> {
    const workoutItem = await prisma.workoutItem.create({
        data: {
            workoutId,
            exerciseId: parseInt(exerciseId as unknown as string, 10),
        },
    });

    return workoutItem.id;
}

export async function createSet(
    workoutItemId: string,
    reps: number,
    weight: number,
): Promise<string> {
    const set = await prisma.set.create({
        data: {
            workoutItemId,
            reps: parseInt(reps as unknown as string, 10),
            weight: parseInt(weight as unknown as string, 10),
        },
    });

    return set.id;
}

export async function createWorkoutItemWithSets(
    workoutId: string,
    exerciseId: number,
    sets: { reps: number; weight: number }[],
): Promise<string> {
    const workoutItem = await prisma.workoutItem.create({
        data: {
            workoutId,
            exerciseId: parseInt(exerciseId as unknown as string, 10),
            sets: {
                createMany: {
                    data: sets.map((set) => ({
                        reps: parseInt(set.reps as unknown as string, 10),
                        weight: parseInt(set.weight as unknown as string, 10),
                    })),
                },
            },
        },
    });

    return workoutItem.id;
}

export async function deleteWorkout(id: string): Promise<void | null> {
    const workout = await prisma.workout.findUnique({ where: { id } });
    if (!workout) {
        return null;
    }
    await prisma.workout.delete({ where: workout });

    return;
}

export async function findAllWorkouts(userId: string): Promise<Partial<Workout>[]> {
    const workouts = await prisma.workout.findMany({
        where: { userId },
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

export async function findLastWorkout(userId: string): Promise<Partial<Workout> | null> {
    const workout = await prisma.workout.findFirst({
        where: { userId },
        select: getWorkoutSelection(),
        orderBy: { date: 'asc' },
        take: -1,
    });

    return workout || null;
}

const getWorkoutSelection = () => ({
    id: true,
    date: true,
    user: { select: { username: true } },
    workoutItems: {
        select: {
            id: true,
            workoutId: true,
            exercise: { select: { name: true } },
            sets: true,
        },
    },
});
