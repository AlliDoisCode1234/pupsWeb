
import React from 'react';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';

import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AllPosts from '../src/allposts';
import PostsBySpecifiedUser from './posts-by-specified-user';

import Amplify from '@aws-amplify/core';
import PubSub from '@aws-amplify/pubsub'
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);
PubSub.configure(awsmobile)

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1EA1F2',
      contrastText: "#fff",
    },
    background: {
      default: '#15202B',
      paper: '#15202B',
    },
    divider: '#37444C',
  },
  overrides: {
    MuiButton: {
      color: 'white',
    },
  },
  typography: {
    fontFamily: [
      'Arial', 
    ].join(','),
  },
  status: {
    danger: 'orange',
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    width: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  appBar: {
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <Switch>
            <Route exact path='/' component={AllPosts} />
            <Route exact path='/global-timeline' component={AllPosts} />
            <Route exact path='/:userId' component={PostsBySpecifiedUser}/>
            <Redirect path="*" to="/" />
          </Switch>
        </HashRouter>
      </ThemeProvider>
    </div>
  );
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});



// import { React, useState, useEffect} from 'react';
// import "./App.css";
// import { API, Storage } from 'aws-amplify';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// import { listNotes } from './graphql/queries';
// import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
// import logo from "./assets/img/logo.png";
// import Navabar from "./containers/navabar";



// const initialFormState = { name: '', description: '' }

// function App() {
//   const [notes, setNotes] = useState([]);
//   const [formData, setFormData] = useState(initialFormState);

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   async function onChange(e) {
//     if (!e.target.files[0]) return
//     const file = e.target.files[0];
//     setFormData({ ...formData, image: file.name });
//     await Storage.put(file.name, file);
//     fetchNotes();
//   }

//   async function fetchNotes() {
//     const apiData = await API.graphql({ query: listNotes });
//     const notesFromAPI = apiData.data.listNotes.items;
//     await Promise.all(notesFromAPI.map(async note => {
//       if (note.image) {
//         const image = await Storage.get(note.image);
//         note.image = image;
//       }
//       return note;
//     }))
//     setNotes(apiData.data.listNotes.items);
//   }

//   async function createNote() {
//     if (!formData.name || !formData.description) return;
//     await API.graphql({ query: createNoteMutation, variables: { input: formData } });
//     setNotes([ ...notes, formData ]);
//     setFormData(initialFormState);
//   }

//   async function deleteNote({ id }) {
//     const newNotesArray = notes.filter(note => note.id !== id);
//     setNotes(newNotesArray);
//     await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
//   }

  

//   return (
//     <div className="App">

//       <img className="logo" src={logo} alt="Logo" />
//       <input
//         type="file"
//         onChange={onChange}
//       />
//       <input
//         onChange={e => setFormData({ ...formData, 'name': e.target.value})}
//         placeholder="Post title"
//         value={formData.name}
//       />
//       <input
//         onChange={e => setFormData({ ...formData, 'description': e.target.value})}
//         placeholder="Post description"
//         value={formData.description}
//       />
//       <button onClick={createNote}>Create Post</button>
//       <div style={{marginBottom: 30}}>
//         {
//           notes.map(note => (
//             <div key={note.id || note.name}>
//               <h2>{note.name}</h2>
//               <p>{note.description}</p>
//               <button onClick={() => deleteNote(note)}>Delete Post</button>
//               {
//                 note.image && <img src={note.image} style={{width: 400}} />
//               }
//             </div>
//           ))
//         }
//       </div>
//       <AmplifySignOut />
//     </div>
//   );
// }

// export default withAuthenticator(App);