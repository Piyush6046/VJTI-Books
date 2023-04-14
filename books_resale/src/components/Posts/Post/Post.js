import React, { useEffect, useState } from "react";
import {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openPost = () => navigate(`/books/${post._id}`);
  const user = JSON.parse(localStorage?.getItem('profile'));
  const [userInfo,setUserInfo] = useState({});
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
        maxWidth: 345,
        minWidth:340,
        padding: 3,
        // backgroundColor: "#FFE996",
        backgroundColor:'#fcda71',
        borderRadius: 5,
        ':hover': {
          boxShadow: 12, // theme.shadows[20]
        },
        position:'relative'
      }}
    >
      <CardMedia
        component="img"
        alt="BookSet Image"
        height="300"
        width="auto"
        image={post.books_stack}
        sx={{ borderRadius: 5 }}
      />
      {/* ******************* */}

      {flag &&
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
          }
          
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
        <IconButton
          onClick={handleSave}
          sx={{ pt:0 }}
          disabled={!user}>
            <SaveIcon/>
      </IconButton>
      </div>
        <Typography
          variant="body2"
          color="black"
          sx={{ fontFamily: "Merriweather", fontWeight: "bold" }}
        >
          <p style={{marginBottom:'4px'}}>Subjects:</p> {post.book1},{post.book2},{post.book3},{post.book4},
          {post.book5}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent sx={{ textAlign: "left", fontWeight: "bold" }}>
        <Typography sx={{ fontFamily: "Merriweather", fontWeight: "bold" }}>
          Price: {post.resale_price}
          <Button
            variant="contained"
            sx={{
              // backgroundColor: "#F9C810",
              backgroundColor: "#F9C810",
              color: "black",
              marginLeft: 7,
              fontWeight: "bold",
              ':hover': {
                backgroundColor:'#F9C810' // theme.shadows[20]
              },
            }}
            onClick={openPost}
          >
            View Details
          </Button>
          {/* uncomment below code for delete button */}
          {/* <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
            // disabled={!flag}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button> */}

          
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;

// fontFamily: 'Merriweather'
// text.secondary
