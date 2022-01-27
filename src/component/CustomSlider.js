import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Tooltip from '@mui/material/Tooltip';

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

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

const inputStyles = makeStyles({
    input: {
        marginLeft: 10,
        transform: 'translateY(-10px)'
    },
});

export default function CustomSlider({handleActionValueChange, action, isActive}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        newValue = Number(newValue).toString()
        setValue(newValue);
        handleActionValueChange(action, newValue)
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
        handleActionValueChange(action, event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        }
        // else if (value > action.max) {
        //     setValue(action.max);
        // }
    };

    const styles = useStyles(action);
    const classes = inputStyles();

    return (
        <div className={"action-slider-wrapper"}>
            <div style={{marginBottom: '1.5rem'}} className={"d-flex justify-content-between"}>
                <div>{action.label}</div>
                <div className={"action-value"}>
                    <Tooltip title="kgCO2eq">
                        <div>
                            {action.value}
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div className={"d-flex"}>
                <Slider
                    classes={styles}
                    onChange={handleChange}
                    aria-label="ios slider"
                    marks={[
                        {
                            value: 0,
                        },
                        {
                            value: (action.max / 4),
                        },
                        {
                            value: (action.max / 4) * 2,
                        },
                        {
                            value: (action.max / 4) * 3,
                        },
                        {
                            value: (action.max / 4) * 4,
                        },
                    ]}
                    min={action.min}
                    max={action.max}
                    value={isActive ? value : 0}
                    valueLabelDisplay="on" />
                <Input
                    className={classes.input}
                    style={{ width: 42 + 4 * action.value.toString().length}}
                    value={isActive ? Number(value).toString() : 0}
                    margin="dense"
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    max={10000000000}
                    inputProps={{
                        type: 'number',
                        'aria-labelledby': 'ios slider',
                        max: 10000000000
                    }}
                />
            </div>
        </div>
    );
}
