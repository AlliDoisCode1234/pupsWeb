import React, { useState, useContext } from "react";
import "./style.css";
import { storage, db } from "../../firebase";
import { UserContext } from "../../contexts/user";
import ReplyCommentInput from "../../components/reply-comment-input";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReplyComment from "../../components/replyComment";


export default function Story({
  profileUrl,
  username,
  id,
  photoURl,
  replyCaption,
  replies,
}) {
  const [user, setUser] = useContext(UserContext).user;
  const deleteStory = () => {
    // delete the image from firebase storage

    // get ref to the image file we like to delete
    let imageRef = storage.refFromURL(photoURl);

    // delete the file
    imageRef
      .delete()
      .then(function () {
        console.log("delete successfull");
      })
      .catch(function (error) {
        console.log(`Error ${error}`);
      });

    //2 delete the story info from firebase firestore
    db.collection("stories")
      .doc(id)
      .delete()
      .then(function () {
        console.log("delete post info successfull");
      })
      .catch(function (error) {
        console.log(`Error post info delete ${error}`);
      });
  };
  return (
    <div className="story">
      <div className="story__header">
        <div className="story__headerLeft">
          <img className="story__profilePic" src={profileUrl} />
          <p style={{ marginLeft: "8px" }}>{username}</p>
        </div>
        <HighlightOffIcon onClick={deleteStory} className="story__delete">
         
        </HighlightOffIcon>
      </div>

      <div className="story__center">
        <img className="story__photoUrl" src={photoURl} />
      </div>

      <div>
        <p>
          <span style={{ fontWeight: "500", marginRight: "4px" }}>
            {username}
          </span>
          {replyCaption}
        </p>
      </div>

      {replies ? (
        replies.map((reply) => (
          <ReplyComment username={reply.username} replyCaption={reply.reply} />
        ))
      ) : (
        <></>
      )}

      {user ? <ReplyCommentInput replies={replies} id={id} /> : <></>}
    </div>

  );
}