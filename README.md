# Access Control (ACL).

This project contains REST APIs with an Access Control Logic

## Build

Clone the repository.

Use the package manager [npm] to build.

```bash
npm i
```

## Seeders

Run the following command from the root directory of the project

```bash
npx sequelize-cli db:seed:all 
```

## .env

Add a .env file in the root directory with following content

```
SECRET=any salt value
TOKEN_EXPIRY=86400 //24 hours in seconds
```

## Usage

Run the following command to run the server

```
npm start
```

## Requirments

Make sure node is installed.

 ### Note: 
I have added the DB configuration in the config.json file and committed it. I did it for the sake of simplicity for the evaluator to build the project and run it. [In ideal cases, we should not commit db configuration to the repo]
