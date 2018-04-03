---
title: Consuming Data from Azure Functions
page_title: Kendo Grid with Azure Functions | Kendo UI Consuming Data from Cloud Storage
description: "Learn how to implement Azure Functions to execute remote CRUD operations for Kendo Grid."
slug: azure_functions
position: 1
---

# Kendo Grid Integration with Azure Functions

This article provides a step-bystep example of how to configure [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) to serve data for a [Kendo UI Grid]({% overview_kendoui_grid_widget %}).

## Prerequisits

The following tutorial requires basic knowledge on how the [Azure Portal]( https://docs.microsoft.com/en-us/azure/azure-portal/) is organized.

## Create an Azure Functions Application

1. Follow the steps from the [Create your first function in the Azure portal quickstart](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function) . Follow the section [Create a function app]( https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function#create-a-function-app);

1. Name the application `kendo-grid-functions` and set the name of the storage account to `kendogridfunctions`;

1. In the [Azure Portal](https://portal.azure.com/) go to the newly created `kendo-grid-functions` app.

## Create HTTP Triggered Functions for the CRUD Operations

Follow the below steps for each of the four functions (read, create, destroy and update):

1. On the left-side panel, under the application name, click the plus symbol, which appears on the right when the `Functions` section is hovered;

1. If the `Get started quickly with a premade function` screen appears, click on `Custom function` link at the bottom;

1. Click on the `HTTP trigger` option. On the panel appearing on the right choose the language and fill in meaningful name for each function. Further in the example we will implement the Azure Functions in C#. Therefore, chose that language. Also, the names of the four functions will be: `Read`, `Create`, `Update` and `Destroy`.

## Integrate Input for the Read Function

1. Expand the `Read` function and click on the `Integrate` section available below the function name in the left navigation panel;

1. In the `Inputs` section click on the `New Input` button;

1. Select `Azure Table Storage` as input storage to be integrated and click `Select`;

1. Type `Product` for Partition key of the Table;

1. Chose the maximum number of records to read. In our case we won’t change the default value of 50;

1. In the `Storage account connection` click on the `new` link available to the right of the field;

1. Select the `kendogridfunctions` connection, that we have created on the initial set up of the application;

1. Change the `Table name` to `Products`;

1. Click `Save` to save the newly integrated input table;

## Integrate Output for the Create, Destroy and Update Functions

For each of the other three functions (Create, Destroy and Update) an output integration should be configured:

1. Click on the `New Output`;

1. Again, select `Azure Table Storage`;

1. Select the `kendogridfunctions_STORAGE` for Storage account connection;

1. Change the `Table name` to `Products`.

## Implement the Model

Now we will proceed with the actual implementation. First, create a definition for the `Product` class:

1. Select the `Read` function;

1. On the right side click on `View files`;

1. Click on the `Add` button and name the new file `product.csx`;

1. Place the following class definition in the file:

	```C#
	using Microsoft.WindowsAzure.Storage.Table;

	public class Product :TableEntity
	{
		public string ProductName { get; set; }

		public double UnitPrice { get; set; }

		public int UnitsInStock { get; set; }

		public bool Discontinued { get; set; }

		public Product ToEntity()
		{
			return new Product
			{
				PartitionKey = "Product",
				RowKey = this?.RowKey,
				ProductName = this?.ProductName,
				UnitPrice = this.UnitPrice,
				UnitsInStock = this.UnitsInStock,
				Discontinued = this.Discontinued,
				ETag = "*"
			};
		}
	}
	```

## Implement the Read Function

Open the `run.csx` file under the `Read` function and follow the below steps:

1. Before the first using, include the following load directive, that would allow you to use the Model class definition in the actual function:

	```C#
	#load "product.csx"
	```

1. Also include reference to the `Microsoft.WindowsAzure.Storage` and using for the `Table` library:

	```C#
	#r "Microsoft.WindowsAzure.Storage"
	…
	using Microsoft.WindowsAzure.Storage.Table;
	```

1. Then you could modify the function `Run` method definition to the following:

	```C#
	public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, IQueryable<Product> inputTable, TraceWriter log)
	{
		if (req.Method == HttpMethod.Get)
		{
			// Return the Products table as list
			return req.CreateResponse(HttpStatusCode.OK, inputTable.ToList(), "application/json");
		}
		else
		{
			return req.CreateResponse(HttpStatusCode.BadRequest, "This route accepts only GET requests.");
		}
	}
	```

	Note the newly added `inputTable` parameter. That would allow you to get and return the Products stored in the integrated Table Storage.

## Implement the Create, Destroy and Update Function

Now we could proceed with the implementation of the Create, Destroy and Update functions:

1. First, all of them should load the Product class and should refer the `Microsoft.WindowsAzure.Storage` and `Newtonsoft.Json` assemblies. The respective usings should also be present:

	```C#
	#r "Newtonsoft.Json"
	#r "Microsoft.WindowsAzure.Storage"
	#load "..\Read\product.csx"

	using System.Net;
	using Microsoft.WindowsAzure.Storage.Table;
	using Newtonsoft.Json;
	```

1. Then, the `Run` methods for the three functions will differ;

1. The method for the `Create` function:

	```C#
	public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, CloudTable outputTable, TraceWriter log)
	{
		dynamic body = await req.Content.ReadAsStringAsync();
		Product data = JsonConvert.DeserializeObject<Product>(body as string);
		Product entity = data.ToEntity();
		string newKey = Guid.NewGuid().ToString();

		entity.RowKey = newKey;
		var operation = TableOperation.Insert(entity);
		await outputTable.ExecuteAsync(operation);

		return req.CreateResponse(HttpStatusCode.OK, entity, "application/json");
	}
	```

1. The method for the `Destroy` function:

	```C#
	public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, CloudTable outputTable, TraceWriter log)
	{
		dynamic body = await req.Content.ReadAsStringAsync();
		Product data = JsonConvert.DeserializeObject<Product>(body as string);
		Product entity = data.ToEntity();

		var operation = TableOperation.Delete(entity);
		await outputTable.ExecuteAsync(operation);

		return req.CreateResponse(HttpStatusCode.OK, entity, "application/json");
	}
	```

1. The method for the `Update` function:

	```C#
	public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, CloudTable outputTable, TraceWriter log)
	{
		dynamic body = await req.Content.ReadAsStringAsync();
		Product data = JsonConvert.DeserializeObject<Product>(body as string);
		Product entity = data.ToEntity();

		var operation = TableOperation.Replace(entity);
		await outputTable.ExecuteAsync(operation);

		return req.CreateResponse(HttpStatusCode.OK, entity, "application/json");
	}
	```

## Configure the Application

As the implementation is already in place, we will need some more configurations on the application and for each of the four functions:

1. Click the application name and click `Platform features`;

1. Under the `API` section click `CORS`;

1. Add the domain origin of the client-side app, that will consume the Functions data and click Save. In our case the client-side app will be in Dojo. Therefore, the `https://runner.telerik.io` origin has been added;

1. Go to the `Read` function and open the `function.json` file;

1. In the `bindings / methods` section remove the `post` as an option;

1. Open the same file for the other three functions but remove the `get` method;

## Consume the Implemented CRUD Endpoints on the Client

Get the unique URL for each of the functions by clicking on the `Get Function URL` link available for each of them.

It is now time to implement the client, that would consume the data from the Functions app. Implement the Kendo Grid in the following way and place the proper CRUD operations endpoints in the DataSource Transport configuration:

```HTML
<div id="grid"></div>
<script>
  $(document).ready(function () {          
    function customBoolEditor(container, options) {
      var guid = kendo.guid();
      $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
      $('<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>').appendTo(container);
    }

    $("#grid").kendoGrid({
      toolbar: ["create"],
      columns: [
        { field:"ProductName", title: "Product Name", width: "150px" },
        { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "110px" },
        { field: "UnitsInStock", title:"Units In Stock", width: "110px" },
        { field: "Discontinued", width: "110px", editor: customBoolEditor },
        { command: ["edit", "destroy"], title: "&nbsp;", width: "190px" }],
      editable: "popup",
      dataSource: {
        batch: false,
        transport: {
          read: {
            url: "[Read Function URL]",
            method: "GET"
          },
          update: {
            url: "[Update Function URL]",
            method: "POST"
          },
          destroy: {
            url: "[Destroy Function URL]",
            method: "POST"
          },
          create: {
            url: "[Create Function URL]",
            method: "POST"
          },
          parameterMap: function(options, operation) {
            if (operation !== "read" && options) {
              return kendo.stringify(options);
            }
          }
        },
        schema: {
          model: {
            id: "RowKey",
            fields: {
              RowKey: { editable: false, nullable: true },
              ProductName: { validation: { required: true } },
              UnitPrice: { type: "number", validation: { required: true, min: 1} },
              Discontinued: { type: "boolean" },
              UnitsInStock: { type: "number", validation: { min: 0, required: true } }
            }
          }
        }
      }
    });
  });
</script>
```

That's it! The Kendo Grid should now be able to cosume and edit the data from the Azure Functions application.

## See Also

* [Kendo Grid with CosmosDB]({% slug azure-cosmosdb %})