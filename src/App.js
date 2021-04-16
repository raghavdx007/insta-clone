import React,{useState,useEffect} from 'react';
import './App.css';
import Post from './post';
import {db} from './firebase.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function App() {
const[posts,setPosts] = useState([]);
const[open,setOpen] = useState(false);
const classes = useStyles();
const [modalStyle] = React.useState(getModalStyle);
useEffect (() =>{
db.collection('posts').onSnapshot(snapshot => {
setPosts(snapshot.docs.map(doc => ({
id: doc.id,
post :doc.data()
})));
})
  },[]);


  return (
    <div className="App">
    <Modal
       open={open}
       onClose={() => setOpen(false)}
       >
       <div style={modalStyle} className={classes.paper}>
       <h2> i am a modal </h2>
       </div>
       </Modal>
      <div className="app_header">
      <img className="app_header_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQ4YYo7FWpeEEdGAWaMKSKClw3qvIM488bw&usqp=CAU"></img>
      </div>
      <h1>Hello world </h1>
      {
        posts.map(({id,post})  =>(
          <Post username= {post.username} caption={post.caption} imageUrl= {post.imageUrl}/>
        ))
      }
      </div>
  );
}

export default App;
