import React, { useEffect } from 'react';
import {getUserInfo} from '../../Helpers/fetchRequests.js';
import defaultProfileIcon from '../../assets/images/profile-icon.png';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import ChatIcon from '@material-ui/icons/Chat';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import ForumIcon from '@material-ui/icons/Forum';
import DescriptionIcon from '@material-ui/icons/Description';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
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
    linkHeader: {
        textDecoration: 'none',
        color: 'white',
        fontFamily: 'Roboto'
    },
    paper: {
        background: '#ffffff'
    },
    homepage: {
        marginLeft: -250,
        width: '100vw'
    }
});

function NavBar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (side, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
    };
    const[url,setUrl]=React.useState(null);
    const[name,setName]=React.useState(null);
    const[mobile,setMobile]=React.useState(false)
    const handleResize = () =>{
        if(window.innerWidth<=575){
            setMobile(true)
        }
        else{
            setMobile(false)
        }
    }
    const checkHomepage = () =>{
        if(window.location.pathname==='/'){
            props.setHomepage(true)
        }
        else{
            props.setHomepage(false)
        }
    }
    const logoutUser = () => {
        Cookies.remove('jwt');
        props.setLoggedIn(0);
        Cookies.remove('refreshToken')
        localStorage.clear()
    }
    useEffect(()=>{
        checkHomepage();
        window.addEventListener('popstate', (event) => {        //This will ensure that the navbar checks whether current page is homepage or not if user navigates via browser's back button
            checkHomepage();
        });
        handleResize();
        window.addEventListener('resize', handleResize);
        if(props.loggedIn){
            async function setDeatils(){
                var storedUserData = await getUserInfo(null,null);
                try{
                    setUrl(`/api/users/${storedUserData.id}/avatar`);
                    setName(storedUserData.name);
                }
                catch(error){
                    console.log(error)
                }
            }
            setDeatils();
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.loggedIn,window.location.pathname,props.homepage])
    const sideList = side => (
        <div
            className={classes.list}
            role='presentation'
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            {props.loggedIn?
                <React.Fragment>
                    <br/>
                        <div align="center">
                            <img src={url} alt="Avatar" onError={()=>{setUrl(defaultProfileIcon)}} height={120} width={120} style={{borderRadius:"50%"}}/>
                        </div>
                    <Typography variant="h6" style={{textAlign:"center"}}>{name}</Typography>
                    <br/>
                </React.Fragment>
                :
                null
            }
            <List>
                <Divider/>
                <NavLink
                    className={classes.link}
                    to='/'
                >
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                </NavLink>
                <Divider />
                {!props.loggedIn ?
                    <React.Fragment>
                        <NavLink
                            className={classes.link}
                            to='/login'
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleIcon />
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
                            to='/search'
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <SearchSharpIcon />
                                </ListItemIcon>
                                <Typography>Search</Typography>
                            </ListItem>
                        </NavLink>
                        <Divider />
                                
                        <NavLink
                            className={classes.link}
                            to='/profile'
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <Typography>Profile</Typography>
                            </ListItem>
                        </NavLink>
                        <Divider />
                        <NavLink
                            className={classes.link}
                            to='/edit'
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <EditIcon />
                                </ListItemIcon>
                                <Typography>Edit Profile</Typography>
                            </ListItem>
                        </NavLink>
                        <Divider />
                        <NavLink
                            className={classes.link}
                            to='/chat'
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <ChatIcon />
                                </ListItemIcon>
                                <Typography>Chat</Typography>
                            </ListItem>
                        </NavLink>
                        <Divider />
                    </React.Fragment>
                }
                <NavLink
                    className={classes.link}
                    to='/forum'
                >
                    <ListItem button>
                        <ListItemIcon>
                            <ForumIcon />
                        </ListItemIcon>
                        <Typography>Forum</Typography>
                    </ListItem>
                </NavLink>
                <Divider />
                <NavLink
                    className={classes.link}
                    to='/resources'
                >
                    <ListItem button>
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <Typography>Resources</Typography>
                    </ListItem>
                </NavLink>
                <Divider />
                
                {props.loggedIn?
                <React.Fragment>
                    <Divider />
                    <NavLink
                        className={classes.link}
                        to='/add-forum'
                    >
                        <ListItem button>
                            <ListItemIcon>
                            <AddCommentIcon />
                            </ListItemIcon>
                            <Typography>Add Forum</Typography>
                        </ListItem>
                    </NavLink>
                    <NavLink
                        className={classes.link}
                        to='/add-resource'
                    >
                        <ListItem button>
                            <ListItemIcon>
                                <PostAddIcon />
                            </ListItemIcon>
                            <Typography>Add Resources</Typography>
                        </ListItem>
                    </NavLink>
                    <NavLink
                        className={classes.link}
                        to='/'
                    >
                        <ListItem button onClick={logoutUser}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <Typography>Logout</Typography>
                        </ListItem>
                    </NavLink>
                    <Divider />
                </React.Fragment>
                :
                null
            }
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <div className={classes.root} style={props.homepage&&!mobile?{marginLeft:'-250px'}:null}>
                <AppBar position='static'>
                    <Toolbar>
                        {props.homepage?
                            <IconButton
                                onClick={toggleDrawer('left', true)}
                                edge='start'
                                color='inherit'
                                className={classes.menuButton}
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                        :
                            <Hidden smUp implementation="css">
                                <IconButton
                                    onClick={toggleDrawer('left', true)}
                                    edge='start'
                                    color='inherit'
                                    className={classes.menuButton}
                                    aria-label="menu"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>
                        }
                        <Typography variant='h4' className={classes.title}>
                            <NavLink
                                className={classes.linkHeader}
                                to='/'
                                onClick={()=>props.setHomepage(true)}
                            ><Typography variant='h4'>Masters Information Portal</Typography>
                            </NavLink>
                        </Typography>
                        {
                            !props.loggedIn ?
                                <NavLink
                                    className={classes.linkHeader}
                                    to='/login'
                                    onClick={()=>props.setHomepage(false)}
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
                                    <Button size='large' color='inherit' onClick={logoutUser}>
                                        Logout
                                    </Button>
                                </NavLink>
                        }
                    </Toolbar>
                </AppBar>
            </div>
            {props.homepage?
                <Drawer
                    open={state.left}
                    onClose={toggleDrawer('left', false)}
                    classes={{ paper: classes.paper }}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {sideList('left')}
                </Drawer>
            :
                <React.Fragment>
                    <Hidden smUp implementation="css">
                        <Drawer
                            open={state.left}
                            onClose={toggleDrawer('left', false)}
                            classes={{ paper: classes.paper }}
                            ModalProps={{
                              keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {sideList('left')}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            classes={{ paper: classes.paper }}
                            variant='permanent'
                        >
                            {sideList('left')}
                        </Drawer>
                    </Hidden>
                </React.Fragment>
            }
            <br/>
            <br/>
        </React.Fragment>
    );
}

export default NavBar;
