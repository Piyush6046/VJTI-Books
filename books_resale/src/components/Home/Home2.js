import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SavedPosts from '../Posts/SavedPosts';
import { getSavedPosts } from '../../actions/userActions';

const Home2 = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("reloading savedposts");
    dispatch(getSavedPosts());
  },[dispatch]);

  return (
    <Container maxWidth='xl' >
      <Container>
        <Grid container>
          <Grid item justifyContent='end'>
            <SavedPosts/>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Home2;