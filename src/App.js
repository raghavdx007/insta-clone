import React,{useState,useEffect} from 'react';
import './App.css';
import Post from './post';
import {db , auth} from './firebase.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button , Input } from '@material-ui/core'
import Logo from './assets/images/finstafinal2.png';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';




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
db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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
          <div className="app_header">
           <img className="app_header_image" alt="logo" src={Logo}></img>

        {user ? (
       <button className="btn3" onClick={() => auth.signOut()}>Log Out</button>
       ):(
       <div className="app_loginContainer">

       <button className="btn1" onClick={() => setOpenSignIn(true)}>SIGN IN</button>
       <button className="btn2" onClick= {() => setOpen(true)}>SIGN UP</button>
       </div>
       )}
     </div>
	 <div className="unique">
		<Modal
		   open={open}
		   onClose={() => setOpen(false)}
		   >
		   <div style={modalStyle} className={classes.paper}>
			 <form className= "app_signup">
				   <center>
					<img className="app_header_image" alt="logo"src={Logo}></img>
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
							<img className="app_header_image"alt="logo" src={Logo}></img>
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


            <div className="app_posts">
              {
             posts.map(({id,post})  =>(
               <Post key={id} postId={id} user={user} username= {post.username} caption={post.caption} imageUrl= {post.imageUrl}/>
             )
           )}

            </div>
            

		  </div>


      { user?.displayName ? (
        <ImageUpload username = {user.displayName} />
        ): (
          <h3>Sorry you need to login to upload</h3>
        )
      }
      </div>
  );
}

export default App;
