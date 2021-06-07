import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core';

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
    {
        value: 0,
    },
    {
        value: 25,
    },
    {
        value: 50,
    },
    {
        value: 75,
    },
    {
        value: 100,
    },
];

const useStyles = makeStyles({
    root: {
        color: action => action.color,
        height: 2,
        padding: '15px 0',
        width: 200
    },
    thumb: {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        marginTop: -14,
        marginLeft: -14,
        '&:focus, &:hover, &$active': {
            boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 12px)',
        top: -18,
        '& *': {
            background: 'rgba(255,255,255, 0)',
            color: '#000',
        },
    },
    track: {
        height: 2,
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
});

export default function CustomSlider({value, setValue, action}) {

    const handleChange = (event, newValue) => {
        setValue(action, newValue);
    };

    const styles = useStyles(action);

    return (
        <div style={{marginBottom: '2rem'}}>
            <div style={{marginBottom: '1.5rem'}}>{action.label}</div>
            <Slider
                classes={styles}
                defaultValue={value}
                onChange={handleChange}
                aria-label="ios slider"
                marks={marks}
                valueLabelDisplay="on" />
        </div>
    );
}
