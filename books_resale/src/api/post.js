import axios from 'axios';

const API = axios.create({baseURL:"http://localhost:5000/"})

API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
}
);

export const getposts = () => API.get('/posts');
export const createPost = (post)=> API.post('/posts',post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchPost = (id) => API.get(`/posts/${id}`)

export const fetchConversations = (userId) => API.get(`/conversations/${userId}`);

export const getUser = (userId) => API.get(`/user/${userId}`);

export const fetchMessages = (conversationId) => API.get(`/messages/${conversationId}`);

export const sendMessage = (message) => API.post(`/messages`,message);

export const signUp = (authData) => API.post('/auth/signup',authData);
export const logIn = (authData) => API.post('/auth/login',authData);
