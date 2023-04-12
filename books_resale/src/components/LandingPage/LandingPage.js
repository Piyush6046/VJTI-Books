import React from "react";
import "./LandingPage.css";
import landing_page_girl from '../../images/bg_overlay_4.png'
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="main_container">
      <div className="left_container">
        <Typography fontStyle={"italic"} fontFamily={'Righteous, cursive'} fontSize={60} fontWeight={700}>
          BUY AND SELL YOUR BOOKS FOR BEST PRICE
        </Typography>
        <Button variant="outlined" sx={{px:'15px',py:'10px',
          backgroundColor:"#ffbf00",color:'black',mt:'5%',background:'transperant',borderRadius:'8px'}} onClick={()=>{navigate('/books')}}>
          <Typography fontSize={18} fontWeight={500}>BookStore</Typography>
        </Button>
      </div>
      <div>
        <img className="right_container" src={landing_page_girl} width={550}/>
      </div>
    </div>
  );
};

export default LandingPage;
