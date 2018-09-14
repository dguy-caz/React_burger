import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-react-project-9a7f3.firebaseio.com'
});

export default instance;
