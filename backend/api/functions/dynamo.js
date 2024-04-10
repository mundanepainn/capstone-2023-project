const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Users";

const getItems = async (table) => {     //gets all items from a table in dynamoDB
    const params = {
        TableName: table
    };
    const items = await dynamoClient.scan(params).promise();
    return items;
};

const getItemById = async (id, table) => {  //uses an id (primary key) to get a specific item from a table
    // console.log("test", id, table)
    const params = {
        TableName: table,
        Key: {
            id
        }
    }
    const items = await dynamoClient.get(params).promise();
    return items
};

const getItemsByHostId = async (id, table) => {     //searching by GSI in dynamoDB. GSI has been setup 
    const params = {                                // in the table
        TableName: table,
        IndexName: "hostID-date-index",
        KeyConditionExpression: "hostID = :id",
        ExpressionAttributeValues: { ':id': id }
    }
    return await dynamoClient.query(params).promise();
}


const getItemsSortedById = async (table) => {       //sorts items by ID
    const params = {
        TableName: table,
        KeyConditionExpression: 'id = :id',
        ScanIndexForward: false,    // true = ascending, false = descending
    }
}

const updateActivity = async (activity) => {            //updating an activity, takes an activity as a parameter
    if (activity.attendeeID) {
        activity.attendeeID = dynamoClient.createSet(activity.attendeeID) //create a string set for attendeeID
    }
    const params = {
        TableName: "Activity",
        Item: activity,
    };
    await dynamoClient.put(params).promise();         //inserting into table
};

const updateItem = async (item, table) => {     //update a specific item in a table   
    if (table == "ChatLog") {                   //if table is a chatlog, we are just appending new chatcontent
        const params = {
            TableName: table,
            Key: {
                id: item.id
            },
            UpdateExpression: "SET #list1 = list_append(#list1, :newValue1), #list2 = list_append(#list2, :newValue2), #list3 = list_append(#list3, :newValue3)",
            ExpressionAttributeNames: {
                "#list1": "chatSender",     //append new chat content with sender id and itmestamp
                "#list2": "chatContent",
                "#list3": "timeStamp",
                // "#value": "lastMessage"
            },
            ExpressionAttributeValues: {
                ":newValue1": [item.chatSender],    //every string must be changed to a list for appending
                ":newValue2": [item.chatContent],
                ":newValue3": [item.timeStamp],
                /* ":newValue4": item.timeStamp   */
            }
        }
        await dynamoClient.update(params).promise();
    } else {
        const params = {
            TableName: table,
            Key: {
                id: item.id
            },
            UpdateExpression: "set #name = :name",
            ExpressionAttributeNames: {
                "#name": "name"     // set which attribute to change, e.g., name attribute

            },
            ExpressionAttributeValues: {
                ":name": item.name
            }
        }
        await dynamoClient.update(params).promise();
    }



};


const addItem = async (item, table) => {   //this function deals with adding new items to a table
    let chatRoom, participant               //initialising variables for chatroom
    if (table == "User") {                  //if adding to user table, make data compatible by creating empty string sets
        item.chatRooms = dynamoClient.createSet([""])
        item.requestedActivities = dynamoClient.createSet([""])
        item.reviews = dynamoClient.createSet([""])
    }
    if (item.attendeeID) {                  //if item is an activity
        item.attendeeID = dynamoClient.createSet([item.attendeeID]) //create a string set for attendeeID  
        item.pendingUsers = dynamoClient.createSet([""])
        participant = dynamoClient.createSet([item.hostID])
        chatRoom = dynamoClient.createSet([item.id + "," + item.name]) //create a string set for chatRoom in User table
    }
    if (item.interests) {               //if item.interests is not empty
        item.interests = dynamoClient.createSet(item.interests)     //this is for userCreation
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
    //for activity creation, create new chatLog entry and update user's chatLog
    if (table == "Activity") {
        // console.log("This is a chatroom test message")
        const chatID = item.id + "," + item.name
        const now = new Date()
        await dynamoClient.put({
            TableName: "ChatLog",
            Item: {
                id: chatID,
                chatContent: [],
                chatSender: [],
                timeStamp: [],
                participants: participant,
                // lastMessage: now.getTime()
            }
        }).promise()

        await dynamoClient.update({
            TableName: "User",
            Key: {
                id: item.hostID
            },
            UpdateExpression: 'ADD chatRooms :newValue',
            ExpressionAttributeValues: {
                ':newValue': chatRoom
            },
        }).promise()
    }
    if (table == "Review") {
        await dynamoClient.update({
            TableName: "User",
            Key: {
                id: item.reviewee
            },
            UpdateExpression: 'ADD reviews :newValue',
            ExpressionAttributeValues: {
                ':newValue': dynamoClient.createSet([item.id])
            },
        }).promise()
    }
};

const joinActivity = async (activity) => {
    const userID = dynamoClient.createSet([activity.userID])    //add to user's chatRoom string set, add to chatRoom's participants (string set)
    const chatID = activity.activityID + "," + activity.activityName
    const activityID = dynamoClient.createSet([activity.activityID])
    if (activity.joinRequest == "request") {                //handle user's request to join a private event
        await dynamoClient.update(                          //add to activity's pendingUsers attribute
            {
                TableName: "Activity",
                Key: {
                    id: activity.activityID
                },
                UpdateExpression: 'ADD pendingUsers :newValue',
                ExpressionAttributeValues: {
                    ':newValue': userID
                },
            }
        ).promise()

        await dynamoClient.update(              //add to requestor's requestedActivities attribute
            {
                TableName: "User",
                Key: {
                    id: activity.userID
                },
                UpdateExpression: 'ADD requestedActivities :newValue',
                ExpressionAttributeValues: {
                    ':newValue': activityID
                },
            }
        ).promise()
        return
    } else if (activity.joinRequest == "accept" || activity.joinRequest == "decline") {
        await dynamoClient.update(      // handling response from host, in both situations
            {                           // remove user from pendingUsers and remove activity from 
                TableName: "Activity",  // requested. If accept, function continues, 
                Key: {                  // else, stop after this else if block by returning
                    id: activity.activityID
                },
                UpdateExpression: 'DELETE pendingUsers :newValue',
                ExpressionAttributeValues: {
                    ':newValue': userID
                },
            }
        ).promise()

        await dynamoClient.update(      //remove activity from user's requested activities string set
            {
                TableName: "User",
                Key: {
                    id: activity.userID
                },
                UpdateExpression: 'DELETE requestedActivities :newValue',
                ExpressionAttributeValues: {
                    ':newValue': activityID
                },
            }
        ).promise()
        if (activity.joinRequest == "decline") {
            return
        }

    }
    const params1 = {                   //add user to activity's attendeeID string set
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

    const params2 = {                   //add activity to user's activities string set
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

    await dynamoClient.update({         //add chatrroom id to user's chatrooms string set
        TableName: "User",
        Key: {
            id: activity.userID
        },
        UpdateExpression: 'ADD chatRooms :newValue',    //activity chatroom added to user's list
        ExpressionAttributeValues: {
            ':newValue': dynamoClient.createSet([chatID])
        },
    }).promise()

    await dynamoClient.update({         //add user to chatlog string set
        TableName: "ChatLog",
        Key: {
            id: chatID
        },
        UpdateExpression: 'ADD participants :newValue', //user is admitted into the chatroom
        ExpressionAttributeValues: {
            ':newValue': userID
        },
    }).promise()

}


const leaveActivity = async (activity) => {                 //when user leaves an activity
    const userID = dynamoClient.createSet([activity.userID])
    const chatID = activity.activityID + "," + activity.activityName
    const activityID = dynamoClient.createSet([activity.activityID])
    const params1 = {
        TableName: "Activity",
        Key: {
            id: activity.activityID
        },
        UpdateExpression: 'DELETE attendeeID :newValue',    //delete user from activity table's attendeeID string set
        ExpressionAttributeValues: {
            ':newValue': userID
        },
    };
    await dynamoClient.update(params1).promise();
    const params2 = {
        TableName: "User",
        Key: {
            id: activity.userID             //delete activity from user's attendingEvents string set
        },
        UpdateExpression: 'DELETE attendingEvents :newValue',
        ExpressionAttributeValues: {
            ':newValue': activityID
        },
    };
    await dynamoClient.update(params2).promise();
    await dynamoClient.update({             //chatroom is removed from user's chatroom string set
        TableName: "User",
        Key: {
            id: activity.userID
        },
        UpdateExpression: 'DELETE chatRooms :newValue',
        ExpressionAttributeValues: {
            ':newValue': dynamoClient.createSet([chatID])
        },
    }).promise()

    await dynamoClient.update({
        TableName: "ChatLog",               //user is removed from chatroom 
        Key: {
            id: chatID
        },
        UpdateExpression: 'DELETE participants :newValue',
        ExpressionAttributeValues: {
            ':newValue': userID
        },
    }).promise()


}


const deleteActivity = async (jason) => {           //deleting an activity
    const params = {
        TableName: "Activity",
        Key: {
            id: jason.activityID,
        },
    };
    await dynamoClient.delete(params).promise();         //deleting from table


    const activityID = dynamoClient.createSet([jason.activityID]) //delete activity from host's string set of hosting events
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
    jason.attendeeIDList.forEach((attendee) => {
        dynamoClient.update({
            TableName: "User",                //delete activity from user's hosting events string set
            Key: {
                id: attendee
            },
            UpdateExpression: 'DELETE attendingEvents :newValue',
            ExpressionAttributeValues: {
                ':newValue': activityID
            },
        }).promise();
    })

    const chatID = jason.activityID + "," + jason.activityName //chatroom ID
    const params2 = {
        TableName: "ChatLog",   //delete chatlog 
        Key: {
            id: chatID,
        },
    };
    await dynamoClient.delete(params2).promise();

    jason.attendeeIDList.forEach((attendee) => {
        dynamoClient.update({  //for all activity participants,
            TableName: "User",                                            //delete the chatroom from their string set
            Key: {
                id: attendee
            },
            UpdateExpression: 'DELETE chatRooms :newValue',
            ExpressionAttributeValues: {
                ':newValue': dynamoClient.createSet([chatID])
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
