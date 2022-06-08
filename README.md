# Serverless Framework AWS Typescript with Jest Tests
## Setting the environment
1. Run the following command to initialize npm package:
    ```
    npm init -y
    ```
2. Run the following command to install TypeScript as a development dependency:
    ```
    npm i -D typescript
    ```
3. Run the following command to configure TypeScript compiler:
    ```
    npx tsc --init
    ```
4. In `package.json` file, add
    ```
    "scripts": {
        "build": "tsc"
    }
    ```
5. Run the following command to install Jest:
    ```
    npm i -D jest ts-jest @types/jest
    ```
6. Run 
    ```
    npx ts-jest config:init
    ```
7. In `package.json` file, add
    ```
    "scripts": {
        "test": "jest"
    }
    ```
8. Run the follwong command to install serverless offline:
    ```
    npm install serverless-offline --save-dev
    ```
9. In `serverless.yml` file, add
    ```
    plugins:
      - serverless-offline
    ```
10. Run the follwong command to install aws-lambda:
    ```
    npm install -D @types/aws-lambda
    ```
11. Run the follwoing command to install serverless-esbuild, which provides zero-config JavaScript and TypeScript code bundling:
    ```
    npm install -D serverless-esbuild esbuild
    ```
12. In `serverless.yml` file, add
    ```
    plugins:
      - serverless-esbuild
    ```
### Reference
* https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421
* https://www.npmjs.com/package/serverless-offline

## Invoke the function locally
```
sls invoke local -f functionName -d argument
```

## Deploy the functions
```
sls deploy
```
## Run Jest tests
```
npm test
```
