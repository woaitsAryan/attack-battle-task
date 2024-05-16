import axios from 'axios';
import Cookie from 'js-cookie'

const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
  timeout: 10000, 
  headers: {
    Authorization: `Bearer ${Cookie.get('token')}`
  }
});

export default backend;