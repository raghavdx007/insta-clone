import React,{useState,useEffect} from 'react';
import './App.css';
import Post from './post';
import {db} from './firebase.js';

function App() {
const[posts,setPosts] = useState([
  ]);

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
      <div className="app_header">
      <img className="app_header_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQ4YYo7FWpeEEdGAWaMKSKClw3qvIM488bw&usqp=CAU"></img>
      </div>
      <h1>Hello world </h1>
      {
        posts.map(({id,post}) =>(
          <Post username= {post.username} caption={post.caption} imageUrl= {post.imageUrl}/>
        ))
      }
    </div>

  );
}

export default App;
