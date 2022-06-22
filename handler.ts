import axios from 'axios';
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';

export const sum = (num1: number, num2: number) => {
  return num1 + num2;
};

export const hello = async (
  event: APIGatewayEvent,
  context: Context,
  callback: APIGatewayProxyCallback
) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!'
    })
  };

  callback(null, response);
};

export const getUser = async (event: APIGatewayEvent) => {
  const result = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${event.pathParameters?.id}`
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      data: result.data
    })
  };

  return response;
};
