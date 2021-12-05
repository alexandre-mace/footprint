import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import {Checkbox} from "@material-ui/core";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function ActionsDisplayManager({ handleReset, actions, visibleActions, toggleFromVisibleActions }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {actions.map((actionCategory, key) => (
                <React.Fragment key={key}>
                    <List style={{paddingLeft: '1rem'}}>
                        <div className={"d-flex"} style={{marginBottom: '1rem'}}>
                            <img className={"category-img"} src={actionCategory.img} alt=""/>
                            <div className={"category-label"} style={{marginLeft: '15px'}}>{actionCategory.label}</div>
                        </div>
                        {actionCategory.actions.map((action, actionKey) => (
                            <ListItem key={actionKey}>
                                <div className={"d-flex align-items-center"} style={{marginRight: '1.5rem'}} key={actionKey}>
                                    <Checkbox
                                        checked={visibleActions.includes(action)}
                                        onChange={() => {toggleFromVisibleActions(action)}}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                    <div>{action.label}</div>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className={"text-center add-options-wrapper"}>
            <React.Fragment key={'right'}>
                <div className="d-flex justify-content-center flex-wrap">
                    <div className={"add-options-btn-wrapper"} style={{ marginRight: '1rem'}}>
                        <Button className={'button-black add-options'} onClick={toggleDrawer('right', true)}>Ajouter des options</Button>
                    </div>
                    <div>
                        <Button className={"reset text-right"} onClick={() => handleReset()}>Réinitialiser</Button>
                    </div>
                </div>
                <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                    {list('right')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}