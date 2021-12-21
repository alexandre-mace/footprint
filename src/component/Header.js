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
                {[].map((text, index) => (
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
                <a className={"app-title d-flex align-items-center"} href={"/"}>
                    <img className={"mr-2"} height={27} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/foot_1f9b6.png" alt="Logo du projet"/>
                    Footprint
                </a>
                <div className={"climate-lab d-flex align-items-center"}>
                    <div className={"mr-3"}>un outil du </div>
                    <a target="_blank" rel="noopener noreferrer" className={"d-flex align-items-center climate-lab-link"} href="https://climatelab.fr"><img height={27} width={27} className={"logo-img mr-1"} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/alembic_2697-fe0f.png" alt="Alambic"/> ClimateLab</a>
                </div>
                    {/*<div className={"mobile-header"}>*/}
                    {/*    <Button onClick={toggleDrawer()}>Menu</Button>*/}
                    {/*    <Drawer*/}
                    {/*        anchor={'right'}*/}
                    {/*        open={mobileMenuOpen}*/}
                    {/*        onClose={toggleDrawer()}*/}
                    {/*    >*/}
                    {/*        /!*{list()}*!/*/}
                    {/*    </Drawer>*/}
                    {/*</div>*/}
            </div>
        </>
    )
}

export default Header;