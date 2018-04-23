---
title: Consuming Data from Google Cloud Big Query
page_title: Google Cloud BigQuery Integration with Kendo UI Widgets | Kendo UI in the Cloud
description: "Learn how to bind the kendo UI Grid with data served through BigQuery"
slug: gcl-bigquery
position: 5
---

# Consuming Data from Google Cloud Big Query

This article provides a step-by-step tutorial on how to create a table in [Google Cloud's Big Query](https://aws.amazon.com/dynamodb/) and configure the [Kendo UI Grid]({% slug overview_kendoui_grid_widget %}) to retrieve, create, update and destroy items in that table.

## Prerequisites

You will need to create an [Google Cloud account](https://cloud.google.com/) and have basic knowledge on how to use the [Cloud Console](https://cloud.google.com/cloud-console/) would be required.


## Client-side Authorization and Access through OAuth 2.0

The Google APIs Client library for JavaScript handles the client-side authorization flow of storing and using OAuth 2.0 access and refresh tokens. When you authorize access to a Google API, you are provided an access token for making calls to the API - Google API OAuth 2.0 access tokens last for one hour. And, you can request and store a refresh token, which will allow you to request a new access token when the previous access token expires. More on how to setup the authorization could be found the [Authorizing API Requests article](https://cloud.google.com/bigquery/docs/authorization)

Below you can find steps for creating AOth 2.0 credentials and add Authorized JavaScript origin

1. Hover over the **APIs and Services** item from the left-hand side pane in the Console and select **Credentials** (see Figure 1):

    **Figure 1: Navigate To Credentials Section**
    ![Add new user](/kendo-in-the-cloud/images/gcl-credentials.png)

1. Click on the Create Credentials button and select OAuth client ID (see Figure 2):

    **Figure 2: Create OAuth client ID**
    ![create OAuth client ID](/kendo-in-the-cloud/images/gcl-auth.png)

1. Select the **Web Application** and add **Authorized JavaScript origins** (see Figure 3).
    For the purpose of the example, we are going to add runner.telerik.io as authorized origin, as this is the domain of the https://dojo.telerik.com/

    **Figure 3: Add runner.telerik.io as authorized origin**
    ![create OAuth client ID](/kendo-in-the-cloud/images/gcl-add-telerik.png)



## Create New DataSet and Table in BigQuery

In the [Creating and Using Datasets](https://cloud.google.com/bigquery/docs/tables) article from the BigQuery documentation, you can find a detailed information on how to create new DataSet. As for the tables, you can refer ot the [Creating and Using Tables](https://cloud.google.com/bigquery/docs/tables).

For the purpose of the example, we have created a simple products table, which has the following Schema (Figure 4) and Data (Figure 5):

**Figure 4: Schema of the Products Table in KendoDS DataSet**
    ![products table](/kendo-in-the-cloud/images/gcl-table-schema.png)
**Figure 5: Data of the Products Table**
    ![products table](/kendo-in-the-cloud/images/gcl-table-data.png)


## Configure Kendo UI Grid to Consume and Manipulate Data Available in BigQuery


### Configure the Page to Load Google APIs, jQuery, Kendo UI and set OAuthorization.

In the `<head>` of your HTML page, first load the Kendo UI styles and then the scripts (Google APIs, jQuery and Kendo). Then, you can add a button on your page to trigger authentication and load the google api:

(see #2 in [Client-side Authorization and Access through OAuth 2.0](#client-side-authorization-and-access-through-aouth-2.0) for how to create client_id )
```javascript
<head>
    <meta charset="utf-8">
    <title>Kendo Grid BigQuery Integration</title>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css">
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.min.css">
    <script src="https://apis.google.com/js/api.js"></script>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
</head>
<script>

    var client_id = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com';
    var project_id = 'XXXXXXXXXXXXXXXXXX';


function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/cloud-platform.read-only"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/bigquery/v2/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: client_id});
  });
</script>

<button class="k-button" onclick="authenticate().then(loadClient)">authorize and load</button>

</script>
```

### Configure the Grid Widget and its Data Operations with BigQuery

1. In the `<body>` of the page place a `<div>` element to initialize the Grid from. Also, add a button which will create and populate the grid with data upon click.
    ```
    <div id="grid"></div>
    <button class="k-button" onclick="execute()">execute</button>
    ```

1. Initialize the Kendo Grid in the click handler of the execute button

    ```javascript
    function execute() {
    $("#grid").kendoGrid({
        toolbar: ["create"],
        columns: [

            { field: "productid", title: "ProductID",  width: "100px", editable: function (dataItem) {
            return dataItem.isNew();
        }  },
        { field: "productname", title: "ProductName",  width: "200px" },
        { field: "unitsinstock", title: "UnitsInStock",  width: "120px" },
        { field: "unitprice", title: "UnitPrice", format: "{0:c}",  width: "120px" },
        { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
        editable: "inline",
        dataSource: {
            sort: {field: "productid", dir: "asc"},
            transport: {
                read: function(options) {
                    ...
                },
                update: function(options){
                    ...
                },
                create: function(options){
                    ...
                },
                destroy: function(options){
                    ...
                }
                },
            schema: {
                    model: {
                    id: "productid",
                    fields: {
                        productid: { editable: true, type: "number", nullable: true, defaultValue: -1 },
                        ProductName: { validation: { required: true } },
                        UnitPrice: { type: "number", validation: { required: true, min: 1} },
                        UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                    }
                }


            }
        })
    ```
    > **Important**
    >
    > The read, create, update and destroy functions of the Grid's Data Source should be handled, in order to manage the BigQuery Data. For that purpose, the example uses [BigQuery Jobs](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs) objects that manage asynchronous tasks such as running queries, loading data, and exporting data. In order to directly implement the query for the BigQuery data in the functions of the Grid's DataSource, we use the [Query Job](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query).

1. The `read` function should be implemented, in order to trigger a SELECT query to the BigQuery table. Once we have a response, the data is returned in the response. We can manipulate it in a preferable manner, in order to provide the Grid with it (see then() implementation):

	```
    read: function(options) {
        return gapi.client.bigquery.jobs.query({
            'projectId': project_id,
            'query': 'SELECT * FROM KendoDS.products'
        })
            .then(function(response) {
            var gridData = [];
            $.each(response.result.rows, function(i, item) {
            var productid = item.f[0].v;
            var productname = item.f[1].v;
            var unitsinstock = item.f[6].v;
            var unitprice = item.f[5].v;
            gridData.push({
                productid: productid,
                productname: productname,
                unitsinstock: unitsinstock,
                unitprice: unitprice
            });
            });
            options.success(gridData) // provides the data to the Grid
    },
            function(err) {
        console.error("Execute error", err);
    });
    }
	```
1. With the `create` function a new item will be added to the table. For that purpose, we construct an INSERT query to inject it in the table. Make sure that the **useLegacySql** is set to **false**, otherwise an insert won't be authorized.

	```
    create: function(options) {
        var grid = $("#grid").data("kendoGrid");
        var content = grid.element.find("tbody");
        var row = $(content).find('tr').last();
        var dataItem = grid.dataItem(row);

        var productid = dataItem.productid;
        var productname = '"' + options.data.productname + '"';
        var unitsinstock = options.data.unitsinstock;
        var unitprice = options.data.unitprice;

        return gapi.client.bigquery.jobs.query({
                'projectId': project_id,
                "useLegacySql": false,
                "query": "INSERT KendoDS.products (ProductID, ProductName, UnitsInStock, UnitPrice) VALUES(" + productid + ", " + productname + ", " + unitsinstock + ", " + unitprice + ");"
            })
            .then(function(response) {
                    options.success(options.data);
                },
                function(err) {
                    console.error("Execute error", err);
                });
    }
	```
1. With the `update` function you can manage the altering of data for a specific record. For that purpose, we construct an UPDATE query to alter the certain record. Make sure that the **useLegacySql** is set to **false**, otherwise the operation won't be authorized.
    ```
    update: function(options) {

        var productid = options.data.productid;
        var productname = '"' + options.data.productname + '"';
        var unitsinstock = options.data.unitsinstock;
        var unitprice = options.data.unitprice;

        return gapi.client.bigquery.jobs.query({
                "projectId": project_id,
                "useLegacySql": false,
                "query": "UPDATE KendoDS.products SET ProductName = " + productname + " , UnitsInStock = " + unitsinstock + ", UnitPrice = " + unitprice + " WHERE ProductID = " + productid + ";"
            })
            .then(function(response) {
                    options.success(options.data);
                },
                function(err) {
                    console.error("Execute error", err);
                });
    }
    ```

1. In the `destroy` function you should implement the delete record operation. For that purpose, we construct an DELETE query to remove the certain record. Make sure that the **useLegacySql** is set to **false**, otherwise the operation won't be authorized.
    ```
    destroy: function(options) {
        var productid = options.data.productid;
        return gapi.client.bigquery.jobs.query({
                'projectId': project_id,
                "useLegacySql": false,
                'query': "DELETE KendoDS.products WHERE ProductID = " + productid + ";"
            })
            .then(function(response) {
                    alert("item deleted")
                    options.success(response)
                },
                function(err) {
                    console.error("Execute error", err);
                });
    }
    ```

As a result, you should have a runnable example with Kendo Grid, capable of read and edit operations on a BigQuery table, entirely implemented at client-side.

## See Also
* [Kendo UI Grid Overview]({% slug overview_kendoui_grid_widget %})
* [Consuming Data from Azure Functions]({% slug azure_functions %})
* [Binding to Azure Cosmos DB]({% slug azure_cosmos_db %})
* [Integrating Kendo UI with Azure Face API]({% slug azure_faceapi %})
* [Consuming Data from Amazon DynamoDB]({% slug aws_dynamodb %})