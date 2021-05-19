---
title: Azure Cosmos DB
page_title: Azure Cosmos DB | Kendo UI in the Cloud
description: "Learn how to bind the Kendo UI Grid to Azure Cosmos DB and perform CRUD operations."
slug: azure_cosmos_db
position: 0
---

# Azure Cosmos DB

This article provides a step-by-step tutorial on how to add Kendo UI to an existing web application that is built with Azure Cosmos DB through SQL .NET API and Azure Portal, and how to configure a [Kendo UI Grid]({% slug overview_kendoui_grid_widget %}) to display Cosmos DB data and perform CRUD operations.

The complete implementation of the sample project is available in the [Kendo UI Cloud Integration](https://github.com/telerik/kendo-cloud-integration/tree/master/AzureCosmosDB) repository on GitHub.

## Prerequisites

Basic knowledge on the organization of [Azure Portal](https://docs.microsoft.com/en-us/azure/azure-portal/).

## Creating Azure Cosmos DB Applications

1. Follow the steps from the [Build a .NET web app with Azure Cosmos DB using the SQL API and the Azure Portal](https://docs.microsoft.com/en-us/azure/cosmos-db/create-sql-api-dotnet) quickstart.

    This quickstart demonstrates how create an Azure Cosmos DB SQL API account, document database, and collection by using the Azure Portal. You will also build and deploy a sample To-Do List web application.

1. After successfully completing the quickstart, add Kendo UI to the To-Do List sample application by implementing the endpoints for the CRUD operations and configuring the Grid to use the endpoints.

## Adding CSS and JavaScript References

To use Kendo UI in the sample project, [add the Kendo UI CSS and JavaScript references]({% slug getting_started_installation_kendoui %}) in the head tag of the `_Layout.cshtml` file.

```HTML
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - Todo App with Azure DocumentDB</title>
    @Styles.Render("~/Content/css")
    @Scripts.Render("~/bundles/modernizr")

    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.default.min.css" />

    @Scripts.Render("~/bundles/jquery")
    <script src="https://kendo.cdn.telerik.com/2018.1.221/js/kendo.all.min.js"></script>
</head>
```

## Implementing the Create, Read, Update, and Destroy Actions

1. Add the following `using` statements to the `ItemController`.

    ```C#
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using System.Linq;
    ```

1. Implement the four actions in the `ItemController` which will be called by the Grid on performing CRUD operations. Name the actions, for example, `KendoRead`, `KendoCreate`, `KendoUpdate`, and `KendoDestroy`.

The following example demonstrates the `Read` action.

```C#
[ActionName("KendoRead")]
public async Task<ActionResult> KendoRead()
{
    var items = await DocumentDBRepository<Item>.GetItemsAsync(d => !d.Completed);

    return this.Json(items, JsonRequestBehavior.AllowGet);
}
```

The following example demonstrates the `Create` action.

```C#
[ActionName("KendoCreate")]
public async Task<ActionResult> KendoCreate(string models)
{
    var items = JsonConvert.DeserializeObject<IEnumerable<Item>>(models);


    if (items != null && ModelState.IsValid)
    {
        Item item = items.FirstOrDefault();
        await DocumentDBRepository<Item>.CreateItemAsync(item);
    }

    return Json(items, JsonRequestBehavior.AllowGet);
}
```

The following example demonstrates the `Update` action.

```C#
[ActionName("KendoUpdate")]
public async Task<ActionResult> KendoUpdate(string models)
{
    var items = JsonConvert.DeserializeObject<IEnumerable<Item>>(models);

    if (items != null && ModelState.IsValid)
    {
        Item item = items.FirstOrDefault();
        await DocumentDBRepository<Item>.UpdateItemAsync(item.Id, item);
    }

    return Json(items, JsonRequestBehavior.AllowGet);
}
```

The following example demonstrates the `Destroy` action.

```C#
[ActionName("KendoDestroy")]
public async Task<ActionResult> KendoDestroy(string models)
{
    var items = JsonConvert.DeserializeObject<IEnumerable<Item>>(models);

    if (items != null && ModelState.IsValid)
    {
        Item item = items.FirstOrDefault();
        await DocumentDBRepository<Item>.DeleteItemAsync(item.Id, item.Category);
    }

    return Json(items, JsonRequestBehavior.AllowGet);
}
```

## Consuming the Implemented CRUD Endpoints on the Client

To consume the data from the endpoints and display it in the Grid, configure the widget and its data source.

```HTML
<div id="grid"></div>

<script>
   $("#grid").kendoGrid({
       dataSource: {
           transport: {
               read: {
                   url: "/Item/KendoRead/",
                   dataType: "json"
               },
               update: {
                   url: "/Item/KendoUpdate",
                   dataType: "json"
               },
               destroy: {
                   url: "/Item/KendoDestroy",
                   dataType: "json"
               },
               create: {
                   url: "/Item/KendoCreate",
                   dataType: "json"
               },
               parameterMap: function (options, operation) {
                   if (operation !== "read" && options.models) {
                     return { models: kendo.stringify(options.models) };
                 }
               }
           },
           batch: true,
           pageSize: 10,
           schema: {
               model: {
                   id: "Id",
                   fields: {
                       Id: { type: "string", editable: false, nullable: true },
                       Name: { validation: { required: true } },
                       Description: { type: "string", required: true },
                       Category: { type: "string", required: true },
                       Completed: { type: "boolean" }
                   }
               }
           }
       },
       pageable: true,
       height: 500,
       toolbar: ["create"],
       columns: [
           { field: "Name", title: "Task Name", width: "220px" },
           { field: "Description", title: "Description", width: "120px" },
           { field: "Category", title: "Category", width: "120px" },
           { field: "Completed", title: "Completed", width: "120px" },
           { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
       editable: {
           mode: "popup"
       }
   });
</script>
```

## See Also

* [Consuming Data from Azure Functions]({% slug azure_functions %})
* [Integrating Kendo UI with Azure Face API]({% slug azure_faceapi %})
* [Consuming Data from Amazon DynamoDB]({% slug aws_dynamodb %})
* [Kendo UI Grid Overview]({% slug overview_kendoui_grid_widget %})
