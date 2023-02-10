const { PrismaClient } = require('@prisma/client');
const { muscleGroups, exercises, exercisesOnMuscleGroups } = require('./data.js');

const prisma = new PrismaClient();

async function load() {
    try {
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
