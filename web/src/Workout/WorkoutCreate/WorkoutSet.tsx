import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, InputGroup, InputRightElement, NumberInput, NumberInputField, Stack } from '@chakra-ui/react';
import { FormValues } from '.';

interface IProps {
    nestIndex: number;
    control: Control<FormValues>;
    register: UseFormRegister<FormValues>;
}

export function WorkoutSet({ nestIndex, control, register }: IProps) {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `workoutItems.${nestIndex}.sets` as const,
    });

    return (
        <Stack spacing={4} w={'100%'}>
            {fields.map((item, k) => (
                <Stack key={item.id} direction={'row'} w={'100%'}>
                    <NumberInput size={'lg'} w={'100%'}>
                        <InputGroup size={'lg'}>
                            <NumberInputField
                                color={'gray.400'}
                                {...register(`workoutItems.${nestIndex}.sets.${k}.reps` as const)}
                            />
                            <InputRightElement
                                children={'reps'}
                                color={'gray.400'}
                                paddingRight={4}
                            />
                        </InputGroup>
                    </NumberInput>
                    <NumberInput size={'lg'} w={'100%'}>
                        <InputGroup size={'lg'}>
                            <NumberInputField
                                color={'gray.400'}
                                {...register(`workoutItems.${nestIndex}.sets.${k}.weight` as const)}
                            />
                            <InputRightElement
                                children={'lbs'}
                                color={'gray.400'}
                                paddingRight={4}
                            />
                        </InputGroup>
                    </NumberInput>
                    <Button type={'button'} size={'lg'} bg={'none'} onClick={() => remove(k)}>
                        <DeleteIcon color={'red.600'} boxSize={8} />
                    </Button>
                </Stack>
            ))}

            <Button
                type={'button'}
                size={'lg'}
                variant={'outline'}
                color={'gray.400'}
                backdropBlur={'md'}
                backdropFilter={'auto'}
                bgColor={'rgba(255, 255, 255, 0.1)'}
                onClick={() => append({ reps: 0, weight: 0 })}
            >
                Add Set
            </Button>
        </Stack>
    );
}
