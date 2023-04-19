import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import Bookmark from "@mui/icons-material/Bookmark";
import Divider from "@mui/material/Divider";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../actions/postActions";
import { useNavigate } from "react-router-dom";
import { getSavedPosts, getUser, savePost } from "../../../actions/userActions";

const Post = ({ post , setCurrentId}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [userInfo,setUserInfo] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openPost = () => navigate(`/books/${post._id}`);
  const user = JSON.parse(localStorage?.getItem('profile'));
  const flag = user?.user?._id === post?.creator;

  useEffect(()=>{
    const getUserInfo = async() => {
      const userInfo = await dispatch(getUser(user?.user?._id));
      setUserInfo(userInfo);
      setIsSaved(userInfo?.savedbooks?.some((savedpost)=>post._id===savedpost));
      console.log("userInfo : ",userInfo);
    }
    getUserInfo();
  },[isSaved]);

  const handleSave = () => {
    setIsSaved(!isSaved);
    const savedPosts = dispatch(savePost(post._id));
  }

  const SaveIcon = () => {
    return userInfo?.savedbooks?.some((savedpost)=>post._id===savedpost) ? (
      <Bookmark sx={{ fontSize: '35px' }} />
    ) : (
      <BookmarkBorderIcon sx={{ fontSize: '35px' }} />
    )
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setCurrentId(post?._id);
    navigate('/form');
    handleClose()
  }
  
  return (
    <Card elevation={4}
      sx={{
        maxWidth: 300, // reduced maxWidth to make card smaller
        minWidth: 280, // reduced minWidth to make card smaller
        padding: 2, // reduced padding to make card smaller
        backgroundColor: '#fcda71',
        borderRadius: 5,
        ':hover': {
          boxShadow: 12, // theme.shadows[20]
        },
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        alt="BookSet Image"
        height="220" // reduced height to make image smaller
        width="auto"
        image={post.books_stack}
        sx={{ borderRadius: 5 }}
      />
      {/* ******************* */}

      {flag ? (
      <div className="overlay2">
            <Button
              id="fade-button"
              onClick={handleClick}
            >
              <MoreHorizIcon className="overlay"/>
            </Button>
            
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleEdit}><EditIcon sx={{mr:1.7}}/> Edit</MenuItem>
              <Divider variant="middle" sx={{color:"black",borderBottomWidth:'2px'}}/>
              <MenuItem onClick={() => { dispatch(deletePost(post._id)) ; handleClose()}}><DeleteIcon sx={{mr:1}}/>Delete</MenuItem>
            </Menu>
          </div>
          ) : (
          <Tooltip title={!user?.token ? "Please sign in to use this functionality" : ""}>
          <div className="overlay2save">
            <IconButton
              onClick={handleSave}
              sx={{ p:0.25,borderRadius:2,backgroundColor:'#fcda71','&:hover':{backgroundColor:'#fcda71'}}}
              disabled={!user}>
                <SaveIcon className="overlaySave"/>
            </IconButton>
            </div>
            </Tooltip>
            )}
           
          {/* *************** */}

      <CardContent>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontFamily: "Merriweather", fontWeight: "bold" }}
        >
          {post.year +
            " " +
            post.branch +
            " " +
            post.semester.toUpperCase() +
            " SEM "}
        </Typography>
      </div>
        <Typography
          variant="body2"
          color="black"
          sx={{ fontFamily: "Merriweather", fontWeight: "bold" }}
        >
          <p style={{marginBottom:'4px'}}>Subjects:</p>
            {post.book1 && <span>{post.book1} </span>}
            {post.book2 && <span>, {post.book2} </span>}
            {post.book3 && <span>, {post.book3} </span>}
            {post.book4 && <span>, {post.book4} </span>}
            {post.book5 && <span>, {post.book5}</span>}
        </Typography>
      </CardContent>
      <Divider />
        <CardContent sx={{ textAlign: "left", fontWeight: "bold",marginTop:'12px', paddingTop: 0, paddingBottom: 0 }}>
          <Typography sx={{ fontFamily: "Merriweather", fontWeight: "bold", display: 'flex', alignItems: 'center' }}>
            Price :&nbsp;<span>&#8377;</span> {post.resale_price}
            <Box sx={{ flexGrow: 1 }} /> {/* Adds a flex-grow box to push the button to the end */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F9C810",
                color: "black",
                marginLeft: 1,
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 0.25,
                paddingBottom: 0.25,
                fontWeight: "bold",
                ':hover': {
                  backgroundColor: '#F9C810',
                },
                minWidth: '90px',
              }}
              onClick={openPost}
            >
              View Details
            </Button>
          </Typography>
        </CardContent>
    </Card>
  );
};

export default Post;

// fontFamily: 'Merriweather'
// text.secondary
