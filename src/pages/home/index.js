import React from "react";
import "./style.css";
import { SignInBtn } from "../../components";
import { Navbar, CreatePost } from "../../containers";
import Feed from "../../containers/feed";
import StoryFeed from "../../containers/story-feed";
import CreateStory from "../../containers/create-story";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <StoryFeed />
      <CreateStory />
      <CreatePost />
      <Feed />
    </div>
  );
}
