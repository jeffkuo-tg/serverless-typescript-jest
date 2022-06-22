import { sum, getUser } from '../handler';
import axios from 'axios';
import createEvent from 'mock-aws-events';

jest.mock('axios'); // need to placed in the same scope as import statement
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Test sum', () => {
  test('1 + 1 == 2', () => {
    expect(sum(1, 1)).toBe(2);
  });
});

describe('Test handler functions', () => {
  test('Test getUaser with axios mocked', async () => {
    const userName = {
      name: 'Leanne Graham'
    };

    const response = {
      data: userName
    };

    const testEvent = createEvent('aws:apiGateway', {
      pathParameters: {
        id: '1'
      }
    });

    mockedAxios.get.mockResolvedValueOnce(response); // return {data: {name: 'Leanne Graham'}}
    const user1 = await getUser(testEvent); // even user2's name is not Leanne Graham, we still pass the test
    expect(JSON.parse(user1.body).name).toEqual('Leanne Graham');
  });
});
