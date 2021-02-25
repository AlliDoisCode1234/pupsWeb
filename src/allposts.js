import React, { useState, useEffect, useReducer } from 'react';

import API, { graphqlOperation } from '@aws-amplify/api';

import { listPostsSortedByTimestamp } from '../graphql/queries';
import { onCreatePost } from '../graphql/subscriptions';

import PostList from '../../components/postlist';
import Sidebar from '../../containers/sidebar';

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.posts;
    case ADDITIONAL_QUERY:
      return [...state, ...action.posts]
    case SUBSCRIPTION:
      return [action.post, ...state]
    default:
      return state;
  }
};

export default function AllPosts() {
  const [posts, dispatch] = useReducer(reducer, []);
  const [nextToken, setNextToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // fetch all users in chronological order
  // descending order of timestamp with ListPostsSortedByTimestamp
  // limit parameter controls number of records fetched (default is 10)
  // nextToken specifies a new fetch of records still using the limit parameter
  // nextToken still shows records in descending order of timeStamp
  const getPosts = async (type, nextToken = null) => {
    const res = await API.graphql(graphqlOperation(listPostsSortedByTimestamp, {
      type: "post",
      sortDirection: 'DESC',
      limit: 20, //default = 10
      nextToken: nextToken,
    }));
    console.log(res);
    dispatch({ type: type, posts: res.data.listPostsSortedByTimestamp.items })
    setNextToken(res.data.listPostsSortedByTimestamp.nextToken);
    setIsLoading(false);
  }

  const getAdditionalPosts = () => {
    if (nextToken === null) return; //Reached the last page
    getPosts(ADDITIONAL_QUERY, nextToken);
  }


  // useEffect hook describes process after the component's mount is completed
  // Issues a subscription whenever createPost mutation is called, the Arrow Function passed to .subscribe is executed
  // returning Arrow Function to unsubscribe, the subscription gets closed when component is unmounted
  useEffect(() => {
    getPosts(INITIAL_QUERY);

    const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: (msg) => {
        console.log('allposts subscription fired')
        const post = msg.value.data.onCreatePost;
        dispatch({ type: SUBSCRIPTION, post: post });
      }
    });
    return () => subscription.unsubscribe();
  }, []);


  return (
    <React.Fragment>
      <Sidebar 
        activeListItem='global-timeline'
      />
      <PostList
        isLoading={isLoading}
        posts={posts}
        getAdditionalPosts={getAdditionalPosts}
        listHeaderTitle={'Global Timeline'}
      />
    </React.Fragment>
  )
}