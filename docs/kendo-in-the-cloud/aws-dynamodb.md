---
title: Consuming Data from Amazon DynamoDB
page_title: Create and Consume Data from AWS DynamoDB Table | Kendo UI in the Cloud
description: "Learn how to implement create an Amazone DynamoDB table, retrive, write and edit data in it with the Kendo UI Grid."
slug: aws_dynamodb
position: 3
---

# Consuming Data from Amazon DynamoDB

This article provides a step-by-step tutorial on how to create a table in [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) and configure the [Kendo UI Grid]({% slug overview_kendoui_grid_widget %}) to retrieve, create, update and destroy items in that table.

## Prerequisites

You will need to create an [Amazon AWS account](https://aws.amazon.com/account/). Basic knowledge on how to use the [AWS Console](https://console.aws.amazon.com) would be required.

## Creating a User that Would Access and Manipulate the Amazon DynamoDB Table

> **Important**
>
> The below instructions demonstrate how to create a user identity and use that identity directly on the client to access a DynamoDB table. Nevertheless, exposing a user credentials directly on the client is generally not recommended. Therefore, before sharing the client implementation with third parties / users, it is highly recommended to consider switching to [Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html) authentication.

1. In the [AWS Console](https://console.aws.amazon.com) search for "iam" (Identity and Access Management);

1. On the IAM console select "Users" and then "Add User";

1. Type a User name (for our example we will name the user `kendo_grid_user`) and check "Programmatic access" option. Click `Next: Permissions`;

	**Figure 1: Add new user**

	![Add new user](/kendo-in-the-cloud/images/add-user-initial.png)

1. On the Permissions step select `Attach existing policies directly` then type in the search field `dynamodb` and check the `AmazonDynamoDBFullAccess` option in the table. Click `Next: Review` and then `Create user`;

	**Figure 2: Configure user permissions**

	![Configure permissions](/kendo-in-the-cloud/images/add-user-permissions.png)

1. Copy the `Access key ID` and the `Secret access key` from the summary view of the newly created user;

	**Figure 3: Get user credentials**

	![Get credentials](/kendo-in-the-cloud/images/add-user-credentials.png)

## Configure Kendo UI Grid to Consume and Manipulate Data Available in DynamoDB

### Configure the Page to Load AWS SDK, jQuery, Kendo UI and the Authenticate the Proper AWS User

In the `<head>` of your HTML page, first load the Kendo UI styles and then the scripts (Amazon AWS SDK, jQuery and Kendo). Finally configure the AWS authentication using the already created user:

```
<head>
  <meta charset="utf-8">
  <title>Kendo Grid DynamoDB Integration</title>

  <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.common.min.css">
  <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.default.min.css">

  <script src="https://sdk.amazonaws.com/js/aws-sdk-2.221.1.min.js"></script>
  <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
  <script src="https://kendo.cdn.telerik.com/2018.1.221/js/kendo.all.min.js"></script>

  <script>
    AWS.config.update({
      region: "us-east-1",
      endpoint: 'dynamodb.us-east-1.amazonaws.com',
      accessKeyId: [the user access key ID],
      secretAccessKey: [the user secret access key]
    });
  </script>
</head>
```

### Configure the Grid Widget and the service

1. In the `<body>` of the page place a `<div>` element to initialize the Grid from. Create also a `<button>` that would allow you to create a Table in DynamoDB on click:
	
	```
	<div id="grid"></div>
	<button class="k-button" id="btn">Click to create 'Movies' table</button>
	```

1. Initialize the AWS DynamoDB client:

	```JavaScript
	var dynamodb = new AWS.DynamoDB();
    var docClient = new AWS.DynamoDB.DocumentClient();
	```
	
1. Implement the handler for the Create movies button click:

	```JavaScript
	$('#btn').on('click', function() {
		var params = {
			// Set the name of the table to be created
			TableName : "Movies",
			// Configure the KeySchema. In this case the table uses a single key named "id"
			KeySchema: [
				{ AttributeName: "id", KeyType: "HASH" }
			],
			// The type of the key attribute is "string" ("S")
			AttributeDefinitions: [       
				{ AttributeName: "id", AttributeType: "S" }
			],
			ProvisionedThroughput: {       
				ReadCapacityUnits: 5,
				WriteCapacityUnits: 5
			}
		};
		
		// Send the request for creating new table
		dynamodb.createTable(params, function(err, data) {
			if (err) {
				alert(err.message);
			} else {
				alert(data.TableDescription.TableName + " table created!");
			}
		});
	});
	```
	
1. Implement the Grid that would consume the DynamoDB data:
	```
	$('#grid').kendoGrid({
	  editable: { mode: "popup" },
	  toolbar: ["create"],
	  height: 600,
	  columns: [
		{ field: "title", title: "Title", width: "15%" }, 
		{ field: "release_date", title: "Release", template: "#= kendo.toString(release_date, 'd') #", width: "8%"},
		{ field: "directors", title: "Directors", width: "10%"},
		{ field: "actors", title: "Actors", width: "17%"},
		{ field: "plot", title: "Plot", width: "34%"},
		{ command: [{ name: "edit" }, { name: "destroy" }] }
	  ],
	  dataSource: {
		schema: {
		  model: {
			id: "id",
			fields: {
			  release_date: { type: "date", validation: { required: true } },
			  title: { type: "string", validation: { required: true } },
			  directors: { type: "string", validation: { required: true } },
			  actors: { type: "string", validation: { required: true } },
			  plot: { type: "string", validation: { required: true } }
			}
		  }
		},
		transport: {
		  read: onRead,
		  create: onCreate,
		  update: onUpdate,
		  destroy: onDestroy
		}
	  }
	});
	```
	
1. The `read` function should be implemented to [scan](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html) the DynamoDB table

	```
	function onRead(options) {
	  var params = {
		TableName: "Movies"
	  };

	  docClient.scan(params, function(err, data) {
		if (err) {
		  options.error(err);
		} else {
		  options.success(data.Items);          
		}
	  });
	};
	```

1. With the `create` function a new item will be added to the table. The [put](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html) action should be used. Also, new `id` for the newly created item should be assigned on the client before it has been sent to the server:

	```
	function onCreate(options) {
	  var model = options.data;
	  // Assigning an id to the new item
	  model.id = kendo.guid();
	  // Date should be saved as an ISO string
	  model.release_date = model.release_date.toISOString();

	  var params = {
		TableName: "Movies",
		Item: model
	  };

	  docClient.put(params, function(err, data) {
		if (err) {
		  options.error(err);
		} else {
		  options.success(model);
		}
	  });
	}
	```
	
1. The `update` function alters the properties of an item. It uses the [update](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html) action with an UpdateExpression:

	```
	function onUpdate(options) {
	  var model = options.data;
	  // Date should be saved as an ISO string
	  model.release_date = model.release_date.toISOString();

	  var updateArray = [];
	  var updateArrtibutes = {};

	  // Get all fields and field values in the item
	  for (var property in model) {
		// Skip the id field as it should be immutable identifier
		if (model.hasOwnProperty(property) && property != "id") {
		  updateArray.push(property + " = :" + property);
		  updateArrtibutes[":" + property] = model[property];
		}
	  }

	  // Generate the string UpdateExpression
	  var updateExpression = "set " + updateArray.toString();

	  var params = {
		TableName: "Movies",
		Key:{
		  id: model.id
		},
		UpdateExpression: updateExpression,
		ExpressionAttributeValues: updateArrtibutes,
		// Return the modified item
		ReturnValues:"ALL_NEW"
	  };
	  docClient.update(params, function(err, data) {
		if (err) {
		  options.error(err);
		} else {
		  options.success(data.Attributes);
		}
	  });
	}
	```
	
1. The `destroy` function will simply remove an item against its `id` from the DynamoDB table. It uses the [delete](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html) action:

	```
	function onDestroy(options) {
	  var model = options.data;

	  var params = {
		TableName: "Movies",
		Key:{
		  id: model.id
		},
		ReturnValues:"ALL_OLD"
	  };

	  docClient.delete(params, function(err, data) {
		if (err) {
		  options.error(err);
		} else {
		  options.success(data.Attributes);
		}
	  });
	}
	```

The Kendo Grid should be now properly binding its DataSource to the Movies DynamoDB table.

## See Also

* [Kendo UI Grid Overview]({% slug overview_kendoui_grid_widget %})
* [Binding to Azure Cosmos DB]({% slug azure_cosmos_db %})
* [Consuming Data from Azure Functions]({% slug azure_functions %})
* [Integrating Kendo UI with Azure Face API]({% slug azure_faceapi %})
