import { AppBar, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
    <AppBar elevation={0} position="static" color='inherit' sx={{m:2,mb:0, borderRadius:2 ,p:1}} style={{display:'flex',flexDirection:'row',justifyContent:'space-around',backgroundColor:'rgba(1,1,0,0.0)'}}>
      <Typography sx={{fontSize:'55px',fontWeight:'bold',textShadow:'2px 2px #f1db98'}} align='center'>Campus Bookstore</Typography>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',gap:50,height:'100%',margin:'auto 0px'}}>
        <Button  sx={{color:'black',backgroundColor:'#ffda6c',px:2}} variant='outlined' onClick={()=>{navigate('/')}}> Home</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffda6c '}} variant='outlined' onClick={()=>{navigate('/books')}}> Book Store</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffda6c'}} variant='outlined' onClick={()=>{navigate('/form')}}> Form</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffda6c'}} variant='outlined' onClick={()=>{navigate('/auth')}}> Auth</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffda6c'}} variant='outlined' onClick={()=>{navigate('/chat')}}> chat</Button>
      </div>
    </AppBar>
    <Divider variant='middle' sx={{color:'black',borderBottomWidth:'1.75px'}}/>
    </div>
  );
};

export default Navbar;