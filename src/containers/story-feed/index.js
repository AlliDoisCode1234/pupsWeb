import React, { useState, useEffect } from "react";
import "./style.css";
import { db, storage } from "../../firebase";
import { Story } from "..";


export default function StoryFeed() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    db.collection("stories").onSnapshot((snapshot) => {
      setStories(snapshot.docs.map((doc) => ({ id: doc.id, story: doc.data() })));
    });
  }, []);

  return (
    <div className="storyFeed">
      {stories.map(({ id, story }) => {
        return (
          <Story
            key={id}
            id={id}
            profileUrl={story.profileUrl}
            username={story.username}
            photoURl={story.photoUrl}
            replyCaption={story.replyCaption}
            replies={story.replies}
          />
        );
      })}
    </div>
  );
}