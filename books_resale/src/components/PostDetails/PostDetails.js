import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../actions/postActions";
import { useState } from "react";
import "./PostDetails.css";
import { Button, Card, CircularProgress, Link, Paper, Typography } from "@mui/material";
import { addConversation } from "../../api/post";

const PostDetails = () => {
  const { post } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage?.getItem('profile'));
  const userId = user?.user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(post?.books_stack);
  const allImages = [post?.books_stack, post?.book1_img, post?.book2_img, post?.book3_img, post?.book4_img, post?.book5_img];
  const allNonNullImages = allImages?.filter((image)=>image!=="");

  const hrefLink = `https://wa.me/${post?.whatsapp_number}`

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    setMainImage(post?.books_stack);
  }, [post]);

  if(!post) {return  (<div style={{height:'100vh',width:'100%',margin:'30vh 70vh'}}><CircularProgress color='inherit' size='5em'/></div>);}

  const addConvo = async() => {
    await addConversation(userId,post?.creator);
    navigate('/chat');
  }

  return (
    <div style={{display:'flex'}}>
      <Card elevation={3}
        sx={{backgroundColor:'inherit', maxWidth: 540, m:4,ml:8, padding: 1.5, alignContent: "center" }}
      // class="booksDisplayCard"
      >
        <img
          src={mainImage}
          alt="Main Image"
          className="main-image"
          sx={{ maxWidth: 500, Height: 500, padding: 3, margin: 0 }}
        />
        <div style={{display:'flex',justifyContent:'center'}}>
          {allNonNullImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="image"
              // sx={{ maxWidth: 10, height: 30 }}
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </Card>

      <Paper elevation={3} sx={{backgroundColor:"inherit", m:5,p:5,width:'50%'}}>
      <Typography
          gutterBottom
          variant="h3"
          component="div"
          sx={{ fontFamily: "Merriweather", fontWeight: "bold" }}
        >
          {post.year + " " + post.branch + " " + post.semester.toUpperCase() + " SEM "}
        </Typography>
        <Typography variant="h5">
          Subjects Available :
          <ol style={{padding:'1rem 0 0 3rem'}}>
            
              {[1, 2, 3, 4, 5].map(bookNumber => (
                post[`book${bookNumber}`] || post[`book${bookNumber}_pub`] ? (
                <li key={bookNumber} onClick={() => setMainImage(post[`book${bookNumber}_img`])}>
                  {post[`book${bookNumber}`]} - {post[`book${bookNumber}_pub`]}
                </li>
                ) : null
              ))}
          </ol>
        </Typography>
        <Typography variant="h5" sx={{mt:2,display:'flex',flexDirection:'column',gap:1}}>
            <p>Original Price: <span>&#8377;</span> {post?.original_price}</p>
            <p>Resale Price :  <span>&#8377;</span>  {post?.resale_price} ({post?.fix_nego})</p>
            <p>Seller name : {post?.seller_name}</p>
        </Typography>
          <div className="page_details_buttons">
            <Button variant="outlined" onClick={addConvo} disabled={!user?.token} sx={{marginTop:'20px', marginRight:'2rem', backgroundColor: !user?.token ?  '#f2f2f2' : '#f9ca3d',color:'black'}}>
              Chat with seller
            </Button>
            <Button target="blank" href={hrefLink} variant="outlined" disabled={!user?.token} sx={{marginTop:'20px', backgroundColor: !user?.token ?  '#f2f2f2' : '#f9ca3d',color:'black'}}>
              Connect on Whatsapp
            </Button>
          </div>
      </Paper>
      </div>
  );
};
{/* <div>
      Post Details:
      {post && post.books_stack && (
        <img src={post.books_stack} alt="Image of books stack" />
      )}
      {" " +
        post?.branch +
        " " +
        post?.semester.toUpperCase() +
        " SEM "}
    </div> */}


/*
college: String,
  year : String,
  branch : String,
  semester : String,
  original_price:String,
  resale_price:String,
  // contact_number : String,
  books_stack:String,
  book1 : String,
  book2 : String,
  book3 : String,
  book4 : String,
  book5 : String,
  book1_pub:String,
  book2_pub:String,
  book3_pub:String,
  book4_pub:String,
  book5_pub:String,
  book1_img : String,
  book2_img : String,
  book3_img : String,
  book4_img : String,
  book5_img : String,
  creator : String,
*/

export default PostDetails;