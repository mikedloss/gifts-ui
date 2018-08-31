export const getApiUrl = () => (
  process.env.NODE_ENV === 'development' 
    ? 'https://gifts-api.herokuapp.com/'
    : 'https://gifts-api.herokuapp.com/'
)