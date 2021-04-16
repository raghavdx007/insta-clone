import React from 'react';
import './post.css';
import Avatar from '@material-ui/core/Avatar';


function Post({username,caption,imageUrl}) {
  return (
    <div className="post">
    <div className="post_header">
      <Avatar className="post_avatar"
        alt=' '
        src=""/>
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
