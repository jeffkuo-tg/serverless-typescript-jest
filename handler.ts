import axios from 'axios';
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { retrieveData } from './dataService';

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

export const getUser = async (id: number) => {
  const resp = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return resp.data;
};

export const lambdaService = async (event: APIGatewayEvent) => {
  const param: any = event.pathParameters;
  const id = param.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid Request. id is required in path parameters.'
      })
    };
  }
  let response = await retrieveData(id);
  if (response.statusCode == 200) {
    return response;
  } else {
    return {
      statusCode: response.statusCode,
      body: JSON.stringify({
        message: response.message
      })
    };
  }
};
