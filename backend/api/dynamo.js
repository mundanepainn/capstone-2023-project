/*
To do: 
    - middleware auth
*/

const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Users";

const getItems = async (table) => {
    const params = {
        TableName: table
    };
const items = await dynamoClient.scan(params).promise();
return items;
};

const getItemById = async (id, table) => {
    const params = {            
        TableName: table,
        Key: {             
            id  
        }
    }
    const items = await dynamoClient.get(params).promise();
    return items
};

const getItemsByHostId = async (id, table) => {
    const params = {
        TableName: table,
        IndexName: "hostID-date-index",
        KeyConditionExpression: "hostID = :id",
        ExpressionAttributeValues: {':id': id}
    }
    return await dynamoClient.query(params).promise();
}


const getItemsSortedById = async (table) => {
    const params = {
        TableName: table,
        KeyConditionExpression: 'id = :id',
    ScanIndexForward: false,    // true = ascending, false = descending
    }
}

const updateActivity = async (activity) => {
    if (activity.attendeeID) {
        console.log("test", activity)
        activity.attendeeID = dynamoClient.createSet(activity.attendeeID) //create a string set for attendeeID
    }
    const params = {
      TableName: "Activity",
      Item: activity,
    };
    await dynamoClient.put(params).promise();         //inserting into table
  };

const updateItem = async (item, table) => {     //change a specific item
    
    const params = {
        TableName: table,
        Key: {
            id: item.id
        },
        UpdateExpression: "set #name = :name",
        ExpressionAttributeNames: { "#name": "name"     // set which attribute to change, e.g., name attribute

        },
        ExpressionAttributeValues: {
            ":name": item.name
    }
}
    await dynamoClient.update(params).promise();
};


 const addItem = async (item, table) => {
    console.log("category:", item.activityCategory,)
    if (item.attendeeID) {
        item.attendeeID = dynamoClient.createSet([item.attendeeID]) //create a string set for attendeeID
    }
    if (item.interests) {
        item.interests = dynamoClient.createSet(item.interests)
        item.attendingEvents = dynamoClient.createSet([""])
        item.hostingEvents = dynamoClient.createSet([""])

    }
    const params = {
        TableName: table,
        Item: item
    };
    await dynamoClient.put(params).promise();
    const activityID = dynamoClient.createSet([item.id])
    if (item.hostID) {              //checks if this is an activity, if it is, item.hostID == true
                                    //update user table's attendingEvents and hostingEvents
        const params2 = {
        TableName: "User",
        Key: {
            id: item.hostID
        },
        UpdateExpression: 'ADD attendingEvents :newValue, hostingEvents :newValue',
        ExpressionAttributeValues: {  
            ':newValue': activityID
        },
    };
    await dynamoClient.update(params2).promise();
    }
};
 
const joinActivity = async (activity) => {
    const userID = dynamoClient.createSet([activity.userID])
    const params1 = {
        TableName: "Activity",
        Key: {
            id: activity.activityID
        },
        UpdateExpression: 'ADD attendeeID :newValue',
        ExpressionAttributeValues: {
            ':newValue': userID
        },
    };
    await dynamoClient.update(params1).promise();
    const activityID = dynamoClient.createSet([activity.activityID])
    const params2 = {
        TableName: "User",
        Key: {
            id: activity.userID
        },
        UpdateExpression: 'ADD attendingEvents :newValue',
        ExpressionAttributeValues: {
            ':newValue': activityID
        },
    };
    await dynamoClient.update(params2).promise();

}


const leaveActivity = async (activity) => {
    const userID = dynamoClient.createSet([activity.userID])
    const params1 = {
        TableName: "Activity",
        Key: {
            id: activity.activityID
        },
        UpdateExpression: 'DELETE attendeeID :newValue',
        ExpressionAttributeValues: {
            ':newValue': userID
        },
    };
    await dynamoClient.update(params1).promise();
    const activityID = dynamoClient.createSet([activity.activityID])
    const params2 = {
        TableName: "User",
        Key: {
            id: activity.userID
        },
        UpdateExpression: 'DELETE attendingEvents :newValue',
        ExpressionAttributeValues: {
            ':newValue': activityID
        },
    };
    await dynamoClient.update(params2).promise();

}
/* const updateAttendingList = async (activity, table) => {
    const params = {
        TableName: table,
        Key: {
            id: activity.userID
        },
        UpdateExpression: 'SET attendingEvents = list_append(attendintEvents, :newValue)',
        ExpressionAttributeValues: {
            ':newValue': [activity.activityID]
        },
    };
    await dynamoClient.update(params).promise();
} */



const deleteActivity = async (jason) => {
    const params = {
      TableName: "Activity",
      Key: {
        id: jason.activityID,
      },
    };
    await dynamoClient.delete(params).promise();         //deleting from table
    const activityID = dynamoClient.createSet([jason.activityID])
    const params1 = {
        TableName: "User",
        Key: {
            id: jason.hostID
        },
        UpdateExpression: 'DELETE hostingEvents :newValue',
        ExpressionAttributeValues: {
            ':newValue': activityID
        },
    };
    await dynamoClient.update(params1).promise();
    jason.attendeeIDList.forEach((attendee) => { dynamoClient.update({
      TableName: "User",
        Key: {
            id: attendee
        },
        UpdateExpression: 'DELETE attendingEvents :newValue',
        ExpressionAttributeValues: {
            ':newValue': activityID
        },
    }).promise();
        
    })

  };


module.exports = {
    dynamoClient,
    getItems,
    getItemById,
    addItem,
    updateItem,
    updateActivity,
    getItemsSortedById,
    getItemsByHostId,
    joinActivity,
    leaveActivity,
    deleteActivity
  }
