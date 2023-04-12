import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Divider } from '@mui/material';

const SearchPosts = () => {
  return (
    <div>
      <div style={{marginTop:'1%',position:'fixed'}}>
        <label style={{fontSize:'25px'}}>Year : </label>
        <div style={{marginTop:'5%'}}>
          <FormGroup>
            <FormControlLabel control={<Checkbox/>} label="FE" />
            <FormControlLabel control={<Checkbox/>} label="SE" />
            <FormControlLabel control={<Checkbox/>} label="TE" />
            <FormControlLabel control={<Checkbox/>} label="BE" />
          </FormGroup>
        </div>
        <hr style={{width:'150%',border:'0.1px solid grey',margin:'10% 0'}}/>
        {/* <Divider variant='middle' sx={{color:'black',borderBottomWidth:'2px'}}/> */}
        <label style={{fontSize:'25px'}}>Branch : </label>
        <div style={{marginTop:'5%'}}>
          <FormGroup>
            <FormControlLabel control={<Checkbox/>} label="CE" />
            <FormControlLabel control={<Checkbox/>} label="IT" />
            <FormControlLabel control={<Checkbox/>} label="EnTC" />
          </FormGroup>
        </div>
        <hr style={{width:'150%',border:'0.1px solid grey',marginBottom:'10%',margin:'10% 0'}}/>
        <label style={{fontSize:'25px'}}>Semester : </label>
        <div style={{marginTop:'5%'}}>
          <FormGroup>
            <FormControlLabel control={<Checkbox/>} label="ODD (1st)" />
            <FormControlLabel control={<Checkbox/>} label="EVEN (2nd)" />
          </FormGroup>
        </div>
      </div>
    </div>

  );
};

export default SearchPosts;