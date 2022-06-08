import { getUser } from "./handler";

describe('Test handler functions', () => {
    test('Test getUaser', async () => {
        const user1 = await getUser(1);
        expect(user1.name).toEqual('Leanne Graham');

        const user2 = await getUser(2);
        expect(user2.name).not.toEqual('Leanne Graham');
      });
});