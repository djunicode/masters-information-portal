//@Backend 
//setLoggedIn(1);  if user is logged in
//setLoggedIn(0);  if no user logged in
//I wish to use the above function whenever the user is loggedIn, this will display profile & logout instead of login

import React,{useState} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ForumIcon from '@material-ui/icons/Forum';
import DescriptionIcon from '@material-ui/icons/Description';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
        textAlign: 'left',
        font: 'Roboto',
        marginLeft: 40,
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        fontFamily: 'Roboto'
    },
    linkHeader:{
        textDecoration: 'none',
        color: 'white',
        fontFamily: 'Roboto'
    }
});

function NavBar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [side]: open });
    };
    const [loggedIn,setLoggedIn]=useState(0);

    const sideList = side => (
        <div
            className={classes.list}
            role='presentation'
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <NavLink
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                        fontFamily: 'Roboto'
                    }}
                    to='/'
                >
                    <ListItem button>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                     </ListItem>
                </NavLink>
                <Divider />
                {!loggedIn?
                    <React.Fragment>
                        <NavLink
                            className={classes.link}
                            to='/login'
                        >
                            <ListItem button>
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                                <Typography>Login</Typography>
                            </ListItem>
                        </NavLink>
                    <Divider />
                    </React.Fragment>
                    :
                    <React.Fragment>
                    <NavLink
                            className={classes.link}
                            to='/'
                        >
                            <ListItem button>
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                                <Typography>Profile</Typography>
                            </ListItem>
                        </NavLink>
                    <Divider />
                    </React.Fragment>
                }
                <NavLink
                        className={classes.link}
                        to='/'
                    >
                <ListItem button>
                        <ListItemIcon>
                            <ForumIcon/>
                        </ListItemIcon>
                            <Typography>Forum</Typography>
                        </ListItem>
                    </NavLink>
                <Divider />
                <NavLink
                        className={classes.link}
                        to='/'
                    >
                <ListItem button>
                        <ListItemIcon>
                            <ChatIcon/>
                        </ListItemIcon>
                            <Typography>Chat</Typography>
                        </ListItem>
                    </NavLink>
                <Divider />
                <NavLink
                        className={classes.link}
                        to='/'
                    >
                <ListItem button>
                        <ListItemIcon>
                            <DescriptionIcon/>
                        </ListItemIcon>
                            <Typography>Resources</Typography>
                        </ListItem>
                    </NavLink>
                <Divider />
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton
                            onClick={toggleDrawer('left', true)}
                            edge='start'
                            color='inherit'
                            className={classes.menuButton}
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            open={state.left}
                            onClose={toggleDrawer('left', false)}
                        >
                            {sideList('left')}
                        </Drawer>
                        
                            <Typography variant='h4' className={classes.title}>
                            <NavLink
                            className={classes.linkHeader}
                            to='/'
                         ><Typography variant='h4'>Masters Information Portal</Typography>
                        </NavLink>
                        </Typography>
                        {
                            !loggedIn?
                                <NavLink
                                    className={classes.linkHeader}
                                    to='/login'
                                >
                                    <Button size='large' color='inherit'>
                                        Login
                                    </Button>
                                </NavLink>
                            :
                                <NavLink
                                    className={classes.linkHeader}
                                    to='/'
                                >
                                    <Button size='large' color='inherit'>
                                        Logout
                                    </Button>
                                </NavLink>
                        }
                    </Toolbar>
                </AppBar>
            </div>
            <br />
            <br />
        </React.Fragment>
    );
}

export default NavBar;
