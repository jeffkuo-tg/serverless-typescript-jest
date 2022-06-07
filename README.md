# Serverless Framework AWS Typescript with Jest Tests
## Setting the environment
1. Run `npm init -y`
2. Run `npm i -D typescript`
3. Run `npx tsc --init`
4. In `package.json` file, add
    ```
    "scripts": {
        "build": "tsc"
    }
    ```
5. Run `npm i -D jest ts-jest @types/jest`
6. Run `npx ts-jest config:init`
7. In `package.json` file, add
    ```
    "scripts": {
        "test": "jest"
    }
    ```
8. Run `npm install serverless-offline --save-dev`
9. In `serverless.yml` file, add
    ```
    plugins:
      - serverless-offline
    ```
### Reference
* https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421
* https://www.npmjs.com/package/serverless-offline
