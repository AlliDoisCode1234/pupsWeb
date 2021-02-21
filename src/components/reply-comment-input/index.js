import React, { useState, useContext } from "react";
import "./style.css";
import { UserContext } from "../../contexts/user";
import { db } from "../../firebase";

export default function ReplyCommentInput({ replies, id }) {
  const [user, setUser] = useContext(UserContext).user;
  const [reply, setReply] = useState("");
  const [replyArray, setReplyArray] = useState(replies ? replies : []);

  const addReply = () => {
    if (reply != "") {
      // add reply to the story info

      replyArray.push({
        reply: reply,
        username: user.email.replace("@gmail.com", "").toLowerCase(),
      });

      db.collection("replies")
        .doc(id)
        .update({
          replies: replyArray,
        })
        .then(function () {
          setReply("");
          console.log("reply added");
        })
        .catch(function (error) {
          console.log(`Error ${error}`);
        });
    }
  };

  return (
    <div className="replyCommentInput">
      <textarea
        className="replyCommentInput__textarea"
        rows="1"
        placeholder="write a reply.."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></textarea>

      <button onClick={addReply} className="replyCommentInput__btn">
        Reply
      </button>
    </div>
  );
}
