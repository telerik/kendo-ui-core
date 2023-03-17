---
title: Amazon DynamoDB
page_title: Amazon DynamoDB
description: "Learn how to create an Amazon DynamoDB table, and perform CRUD operations with the Telerik UI for {{ site.framework }} Grid."
slug: aws_dynamodb_aspnetcore
position: 4
---

# Using {{ site.framework }} with Amazon DynamoDB

This tutorial shows how to create a table in [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) and configure the Telerik UI for {{ site.framework }} Grid to perform remote CRUD (Create, Read, Update, Destroy) data operations in the DynamoDB table.

## Prerequisites

Before you start using the Grid with DynamoDB, you will need:

* An AWS account
* A user created in AWS Identity and Access Management (IAM)
* Basic knowledge on using [AWS Console](https://console.aws.amazon.com)
* An application set up to use {{ site.product }}

Refer to [Creating an AWS Account and a User]({% slug aws_getting_started_aspnetcore %}) for more information on how to create an account and a user.

## Application Configuration

Once you have a user with the necessary permissions, you can proceed with configuring the user authentication in your application. 

>Even though the following instructions demonstrate how to create a user identity and use that identity directly on the client to access a DynamoDB table, exposing user credentials directly on the client is not recommended. That is why, before sharing the client implementation with third parties or users, you should consider switching to the [Amazon Cognito](https://aws.amazon.com/cognito/getting-started/) authentication.

### User Authentication

1. In the `_Layout.cshtml` file, add references to the jQuery script and the client-side resources (CSS and js files) required by {{ site.product }}.
1. Load the Amazon AWS SDK script.
1. Configure the AWS authentication by passing the user details to the `AWS.config.update` method.

```
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kendo Grid DynamoDB Integration</title>

  <link rel="stylesheet" href=""https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css">

  <script src="https://sdk.amazonaws.com/js/aws-sdk-2.221.1.min.js"></script>
  <script src="https://kendo.cdn.telerik.com/{{site.cdnVersion}}/js/jquery.min.js"></script>
  <script src="https://kendo.cdn.telerik.com/{{site.cdnVersion}}/js/kendo.all.min.js"></script>
  <script src="https://kendo.cdn.telerik.com/{{site.cdnVersion}}/js/kendo.aspnetmvc.min.js"></script>

  <script>
    AWS.config.update({
      region: "us-east-1",
      endpoint: 'dynamodb.us-east-1.amazonaws.com',
      accessKeyId: "put the user access key ID here",
      secretAccessKey: "put the user secret access key here"
    });
  </script>
</head>
```

### Grid and Service Configuration

1. In the view, add a `<button>`, which you can use to create a table in DynamoDB on click.

	```
	<button class="k-button" id="btn">Click to create a 'Movies' table</button>
	```


1. Initialize the Grid. 

    The declaration of the Grid and the view model it uses are shown in the example below.

	```csharp
    @(Html.Kendo().Grid<GridDynamoDB.Models.MovieViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ID).Filterable(false);
            columns.Bound(p => p.Title);
            columns.Bound(p => p.ReleaseDate).Format("{0:MM/dd/yyyy}");
            columns.Command(command => { command.Edit(); command.Destroy(); }).Width(250);
        })
        .ToolBar(toolbar => toolbar.Create())
            .Editable(editable => editable.Mode(GridEditMode.InLine)
        )
        .Pageable()
        .Sortable()
        .Scrollable()
        .Filterable()
        .HtmlAttributes(new { style = "height:550px;" })
        .DataSource(dataSource => dataSource
            .Custom()
            .PageSize(20)
            .Schema(schema => schema.Model(m => {
                m.Id(p => p.ID);
                m.Field("ID", typeof(string)).Editable(false);
                m.Field("Title", typeof(string));
                m.Field("ReleaseDate", typeof(DateTime));
            }))
            .Transport(t =>
            {
                t.Read("onRead");
                t.Create("onCreate");
                t.Update("onUpdate");
                t.Destroy("onDestroy");
            })
        )
    )
	```
    ```Model
    public class MovieViewModel
    {
        public string ID { get; set; }

        public string Title { get; set; }

        public DateTime ReleaseDate { get; set; }

    }
    ```

1. Initialize the AWS DynamoDB client.

	```JavaScript
    <script>
        var dynamodb = new AWS.DynamoDB();
        var docClient = new AWS.DynamoDB.DocumentClient();
    </script>
	```

1. Attach the click event handler for the button that creates the Movies table in DynamoDB.

	```JavaScript
    $('#btn').on('click', function () {
        var params = {
            // Set the name of the table to be created
            TableName: "Movies",
            // Configure the KeySchema. In this case the table uses a single key named "ID"
            KeySchema: [
                { AttributeName: "ID", KeyType: "HASH" }
            ],
            // The type of the key attribute is "string" ("S")
            AttributeDefinitions: [
                { AttributeName: "ID", AttributeType: "S" }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };

        // Send the request for creating new table
        dynamodb.createTable(params, function (err, data) {
            if (err) {
                alert(err.message);
            } else {
                alert(data.TableDescription.TableName + " table created!");
            }
        });
    });
	```


1. Implement the `onRead` handler for the `Read` data operation of the Grid and the logic to [`scan`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html) the DynamoDB table.

	```JavaScript
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

1. To add a new item to the table, use the `onCreate` handler for the `Create` data operation. Implement the [`put`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html) action. Assign a new `ID` to the item, before the newly created item is sent to the server.

	```JavaScript
    function onCreate(options) {
        var model = options.data;
        // Assigning an id to the new item
        model.ID = kendo.guid();
        // Date should be saved as an ISO string
        model.ReleaseDate = model.ReleaseDate.toISOString();

        var params = {
            TableName: "Movies",
            Item: model
        };

        docClient.put(params, function (err, data) {
            if (err) {
                options.error(err);
            } else {
                options.success(model);
            }
        });
    }
	```

1. The `onUpdate` handler for the `Update` data operation modifies the properties of the record and uses the [`update`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html) action with an `UpdateExpression` string.

	```JavaScript
    function onUpdate(options) {
        var model = options.data;
        // The date should be saved as an ISO string
        model.ReleaseDate = model.ReleaseDate.toISOString();

        var updateArray = [];
        var updateArrtibutes = {};

        // Get all fields and field values in the item
        for (var property in model) {
            // Skip the id field as it should be an immutable identifier
            if (model.hasOwnProperty(property) && property != "ID") {
                updateArray.push(property + " = :" + property);
                updateArrtibutes[":" + property] = model[property];
            }
        }

        // Generate the UpdateExpression string
        var updateExpression = "set " + updateArray.toString();

        var params = {
            TableName: "Movies",
            Key: {
                ID: model.ID
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: updateArrtibutes,
            // Return the modified item
            ReturnValues: "ALL_NEW"
        };
        docClient.update(params, function (err, data) {
            if (err) {
                options.error(err);
            } else {
                options.success(data.Attributes);
            }
        });
    }
	```

1. The `onDestroy` handler for the `Destroy` data operation uses the [`delete`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html) action to remove an item from the DynamoDB table. The item is identified by its `ID`. 

	```JavaScript
    function onDestroy(options) {
        var model = options.data;

        var params = {
            TableName: "Movies",
            Key: {
                ID: model.ID
            },
            ReturnValues: "ALL_OLD"
        };

        docClient.delete(params, function (err, data) {
            if (err) {
                options.error(err);
            } else {
                options.success(data.Attributes);
            }
        });
    }
	```

With the CRUD data operations of the Grid properly configured, you can create new records in the Grid and they will be added to the DynamoDB table. You can also edit or delete records and these operations will trigger the respective changes in the table.

## See Also

* [Uploading to Amazon S3 storage]({% slug aws_s3_storage_aspnetcore %})
