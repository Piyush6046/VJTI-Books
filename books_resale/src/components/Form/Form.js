import React, { useState } from 'react';
import {Button, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography, useMediaQuery} from '@mui/material'
import {useDispatch} from 'react-redux'
// import {useNavigate} from 'react-router-dom'
import {createPost} from '../../actions/postActions'
import { UseMediaQuery } from '@mui/material';
import FileBase from 'react-file-base64';
import './form.css'

const Form = () => {
  const [postData,setPostData] = useState({college: "", year: "", branch:"", semester:"",original_price:"", resale_price: "", fix_nego: "", books_stack:"",
                                            book1:"",book1_pub:"",book1_img:"",book2:"",book2_pub:"",book2_img:"",book3:"",book3_pub:"",book3_img:"",book4:"",book4_pub:"",book4_img:"",book5:"",book5_pub:"",book5_img:""});

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const user  = JSON.parse(localStorage.getItem('profile'));

  const isMobileScreen = useMediaQuery('(max-width:600px)');
  
  const handleSubmit = (e) => {
    console.log(postData);
      e.preventDefault();
      dispatch(createPost(postData));// creating a post
      // clear();
  }
  const clear = () => {
    setPostData({college: "", year: "", branch:"", semester:"",original_price:"", resale_price: "", fix_nego: "", books_stack:"",
    book1:"",book1_pub:"",book1_img:"",book2:"",book2_pub:"",book2_img:"",book3:"",book3_pub:"",book3_img:"",book4:"",book4_pub:"",book4_img:"",book5:"",book5_pub:"",book5_img:""})
  }

  if(!user){
    return(
      <Paper elevation={5} className='paper' sx={{backgroundColor:'#fcf4dc',py:1,width:'50%',height:'50%',marginTop:'2%',marginX:'auto'}}>
        <Typography variant='h6' align='center'>
          Please sign in to <br/>
           fill the form <br/>
        </Typography>
      </Paper>
    )
  }

  return (

    <Paper className='paper' style={{padding: '10px 50px',margin:'30px 10% 0 10%',borderRadius:'15px'}} elevation={4}>
      <form style={{marginTop:'12px'}} autoComplete="off" noValidate className='form' onSubmit={handleSubmit}>
        <Typography variant='h5' align='center' sx={{fontWeight:'bold'}}>Card Form</Typography>

        <FormControl fullWidth sx={{mb:2,mt:2}}>
          <InputLabel id="college-name">College name</InputLabel>
            <Select
              labelId="college-name"
              value={postData.college}
              label="College name"
              onChange={(e)=> setPostData({...postData, college : e.target.value })}
            >
            <MenuItem value={'Pune Institute of Computer Technology'}>Pune Institute of Computer Technology</MenuItem>
            <MenuItem value={'Vishwakarma Institute of Technology'}>Vishwakarma Institute of Technology</MenuItem>
          </Select>
          </FormControl>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <FormControl sx={{width:1/4}}>
          <InputLabel id='year'>Year</InputLabel>
            <Select
              labelId="year"
              value={postData.year}
              label="year"
              onChange={(e)=> setPostData({...postData, year : e.target.value })}
            >
            <MenuItem value={'FE'}>1st Year</MenuItem>
            <MenuItem value={'SE'}>2nd Year</MenuItem>
            <MenuItem value={'TE'}>3rd Year</MenuItem>
            <MenuItem value={'BE'}>4th Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{width:1/4}}>
          <InputLabel id='branch'>Branch</InputLabel>
            <Select
              labelId="branch"
              value={postData.branch}
              label="branch"
              onChange={(e)=> setPostData({...postData, branch : e.target.value })}
            >
            <MenuItem value={'CE'}>Computer Engineering</MenuItem>
            <MenuItem value={'IT'}>Information Technology</MenuItem>
            <MenuItem value={'EnTC'}>Electronics and Telecommunication</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{width:1/4}}>
          <InputLabel id='semester'>Semester</InputLabel>
            <Select
              labelId="semester"
              value={postData.semester}
              label="semester"
              onChange={(e)=> setPostData({...postData, semester : e.target.value })}
            >
            <MenuItem value={'odd'}>Odd (1st)</MenuItem>
            <MenuItem value={'even'}>Even (2nd)</MenuItem>
          </Select>
        </FormControl>
        </div>

        <div style={{display:'flex',justifyContent:'space-between'}}>

          <TextField name="original_price" variant="outlined" label="Original Price" fullWidth 
          value={postData.original_price} onChange={(e) => setPostData({ ...postData, original_price: e.target.value })} 
          sx={{width:1/4,mt:1}}/>

          <TextField name="resale_price" variant="outlined" label="Resale Price" fullWidth 
          value={postData.resale_price} onChange={(e) => setPostData({ ...postData, resale_price: e.target.value })} 
          sx={{width:1/4,mt:1}}/>

          <FormControl style={{display:'flex',flexDirection:'row',justifyContaint:'space-between'}} sx={{width:1/4,mt:1}}>
            {/* <FormLabel sx={{mt:2.45,mr:2}} id="fix_nego">Price : </FormLabel> */}
            {/* <Typography sx={{mt:2.40,mr:2,fontSize:18}}>Price : </Typography> */}
            <RadioGroup row aria-labelledby="fix_nego" name="fix_nego" 
              value={postData.fix_nego}
              onChange={(e)=>setPostData({...postData,fix_nego:e.target.value})}>
              <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
              <FormControlLabel value="negotiable" control={<Radio />} label="Negotiable" />
            </RadioGroup>
          </FormControl>
        </div>

        <div style={{display:'flex',width:'60%',justifyContent:'space-between'}}>
          <Typography sx={{mt:2.40,mr:2,fontSize:18,ml:1}}>Image of whole set of books to sell : </Typography>
          <FileBase
            type='file'
            multiple={false}
            onDone = {({base64})=>{
              setPostData({...postData,books_stack:base64})
            }}
            style={{margin:'16px 0px'}}/>
        </div>

          <Typography sx={{mt:2.40,mr:2,fontSize:18,ml:1}}>Books Information : </Typography>
          <div style={{display:'flex',justifyContent:'space-around'}}>
            <Typography sx={{mt:2.40,fontSize:18,mr:10}}>Book Name</Typography>
            <Typography sx={{mt:2.40,mr:2,fontSize:18,ml:1}}>Publication</Typography>
            <Typography sx={{mt:2.40,fontSize:18}}>Picture of Book</Typography>
          </div>

          {/* Books Input */}
          <div style={{display:'flex',justifyContent:'space-between'}}>

            <TextField name="book1" variant="outlined" label="Book 1" fullWidth 
            value={postData.book1} onChange={(e) => setPostData({ ...postData, book1 : e.target.value })} 
            sx={{width:1/4,mt:1}}/>

            <TextField name="book1_pub" variant="outlined" label="Book 1" fullWidth 
            value={postData.book1_pub} onChange={(e) => setPostData({ ...postData, book1_pub : e.target.value })} 
            sx={{width:1/4,mt:1}}/>

            <FileBase
            type='file'
            multiple={false}
            onDone = {({base64})=>{
              setPostData({...postData,book1_img:base64})
            }}
            style={{margin:'16px 0px'}}/>
            
          </div>

          <div style={{display:'flex',justifyContent:'space-between'}}>
            <TextField name="book2" variant="outlined" label="Book 2" fullWidth 
            value={postData.book2} onChange={(e) => setPostData({ ...postData, book2 : e.target.value })} 
            sx={{width:1/4,mt:1}}/>
            <TextField name="book2" variant="outlined" label="Book 2" fullWidth 
            value={postData.book2_pub} onChange={(e) => setPostData({ ...postData, book2_pub : e.target.value })} 
            sx={{width:1/4,mt:1}}/>

            <FileBase
            type='file'
            multiple={false}
            onDone = {({base64})=>{
              setPostData({...postData,book2_img:base64})
            }}
            style={{margin:'16px 0px'}}/>

          </div>

          <div style={{display:'flex',justifyContent:'space-between'}}>
            <TextField name="book3" variant="outlined" label="Book 3" fullWidth 
            value={postData.book3} onChange={(e) => setPostData({ ...postData, book3 : e.target.value })} 
            sx={{width:1/4,mt:1}}/>
            <TextField name="book3" variant="outlined" label="Book 3" fullWidth 
            value={postData.book3_pub} onChange={(e) => setPostData({ ...postData, book3_pub : e.target.value })} 
            sx={{width:1/4,mt:1}}/>
            <FileBase
            type='file'
            multiple={false}
            onDone = {({base64})=>{
              setPostData({...postData,book3_img:base64})
            }}
            style={{margin:'16px 0px'}}/>
          </div>

          <div style={{display:'flex',justifyContent:'space-between'}}>
            <TextField name="book4" variant="outlined" label="Book 4" fullWidth 
            value={postData.book4} onChange={(e) => setPostData({ ...postData, book4 : e.target.value })} 
            sx={{width:1/4,mt:1}}/>
            <TextField name="book4" variant="outlined" label="Book 4" fullWidth 
            value={postData.book4_pub} onChange={(e) => setPostData({ ...postData, book4_pub : e.target.value })} 
            sx={{width:1/4,mt:1}}/>
            <FileBase
            type='file'
            multiple={false}
            onDone = {({base64})=>{
              setPostData({...postData,book4_img:base64})
            }}
            style={{margin:'16px 0px'}}/>
          </div>

          <div style={{display:'flex',justifyContent:'space-between'}}>
            <TextField name="book5" variant="outlined" label="Book 5" fullWidth 
            value={postData.book5} onChange={(e) => setPostData({ ...postData, book5 : e.target.value })} 
            sx={{width:1/4,mt:1}}/>
            <TextField name="book5" variant="outlined" label="Book 5" fullWidth 
            value={postData.book5_pub} onChange={(e) => setPostData({ ...postData, book5_pub : e.target.value })} 
            sx={{width:1/4,mt:1}}/>
            <FileBase
            type='file'
            multiple={false}
            onDone = {({base64})=>{
              setPostData({...postData,book5_img:base64})
            }}
            style={{margin:'16px 0px'}}/>
          </div>

          {/* <Typography sx={{mt:2.40,mr:2,fontSize:18,ml:1}}>Additional Comments : </Typography>
            <TextField sx={{mt:2}} fullWidth
              id="outlined-multiline-static"
              label="Additional Comments"
              multiline
              rows={4}
            /> */}

            <Button className='submitButton' variant="contained" color="primary" size="large" type="submit" fullWidth style={{margin:'10px 0 10px 0'}}>
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              // onClick={clear}
              fullWidth
            >
              Clear
            </Button>
      </form>
    </Paper>
  );
};

export default Form;