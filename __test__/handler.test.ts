import { getUser } from '../handler';
import axios from 'axios';

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
