import React from 'react';
import './post.css';
import Avatar from '@material-ui/core/Avatar';


function Post({username,caption,imageUrl}) {
  return (
    <div className="post">
    <div className="post_header">
      <Avatar className="post_avatar"
        alt=' Ronaldo'
        src="https://www.gannett-cdn.com/presto/2020/08/25/USAT/842737a0-5b6c-47bc-adbc-ea5bef879661-Messi_gone.jpg"/>
      <h3>{username}</h3>
      </div>

     {/*header -> avatar -> username*/}

    <img className= "post_image" src ={imageUrl}></img>
     {/*image*/}
     <h4 className="post_text"><strong>{username} </strong>{caption}</h4>
     {/*username + caption*/}

      </div>

  );
}

export default Post;
