import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postModel = new Schema({
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
  fix_nego : String,
  creator : String,
  whatsapp_number : String,
  // wishlist_count :{
  //   type : Number,
  //   default: 0,
  // }
})

const PostModel = mongoose.model('PostModel',postModel);

export default PostModel;
/*
*creatorId									(from mongodb)
*Name of Creator 		string 
Image				string
*ResalePrice			String 
*(fixed/negotiable)
*OriginalPrice			string
*Publication			string (Select)
*SubjectName			String (Select)
*Year				String (select)
*Branch				String (select) 
*Semester			String (select)
Contact Number                     String
*College Name        		String (select)
Location 			String (select)
*University 			String (select)
Additional Comment:		String
*Edition:
*Pattern:
*Bought as:			String (select: new second hand) 
*(Subject , Publication , Photo )

 */