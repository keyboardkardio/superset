import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

interface IProps {
    to: string;
    color?: string;
    children: React.ReactNode;
}

export function PrimaryButton(props: IProps) {
    return (
        <Button
            as={Link}
            to={`${props.to}`}
            size={'lg'}
            w={'100%'}
            variant={'outline'}
            color={props.color || 'gray.100'}
            backdropFilter={'auto'}
            backdropBlur={'sm'}
            backgroundColor={'rgba(255, 255, 255, 0.1)'}
        >
            {props.children}
        </Button>
    );
}
