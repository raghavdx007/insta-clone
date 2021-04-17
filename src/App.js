import React,{useState,useEffect} from 'react';
import './App.css';
import Post from './post';
import {db , auth} from './firebase.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button , Input } from '@material-ui/core'
import Logo from './assets/images/finstalogo.png';



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
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function App() {
const[posts,setPosts] = useState([]);
const[open,setOpen] = useState(false);
const[username,setUsername] = useState('');
const[email,setEmail] = useState('');
const[password,setPassword] = useState('');
const classes = useStyles();
const [modalStyle] = useState(getModalStyle);
const[user,setUser] = useState('null');
const[OpenSignIn,setOpenSignIn] = useState('false');


useEffect(() =>{

const unsubscribe = auth.onAuthStateChanged((authUser) => {
  if (authUser) {
    console.log(authUser);
    setUser(authUser);

      if (authUser.displayName){

      }

      else
      {
        return authUser.updateProfile({
          displayName:username
        })
      }
  }
  else {
    setUser(null);
  }
})

return () =>{
  unsubscribe();
}
}, [user,username]);

useEffect (() =>{
db.collection('posts').onSnapshot(snapshot => {
setPosts(snapshot.docs.map(doc => ({
id: doc.id,
post :doc.data()
})));
})
  },[]);

const signUp = (event) => {
event.preventDefault();

auth
.createUserWithEmailAndPassword(email,password)
.then((authUser) => {
  return authUser.user.updateProfile({
    displayName : username
  })
})
.catch((error) => alert(error.message))

setOpen(false);
}

const signIn = (event) => {
  event.preventDefault();

  auth
  .signInWithEmailAndPassword(email,password)
  .catch((error) => alert(error.message))

  setOpenSignIn(false);
}

  return (

    <div className="App">
      <div className="app_header_bar">
        <center>
           <img className="app_header_image" src={Logo}></img>
        </center>
     </div>
	 <div className="unique">
		<Modal
		   open={open}
		   onClose={() => setOpen(false)}
		   >
		   <div style={modalStyle} className={classes.paper}>
			 <form className= "app_signup">
				   <center>
					<img className="app_header_image" src={Logo}></img>
					</center>

					<Input
					  type="text"
					  placeholder="username"
					  value={username}
					  onChange={(e) =>setUsername(e.target.value)}
					  />
					<Input
					  placeholder="email"
					  type="text"
					  value={email}
					  onChange={(e) =>setEmail(e.target.value)}
					  />
					<Input
					  placeholder="password"
					  type="password"
					  value={password}
					  onChange={(e) =>setPassword(e.target.value)}
					/>

				  <Button type="submit" onClick = {signUp}>SignUp</Button>
				</form>
				</div>
				</Modal>

				<Modal
				   open={OpenSignIn}
				   onClose={() => setOpenSignIn(false)}
				   >
				   <div style={modalStyle} className={classes.paper}>
					 <form className= "app_signup">
						   <center>
							<img className="app_header_image" src={Logo}></img>
							</center>


							<Input
							  placeholder="email"
							  type="text"
							  value={email}
							  onChange={(e) =>setEmail(e.target.value)}
							  />
							<Input
							  placeholder="password"
							  type="password"
							  value={password}
							  onChange={(e) =>setPassword(e.target.value)}
							/>

						  <Button type="submit" onClick = {signIn}>SignIn</Button>
						</form>
						</div>
						</Modal>

		  {user ? (
			<button onClick={() => auth.signOut()}>Log Out</button>
		  ):(
			<div className="app_loginContainer">

			<button onClick={() => setOpenSignIn(true)}>Sign In</button>
			<button onClick={() => setOpen(true)}>Sign Up</button>
			</div>
		  )}

		  {
			posts.map(({id,post})  =>(
			  <Post username= {post.username} caption={post.caption} imageUrl= {post.imageUrl}/>
			))
		  }
		  </div>
      </div>
  );
}

export default App;
