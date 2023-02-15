import React from 'react';
import { Card as ChakraCard } from '@chakra-ui/react';

interface IProps {
    padding?: string;
    children: React.ReactNode;
}

export function Card(props: IProps) {
    return (
        <ChakraCard
            variant={'outline'}
            backdropFilter={'auto'}
            backdropBlur={'sm'}
            backgroundColor={'rgba(255, 255, 255, 0.15)'}
            padding={props.padding || '1rem'}
        >
            {props.children}
        </ChakraCard>
    );
}
