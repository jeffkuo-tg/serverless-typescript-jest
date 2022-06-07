import { getUser } from "./handler";

describe('Test handler functions', () => {
    test('User fetched name should be Leanne Graham', async () => {
        expect.assertions(1);
        const data = await getUser();
        expect(data.name).toEqual('Leanne Graham');
      });
});