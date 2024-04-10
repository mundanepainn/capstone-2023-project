const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Users";

const getUsers = async () => {
    const params = {
        TableName: TABLE_NAME
    };
const users = await dynamoClient.scan(params).promise();
console.log(users);
return users;
};

const getUserById = async (id) => {
    const params = {            
        TableName: TABLE_NAME,
        Key: {             
            id
        }
    }
    return await dynamoClient.get(params).promise();
};

const getUsersSortedById = async () => {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'id = :id',
    ScanIndexForward: false,    // true = ascending, false = descending
    }
}

const addOrUpdateUser = async (user) => {
    const params = {
        TableName: TABLE_NAME,
        Item: user
    };
    await dynamoClient.put(params).promise();
};

const deleteUser = async (id) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    return await dynamoClient.delete(params).promise();         //inserting into table
  };


module.exports = {
    dynamoClient,
    getUsers,
    getUserById,
    addOrUpdateUser,
    deleteUser,
    getUsersSortedById
  }
