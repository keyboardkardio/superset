const { PrismaClient } = require('@prisma/client');
const { muscleGroups, exercises, exercisesOnMuscleGroups } = require('./data.js');

const prisma = new PrismaClient();

async function load() {
    try {
        await prisma.user.deleteMany();
        console.log('Deleted records in users table.');

        await prisma.muscleGroup.deleteMany();
        console.log('Deleted records in muscle_group table.');

        await prisma.exercise.deleteMany();
        console.log('Deleted records in exercises table.');

        await prisma.exercisesOnMuscleGroups.deleteMany();
        console.log('Deleted records in exercises_on_muscle_group table.');

        await prisma.workout.deleteMany();
        console.log('Deleted records in workouts table.');

        await prisma.set.deleteMany();
        console.log('Deleted records in sets table.');

        await prisma.workoutItem.deleteMany();
        console.log('Deleted records in workout_items table.');

        await prisma.$queryRaw`ALTER TABLE muscle_groups AUTO_INCREMENT = 1`;
        console.log('muscle_groups auto increment set to 1');

        await prisma.$queryRaw`ALTER TABLE exercises AUTO_INCREMENT = 1`;
        console.log('exercises auto increment set to 1');

        await prisma.$queryRaw`ALTER TABLE exercises_on_muscle_groups AUTO_INCREMENT = 1`;
        console.log('exercises_on_muscle_groups auto increment set to 1');

        await prisma.muscleGroup.createMany({ data: muscleGroups });
        console.log('Successfully added muscle groups.');

        await prisma.exercise.createMany({ data: exercises });
        console.log('Successfully added exercises.');

        await prisma.exercisesOnMuscleGroups.createMany({ data: exercisesOnMuscleGroups });
        console.log('Successfully added exercises in muscle groups.');
    } catch (error) {
        console.error(error);
        
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();
