import { getUser, lambdaService } from '../handler';
import axios from 'axios';
import { retrieveData } from '../dataService';
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';

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
        const mockResponse = {
            statusCode: 200,
            message: 'mocked data'
        };
        const mockEvent: APIGatewayEvent = {
            pathParameters: {
                id: '1'
            }
        } as any;

        const actualResponse = await lambdaService(mockEvent);
        expect(actualResponse).toEqual(mockResponse);
    });

    test('Negative test: dataService fails', async () => {
        const mockEvent: APIGatewayEvent = {
            pathParameters: {
                id: '1'
            }
        } as any;

        const mockResponse = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal server error'
            })
        };

        const actualResponse = await lambdaService(mockEvent);
        expect(actualResponse).toEqual(mockResponse);
    });

    test('Negative test: invalid input', async () => {
        const mockEvent: APIGatewayEvent = {
            pathParameters: {}
        } as any;

        const mockResponse = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Invalid Request. id is required in path parameters.'
            })
        };

        const actualResponse = await lambdaService(mockEvent);
        expect(actualResponse).toEqual(mockResponse);
    });
});
