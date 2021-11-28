import {
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import React, {useState} from 'react';

const Header = ({mode, setMode}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setMobileMenuOpen(!mobileMenuOpen);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
        >
            <List>
                {['home', 'individual', 'collective'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText onClick={() => setMode(text)} className={("menu-item " + (mode === text ? 'menu-item-active' : ''))} primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <div className={"header d-flex justify-content-between flex-wrap align-items-center"}>
                <div className={"app-title"} onClick={() => setMode('home')} >Footprint</div>
                <div>
                    <ul className={"desktop-header"}>
                        <li onClick={() => setMode('home')} className={mode === 'home' ? 'active' : ''}>Home</li>
                        <li onClick={() => setMode('individual')} className={mode === 'individual' ? 'active' : ''}>Individual</li>
                        <li onClick={() => setMode('collective')} className={mode === 'collective' ? 'active' : ''}>Collective</li>
                    </ul>
                    <div className={"mobile-header"}>
                        <Button onClick={toggleDrawer()}>Menu</Button>
                        <Drawer
                            anchor={'right'}
                            open={mobileMenuOpen}
                            onClose={toggleDrawer()}
                        >
                            {list()}
                        </Drawer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;