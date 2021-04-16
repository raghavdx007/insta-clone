import React,{useState,useEffect} from 'react';
import './App.css';
import Post from './post';
import {db} from './firebase.js';

function App() {
const[posts,setPosts] = useState([
  ]);

useEffect (() =>{
db.collection('posts').onSnapshot(snapshot => {
setPosts(snapshot.docs.map(doc => doc.data()));
})
  },[]);


  return (
    <div className="App">
      <div className="app_header">
      <img className="app_header_image" src="https://logodix.com/logo/2062567.jpg"></img>
      </div>
      <h1>Hello world </h1>
      {
        posts.map(post =>(
          <Post username= {post.username}id= {post.id} caption={post.caption} imageUrl= {post.imageUrl}/>
        ))
      }
    </div>

  );
}

export default App;
