import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface IProps {
    to: string;
    color?: string;
    children: React.ReactNode;
}

export default function PrimaryButton(props: IProps) {
    return (
        <Button as={Link} to={`${props.to}`} size={'lg'} w={'100%'} variant={'outline'} color={props.color || 'gray.100'} bgColor={'rgba(255, 255, 255, 0.1)'}>
            {props.children}
        </Button>
    );
}
