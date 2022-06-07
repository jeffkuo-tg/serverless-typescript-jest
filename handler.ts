import axios from 'axios';

export const hello = async (event: any, context: any, callback: any) => {
  const response =  {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello World!"
      }
    )
  };

  callback(null, response);
}

export const getUser = async () => {
  const resp = await axios.get('https://jsonplaceholder.typicode.com/users/1');
  return resp.data;
}
