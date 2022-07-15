# Access Control (ACL).

This project contains REST APIs with an Access Control Logic

## Build

Clone the repository.

Use the package manager [npm] to build.

```bash
npm i
```

## .env

Add a .env file in the root directory with following content.

```
SECRET=any salt value
TOKEN_EXPIRY=86400 //24 hours in seconds
```


## To start the server


Run the following command to run the server and let the db get synced.

```
npm start
```

Stop the server.

Run the following seed command from the root directory of the project.

```bash
npx sequelize-cli db:seed:all 
```

Start the server again and its ready to use. All the subsequent server restarts will use the following command.
```
npm start
```
## Requirments

Make sure node is installed.

 ### Note: 
I have added the DB configuration in the config.json file and committed it. I did it for the sake of simplicity for the evaluator to build the project and run it. [In ideal cases, we should not commit db configuration to the repo].
