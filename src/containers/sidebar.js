import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListItemIcon,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Public as PublicIcon,
} from '@material-ui/icons';

import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';

import { createPost } from '../graphql/mutations';
import { useHistory } from 'react-router';

const drawerWidth = 340;
const MAX_POST_CONTENT_LENGTH = 140;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'relative',
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
  },
  toolbar: theme.mixins.toolbar,
  textField: {
    width: drawerWidth,
  },
  list: {
    // overflowWrap: 'break-word',
    width: 300,
  },
}));

export default function Sidebar({activeListItem}) {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');


// when handleChange function is called from a TextField component, information is passed as arguement
// setValue updates a new TextField value
// Verification of no more than 140 characters 
    
  const handleChange = event => {
    setValue(event.target.value);
    if (event.target.value.length > MAX_POST_CONTENT_LENGTH) {
      setIsError(true);
      setHelperText(MAX_POST_CONTENT_LENGTH - event.target.value.length);
    } else {
      setIsError(false);
      setHelperText('');
    }
  };
// when running amplify mock api or amplify push GraphQL Operations are generated at .src/graphql
// using createPost, the onPost method performs Post-creation Mutation
// Value of TextField stored in value state is used
// If mutation succeeds, setValue('') sets the TextField value to an empty string
  const onPost = async () => {
    const res = await API.graphql(graphqlOperation(createPost, { input: {
      type: 'post',
      content: value,
      timestamp: Math.floor(Date.now() / 1000),
    }})); 

    console.log(res)
    setValue('');
  }

  // Sign-out uses Auth module
  // When sign-out performs, withAuthenticator detects it's no longer in sign-in state 
  // returns to sign-in screen
  const signOut = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem
          button
          selected={activeListItem === 'global-timeline'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('/global-timeline');
            })
          }}
          key='global-timeline'
        >
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Global Timeline" />
        </ListItem>
        <ListItem
          button
          selected={activeListItem === 'profile'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('/' + user.username);
            })
          }}
          key='profile'
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        {/* passes the value state in the TextField input value 
           if the TextField Value is changed by user, pass handleChange function in onChange={handleChange} */}

        <ListItem key='post-input-field'>
          <ListItemText primary={
            <TextField
              error={isError}
              helperText={helperText}
              id="post-input"
              label="Type your post!"
              multiline
              rowsMax="8"
              variant="filled"
              value={value}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          } />
        </ListItem>
        <ListItem key='post-button'>
          <ListItemText primary={
            <Button
              variant="contained"
              color="primary"
              disabled={isError}
              onClick={onPost}
              fullWidth
            >
              Post
            </Button>
          } />
        </ListItem>
        <ListItem key='logout'>
          <ListItemText primary={
            <Button
              variant="outlined"
              onClick={signOut}
              fullWidth
            >
              Logout
            </Button>
          } />
        </ListItem>
      </List>
    </Drawer>
  )
}