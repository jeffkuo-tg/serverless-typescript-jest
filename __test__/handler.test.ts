import { getUser, lambdaService } from '../handler';
import axios from 'axios';
import { retrieveData } from '../dataService';
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
// @ts-ignore: types not present for aws-event-mocks
import createEvent from 'aws-event-mocks';

jest.mock('axios'); // need to placed in the same scope as import statement
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Test handler functions', () => {
  test('Test getUaser with axios mocked', async () => {
    const userName = {
      name: 'Leanne Graham'
    };

    const response = {
      data: userName
    };

    mockedAxios.get.mockResolvedValueOnce(response); // return {data: {name: 'Leanne Graham'}}
    const user1 = await getUser(2); // even user2's name is not Leanne Graham, we still pass the test
    expect(user1.name).toEqual('Leanne Graham');
  });
});

jest.mock('../dataService', () => {
  const goodResponse = {
    statusCode: 200,
    message: 'mocked data'
  };

  const badResponse = {
    statusCode: 500,
    message: 'Internal server error'
  };

  return {
    __esModule: true,
    retrieveData: jest
      .fn()
      .mockResolvedValueOnce(goodResponse)
      .mockResolvedValueOnce(badResponse)
  };
});

describe('lambdaService', () => {
  test('Positive test: should return data', async () => {
    const expectedResponse = {
      statusCode: 200,
      message: 'mocked data'
    };

    const testEvent = createEvent({
      template: 'aws:apiGateway',
      merge: {
        pathParameters: {
          id: '1'
        }
      }
    });

    const actualResponse = await lambdaService(testEvent);
    expect(actualResponse).toEqual(expectedResponse);
  });

  test('Negative test: dataService fails', async () => {
    const testEvent = createEvent({
      template: 'aws:apiGateway',
      merge: {
        pathParameters: {
          id: '2'
        }
      }
    });

    const expectedResponse = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error'
      })
    };

    const actualResponse = await lambdaService(testEvent);
    expect(actualResponse).toEqual(expectedResponse);
  });

  test('Negative test: invalid input', async () => {
    const testEvent = createEvent({
      template: 'aws:apiGateway',
      merge: {
        pathParameters: {
          id: null
        }
      }
    });

    const expectedResponse = {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid Request. id is required in path parameters.'
      })
    };

    const actualResponse = await lambdaService(testEvent);
    expect(actualResponse).toEqual(expectedResponse);
  });
});
