import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import Posts from '../Posts/Posts';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch]);

  return (
    <Container maxWidth='xl' >
      <Container>
        <Grid container>
          <Grid item sm={0} justifyContent='end'>
            <Posts/>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Home;