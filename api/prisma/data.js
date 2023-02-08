const muscleGroups = [
    {
        name: 'abductors',
        split: 'LOWER',
    },
    {
        name: 'abs',
        split: 'CORE',
    },
    {
        name: 'adductors',
        split: 'LOWER',
    },
    {
        name: 'back',
        split: 'UPPER',
    },
    {
        name: 'biceps',
        split: 'UPPER',
    },
    {
        name: 'calves',
        split: 'LOWER',
    },
    {
        name: 'chest',
        split: 'UPPER',
    },
    {
        name: 'forearms',
        split: 'UPPER',
    },
    {
        name: 'glutes',
        split: 'LOWER',
    },
    {
        name: 'hamstrings',
        split: 'LOWER',
    },
    {
        name: 'lower back',
        split: 'CORE',
    },
    {
        name: 'neck',
        split: 'UPPER',
    },
    {
        name: 'quadriceps',
        split: 'LOWER',
    },
    {
        name: 'shoulders',
        split: 'UPPER',
    },
    {
        name: 'trapezius',
        split: 'UPPER',
    },
    {
        name: 'triceps',
        split: 'UPPER',
    },
];

const exercises = [
    {
        name: 'arnold press',
        movementType: 'PUSH',
    },
    {
        name: 'barbell back squat',
        movementType: 'PUSH',
    },
    {
        name: 'barbell bench press',
        movementType: 'PUSH',
    },
    {
        name: 'barbell clean',
        movementType: 'PULL',
    },
    {
        name: 'barbell deadlift',
        movementType: 'PULL',
    },
    {
        name: 'barbell front squat',
        movementType: 'PUSH',
    },
    {
        name: 'barbell glute bridge',
        movementType: 'PUSH',
    },
    {
        name: 'barbell hip thrust',
        movementType: 'PUSH',
    },
    {
        name: 'barbell landmine press',
        movementType: 'PUSH',
    },
    {
        name: 'barbell lunge',
        movementType: 'PUSH',
    },
    {
        name: 'barbell row',
        movementType: 'PULL',
    },
    {
        name: 'barbell shoulder press',
        movementType: 'PUSH',
    },
    {
        name: 'barbell snatch',
        movementType: 'PULL',
    },
    {
        name: 'bulgarian split squat',
        movementType: 'PUSH',
    },
    {
        name: 'cable crossover',
        movementType: 'PUSH',
    },
    {
        name: 'cable face-pull',
        movementType: 'PULL',
    },
    {
        name: 'cable push-down',
        movementType: 'PUSH',
    },
    {
        name: 'calf raise',
        movementType: 'PUSH',
    },
    {
        name: 'chest fly',
        movementType: 'PUSH',
    },
    {
        name: 'chin up',
        movementType: 'PULL',
    },
    {
        name: 'crunch',
        movementType: 'PULL',
    },
    {
        name: 'dead hang',
        movementType: 'STATIC',
    },
    {
        name: 'dumbbell bicep curl',
        movementType: 'PULL',
    },
    {
        name: 'dumbbell concentration curl',
        movementType: 'PULL',
    },
    {
        name: 'dumbbell front raise',
        movementType: 'PUSH',
    },
    {
        name: 'dumbbell hammer curl',
        movementType: 'PULL',
    },
    {
        name: 'dumbbell lateral raise',
        movementType: 'PUSH',
    },
    {
        name: 'dumbbell preacher curl',
        movementType: 'PULL',
    },
    {
        name: 'dumbbell rear delt raise',
        movementType: 'PUSH',
    },
    {
        name: 'dumbbell row',
        movementType: 'PULL',
    },
    {
        name: 'dumbbell shoulder press',
        movementType: 'PUSH',
    },
    {
        name: 'dumbbell snatch',
        movementType: 'PULL',
    },
    {
        name: 'dumbbell squeeze press',
        movementType: 'PUSH',
    },
    {
        name: 'dumbbell tricep extension',
        movementType: 'PUSH',
    },
    {
        name: 'dumbbell tricep kickback',
        movementType: 'PUSH',
    },
    {
        name: 'ez-bar curl',
        movementType: 'PULL',
    },
    {
        name: 'lat pull down',
        movementType: 'PULL',
    },
    {
        name: 'leg pull-in',
        movementType: 'PULL',
    },
    {
        name: 'leg raise',
        movementType: 'PUSH',
    },
    {
        name: 'machine hamstring curl',
        movementType: 'PULL',
    },
    {
        name: 'machine leg extension',
        movementType: 'PUSH',
    },
    {
        name: 'plank',
        movementType: 'STATIC',
    },
    {
        name: 'power clean',
        movementType: 'PULL',
    },
    {
        name: 'power snatch',
        movementType: 'PULL',
    },
    {
        name: 'PULL up',
        movementType: 'PULL',
    },
    {
        name: 'PUSH up',
        movementType: 'PUSH',
    },
    {
        name: 'single-arm cable row',
        movementType: 'PULL',
    },
    {
        name: 'single-arm dumbbell row',
        movementType: 'PULL',
    },
    {
        name: 'sit up',
        movementType: 'PULL',
    },
    {
        name: 'tricep dip',
        movementType: 'PUSH',
    },
];

const exercisesOnMuscleGroups = [
    {
        exerciseId: 1,
        muscleGroupId: 14,
    },
    {
        exerciseId: 1,
        muscleGroupId: 15,
    },
    {
        exerciseId: 1,
        muscleGroupId: 16,
    },
    {
        exerciseId: 2,
        muscleGroupId: 9,
    },
    {
        exerciseId: 2,
        muscleGroupId: 10,
    },
    {
        exerciseId: 2,
        muscleGroupId: 13,
    },
    {
        exerciseId: 3,
        muscleGroupId: 5,
    },
    {
        exerciseId: 3,
        muscleGroupId: 7,
    },
    {
        exerciseId: 3,
        muscleGroupId: 16,
    },
    {
        exerciseId: 4,
        muscleGroupId: 9,
    },
    {
        exerciseId: 4,
        muscleGroupId: 11,
    },
    {
        exerciseId: 4,
        muscleGroupId: 10,
    },
    {
        exerciseId: 4,
        muscleGroupId: 13,
    },
    {
        exerciseId: 4,
        muscleGroupId: 15,
    },
    {
        exerciseId: 5,
        muscleGroupId: 4,
    },
    {
        exerciseId: 5,
        muscleGroupId: 9,
    },
    {
        exerciseId: 5,
        muscleGroupId: 10,
    },
    {
        exerciseId: 5,
        muscleGroupId: 11,
    },
    {
        exerciseId: 5,
        muscleGroupId: 15,
    },
    {
        exerciseId: 6,
        muscleGroupId: 4,
    },
    {
        exerciseId: 6,
        muscleGroupId: 13,
    },
    {
        exerciseId: 7,
        muscleGroupId: 9,
    },
    {
        exerciseId: 8,
        muscleGroupId: 9,
    },
    {
        exerciseId: 8,
        muscleGroupId: 10,
    },
    {
        exerciseId: 9,
        muscleGroupId: 7,
    },
    {
        exerciseId: 9,
        muscleGroupId: 14,
    },
    {
        exerciseId: 9,
        muscleGroupId: 16,
    },
    {
        exerciseId: 10,
        muscleGroupId: 6,
    },
    {
        exerciseId: 10,
        muscleGroupId: 9,
    },
    {
        exerciseId: 10,
        muscleGroupId: 10,
    },
    {
        exerciseId: 10,
        muscleGroupId: 13,
    },
    {
        exerciseId: 11,
        muscleGroupId: 4,
    },
    {
        exerciseId: 11,
        muscleGroupId: 15,
    },
    {
        exerciseId: 12,
        muscleGroupId: 14,
    },
    {
        exerciseId: 12,
        muscleGroupId: 15,
    },
    {
        exerciseId: 12,
        muscleGroupId: 16,
    },
    {
        exerciseId: 13,
        muscleGroupId: 9,
    },
    {
        exerciseId: 13,
        muscleGroupId: 13,
    },
    {
        exerciseId: 13,
        muscleGroupId: 14,
    },
    {
        exerciseId: 13,
        muscleGroupId: 15,
    },
    {
        exerciseId: 14,
        muscleGroupId: 6,
    },
    {
        exerciseId: 14,
        muscleGroupId: 9,
    },
    {
        exerciseId: 14,
        muscleGroupId: 10,
    },
    {
        exerciseId: 14,
        muscleGroupId: 13,
    },
    {
        exerciseId: 15,
        muscleGroupId: 7,
    },
    {
        exerciseId: 16,
        muscleGroupId: 4,
    },
    {
        exerciseId: 16,
        muscleGroupId: 14,
    },
    {
        exerciseId: 17,
        muscleGroupId: 16,
    },
    {
        exerciseId: 18,
        muscleGroupId: 6,
    },
    {
        exerciseId: 19,
        muscleGroupId: 7,
    },
    {
        exerciseId: 20,
        muscleGroupId: 4,
    },
    {
        exerciseId: 21,
        muscleGroupId: 2,
    },
    {
        exerciseId: 22,
        muscleGroupId: 4,
    },
    {
        exerciseId: 23,
        muscleGroupId: 5,
    },
    {
        exerciseId: 24,
        muscleGroupId: 5,
    },
    {
        exerciseId: 25,
        muscleGroupId: 5,
    },
    {
        exerciseId: 25,
        muscleGroupId: 7,
    },
    {
        exerciseId: 25,
        muscleGroupId: 14,
    },
    {
        exerciseId: 26,
        muscleGroupId: 5,
    },
    {
        exerciseId: 27,
        muscleGroupId: 14,
    },
    {
        exerciseId: 27,
        muscleGroupId: 15,
    },
    {
        exerciseId: 28,
        muscleGroupId: 5,
    },
    {
        exerciseId: 29,
        muscleGroupId: 4,
    },
    {
        exerciseId: 29,
        muscleGroupId: 15,
    },
    {
        exerciseId: 30,
        muscleGroupId: 4,
    },
    {
        exerciseId: 30,
        muscleGroupId: 5,
    },
    {
        exerciseId: 30,
        muscleGroupId: 15,
    },
    {
        exerciseId: 31,
        muscleGroupId: 14,
    },
    {
        exerciseId: 31,
        muscleGroupId: 15,
    },
    {
        exerciseId: 32,
        muscleGroupId: 16,
    },
    {
        exerciseId: 33,
        muscleGroupId: 7,
    },
    {
        exerciseId: 33,
        muscleGroupId: 16,
    },
    {
        exerciseId: 34,
        muscleGroupId: 16,
    },
    {
        exerciseId: 35,
        muscleGroupId: 16,
    },
    {
        exerciseId: 36,
        muscleGroupId: 5,
    },
    {
        exerciseId: 37,
        muscleGroupId: 4,
    },
    {
        exerciseId: 38,
        muscleGroupId: 2,
    },
    {
        exerciseId: 39,
        muscleGroupId: 2,
    },
    {
        exerciseId: 39,
        muscleGroupId: 11,
    },
    {
        exerciseId: 40,
        muscleGroupId: 10,
    },
    {
        exerciseId: 41,
        muscleGroupId: 13,
    },
    {
        exerciseId: 42,
        muscleGroupId: 2,
    },
    {
        exerciseId: 42,
        muscleGroupId: 11,
    },
    {
        exerciseId: 43,
        muscleGroupId: 4,
    },
    {
        exerciseId: 43,
        muscleGroupId: 5,
    },
    {
        exerciseId: 43,
        muscleGroupId: 6,
    },
    {
        exerciseId: 43,
        muscleGroupId: 9,
    },
    {
        exerciseId: 43,
        muscleGroupId: 10,
    },
    {
        exerciseId: 43,
        muscleGroupId: 11,
    },
    {
        exerciseId: 43,
        muscleGroupId: 13,
    },
    {
        exerciseId: 43,
        muscleGroupId: 15,
    },
    {
        exerciseId: 44,
        muscleGroupId: 10,
    },
    {
        exerciseId: 44,
        muscleGroupId: 13,
    },
    {
        exerciseId: 44,
        muscleGroupId: 15,
    },
    {
        exerciseId: 45,
        muscleGroupId: 4,
    },
    {
        exerciseId: 46,
        muscleGroupId: 7,
    },
    {
        exerciseId: 46,
        muscleGroupId: 14,
    },
    {
        exerciseId: 46,
        muscleGroupId: 16,
    },
    {
        exerciseId: 47,
        muscleGroupId: 4,
    },
    {
        exerciseId: 47,
        muscleGroupId: 14,
    },
    {
        exerciseId: 47,
        muscleGroupId: 15,
    },
    {
        exerciseId: 48,
        muscleGroupId: 4,
    },
    {
        exerciseId: 48,
        muscleGroupId: 14,
    },
    {
        exerciseId: 48,
        muscleGroupId: 15,
    },
    {
        exerciseId: 49,
        muscleGroupId: 2,
    },
    {
        exerciseId: 50,
        muscleGroupId: 16,
    },
];

module.exports = {
    muscleGroups,
    exercises,
    exercisesOnMuscleGroups,
};
