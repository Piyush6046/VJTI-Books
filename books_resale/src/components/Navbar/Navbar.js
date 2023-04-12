import { AppBar, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import './Navbar.css'
import logo from '../../images/logo.png'

const Navbar = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const location = useLocation();

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/auth')
  }

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')));//
    //it convers the string into JS object and sets it as a user
    const token = user?.token;

    if(token){
      const decoded_token = decode(token);
      if((decoded_token.exp*1000)<(new Date().getTime())){//exp time is in milisecond thats why multiplying by 1000
        logoutHandler();//if token has expired we are logging out of the system
      }
    }
  },[location])

  return (
    <div>
    <AppBar elevation={0} position="static" color='inherit' sx={{my:2,mb:0, borderRadius:2 ,p:1}} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',backgroundColor:'rgba(1,1,0,0.0)'}}>

    <div>
      <Link to='/' style={{display:'flex',alignItems:'center',textDecoration:'none',color:'black'}}>
      <img className='image' src={logo} alt='pict_logo' height="80px" width="80px" style={{margin:'5px 15px',border:'0px'}}></img>
      <Typography fontFamily={'Lobster,cursive'} sx={{fontSize:'55px',fontWeight:'bold'}} align='center'>Campus Bookstore</Typography>
      </Link>
    </div>
    
      <div style={{ display:'flex',flexDirection:'row',justifyContent:'flex-end',gap:35,height:'100%',margin:'auto 5px auto 50px'}}>
        <Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={()=>{navigate('/')}}> Home</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffbf00 '}} variant='outlined' onClick={()=>{navigate('/books')}}> Book Store</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={()=>{navigate('/form')}}> Form</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={()=>{navigate('/chat')}}> chat</Button>
        <Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={()=>{navigate('/savedBooks')}}> saved books</Button>
        {
         user ? (<Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={logoutHandler}> Log Out</Button>) : 
         (<Button  sx={{color:'black',backgroundColor:'#ffbf00'}} variant='outlined' onClick={()=>{navigate('/auth')}}> Sign In</Button>)
        }
      </div>
    </AppBar>
    <Divider variant='middle' sx={{color:'black',borderBottomWidth:'2px'}}/>
    </div>
  );
};

export default Navbar;