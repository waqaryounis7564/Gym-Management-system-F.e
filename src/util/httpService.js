import axios from "axios";

// (success, error) but in this case we don't need
//to use response if it'll succeed ,we only care about error

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) return Promise.reject(error);
  alert("An unexpected error occurs", error);
  console.log(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
