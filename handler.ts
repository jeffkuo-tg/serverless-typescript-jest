import axios from 'axios';
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';

export const hello = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
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

export const getUser = async (id: number) => {
  const resp = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return resp.data;
}
