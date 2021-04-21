# Schema & route creator

This project automates the creation of schemas and routes. A user needs only add the schema name and define it, as well as the route name and on posting, will automatically create a protected route connected to a mongo database after which the user can immediately begin using the endpoint to create documents in the collection.

- [MongoDB](https://www.mongodb.com/) is used as a database
- [MongooseJS](https://mongoosejs.com/) provides an abstraction layer on top of MongoDB
- [ExpressJS](https://expressjs.com/) is the server

## Installation

npm install

## Usage

Set up your .env file as laid out in .env-example.

`POST` @ /schema to add a schema and route with the following schema

```json
{
    "schemaName": "books",
    "schemaDef": {

        "title": {"type": "String"},
        "author": { "type": "ObjectId", "ref": "users" }
    },
    "routeName": "books"
}

For how to define the schema in schemaDef look at
 https://mongoosejs.com/docs/guide.html#definition
```
