import { Workout } from '@prisma/client';
import { prisma } from '../shared/services/prisma.service';

export async function createWorkout(userId: string) {
    const workout = await prisma.workout.create({
        data: { userId },
    });

    return workout.id;
}

export async function createWorkoutItem(workoutId: string, exerciseId: number) {
    const workoutItem = await prisma.workoutItem.create({
        data: {
            workoutId,
            exerciseId: parseInt(exerciseId as unknown as string, 10),
        },
    });

    return workoutItem.id;
}

export async function createSet(workoutItemId: string, reps: number, weight: number) {
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
) {
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

export async function deleteWorkout(id: string) {
    const workout = await prisma.workout.findUnique({ where: { id } });
    if (!workout) {
        return null;
    }

    await prisma.workout.delete({ where: workout });

    return;
}

export async function findAllWorkouts(userId: string) {
    const workouts = await prisma.workout.findMany({
        where: { userId },
        select: {
            id: true,
            date: true,
            workoutItems: {
                select: {
                    id: true,
                    exercise: {
                        select: {
                            name: true,
                        },
                    },
                    sets: {
                        select: {
                            id: true,
                            reps: true,
                            weight: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            date: 'desc'
        },
        take: 1,
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

export async function findLastWorkout(userId: string) {
    const workout = await prisma.workout.findMany({
        where: { userId },
        select: {
            id: true,
            date: true,
            workoutItems: {
                select: {
                    id: true,
                    exercise: {
                        select: {
                            name: true,
                        },
                    },
                    sets: {
                        select: {
                            id: true,
                            reps: true,
                            weight: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            date: 'desc'
        },
        take: 1,
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
