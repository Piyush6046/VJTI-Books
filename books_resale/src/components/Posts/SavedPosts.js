import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import './Posts.css'

const SavedPosts = () => {
  const { savedposts } = useSelector((state)=>state.posts);
  console.log("savedposts are : ",savedposts);
  if(!savedposts?.length) {return  (<div style={{height:'100vh',width:'100%',margin:'30vh 70vh'}}><CircularProgress color='inherit' size='5em'/></div>);}
  return (
    <div className='PostsPage'>
      <Grid container spacing={3} marginTop='10px'>
        {savedposts?.map((post)=>(
          <Grid item sm={6} md={4} key={post._id} >
            <Post post={post}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SavedPosts;