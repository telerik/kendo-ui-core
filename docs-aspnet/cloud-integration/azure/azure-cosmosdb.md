---
title: Azure CosmosDB
page_title: Azure CosmosDB
description: "Learn how to create an Azure CosmosDB table, and perform CRUD operations with the Telerik UI for {{ site.framework }} Grid."
slug: azure_cosmosdb_aspnetcore
position: 2
---

# Using {{ site.product }} with Azure CosmosDB

Microsoft's **Azure CosmosDB** is a fully managed service, providing a NoSQL database for application development.

This tutorial shows how to add Telerik UI for {{ site.framework }} to an application configured for Azure CosmosDB and use the Grid to perform remote CRUD (Create, Read, Update, Destroy) data operations. Refer to [this Microsoft tutorial](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/sql-api-dotnet-application) for a step-by-step guide on creating an Azure CosmosDB account, a CosmosDB table, and an application consuming it.

## Prerequisites

Before you start using the Grid with CosmosDB, you will need:

* [An Azure account]({% slug azure_getting_started_aspnetcore %}).
* [An Azure CosmosDB account](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/sql-api-dotnet-application#create-an-azure-cosmos-account).
* [A web application configured to use Azure CosmosDB](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/sql-api-dotnet-application#set-up-the-mvc-application).

## Configuring the Application

To set-up an application that uses Azure CosmosDB, follow [Microsoft's step-by-step tutorial](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/sql-api-dotnet-application). Alternatively, you can directly clone the source code from the tutorial available on the [Azure Samples repository on GitHub](https://github.com/Azure-Samples/cosmos-dotnet-core-todo-app).

Once you have an application prepared to use Azure CosmosDB and a Cosmos DB table as demonstrated in [the tutorial](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/sql-api-dotnet-application), add the URI and account key to the `appsettings.json` of the application.
```
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*",
  "CosmosDb": {
    "Account": "<Endpoint URI of your Azure Cosmos account>",
    "Key": "<PRIMARY KEY of your Azure Cosmos account>",
    "DatabaseName": "Tasks",
    "ContainerName": "Item"
  }
}
``` 

Refer to [this section of the MSDN documentation](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/sql-api-dotnet-application#create-an-azure-cosmos-account) for more information on where to find the URI and account key.

>For clarity, this tutorial demonstrates how to store the endpoint URI and account Key in the `appsettings.json`. For production applications hosted on Azure, it is strongly recommended to store sensitive data in [Azure Key Vault](https://docs.microsoft.com/en-us/aspnet/core/security/key-vault-configuration?view=aspnetcore-6.0#secret-storage-in-the-production-environment-with-azure-key-vault).

## Adding {{site.product}} to the Application

{% if site.core %}
Follow the [guidelines for adding {{site.product}} to an existing application]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}):
{% else %}
Follow the [guidelines for adding {{site.product}} to an existing application]({% slug manualsetup_aspnetmvc %}):
{% endif %}

1. Set up the Private NuGet feed
1. Add reference to Kendo.Mvc.dll
1. Add the client-side resources

## Adding a Grid and Configuring the CRUD Endpoints

1. Add the Telerik UI for {{ site.framework }} Grid to the View.

    ```Razor
        @{
            Layout = "~/Views/Shared/_Layout.cshtml";
        }
        @Html.AntiForgeryToken()

        @(Html.Kendo().Grid<todo.Models.Item>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.Name).Width(100);
                columns.Bound(p => p.Description).Width(100);
                columns.Bound(p => p.Completed).Width(100);
                columns.Command(command => { command.Edit(); command.Destroy(); }).Width(172);
            })
            .ToolBar(toolbar => toolbar.Create())
            .Editable(editable => editable.Mode(GridEditMode.InLine))
            .Pageable()
            .Sortable()
            .Scrollable()
            .HtmlAttributes(new { style = "height:430px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Events(events => events.Error("error_handler"))
                .Model(model => {
                    model.Id(p => p.Id);
                    model.Field(f=>f.Id).Editable(false);
                })
                .Create(update => update.Action("Create", "Item").Data("forgeryToken"))
                .Read(read => read.Action("Read", "Item").Data("forgeryToken"))
                .Update(update => update.Action("Update", "Item").Data("forgeryToken"))
                .Destroy(update => update.Action("Destroy", "Item").Data("forgeryToken"))
            ) 
        )

        <script type="text/javascript">
            function error_handler(e) {
                if (e.errors) {
                    var message = "Errors:\n";
                    $.each(e.errors, function (key, value) {
                        if ('errors' in value) {
                            $.each(value.errors, function() {
                                message += this + "\n";
                            });
                        }
                    });
                    alert(message);
                }
            }

            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

1. Use the already defined service and create the server-side CRUD endpoints to consume it.
    ```Controller
        public class ItemController : Controller
        {
            private readonly ICosmosDbService _cosmosDbService;
            public ItemController(ICosmosDbService cosmosDbService)
            {
                _cosmosDbService = cosmosDbService;
            }

            [ActionName("Index")]
            public ActionResult Index()
            {
                return View();
            }

            public async Task<ActionResult> Read([DataSourceRequest] DataSourceRequest request)
            {
                var data = await _cosmosDbService.GetItemsAsync("SELECT * FROM c");
                return Json(data.ToDataSourceResult(request));
            }

            [AcceptVerbs("Post")]
            [ActionName("Create")]
            [ValidateAntiForgeryToken]
            public async Task<ActionResult> CreateAsync([DataSourceRequest] DataSourceRequest request, Item model)
            {
                if (model != null && ModelState.IsValid)
                {
                    model.Id = Guid.NewGuid().ToString();
                    await _cosmosDbService.AddItemAsync(model);
                }

                return Json(new[] { model }.ToDataSourceResult(request, ModelState));
            }

            [AcceptVerbs("Post")]
            [ActionName("Update")]
            [ValidateAntiForgeryToken]
            public async Task<ActionResult> UpdateAsync([DataSourceRequest] DataSourceRequest request, Item model)
            {
                if (model != null && ModelState.IsValid)
                {
                    await _cosmosDbService.UpdateItemAsync(model.Id, model);
                }

                return Json(new[] { model }.ToDataSourceResult(request, ModelState));
            }

            [AcceptVerbs("Post")]
            [ActionName("Destroy")]
            [ValidateAntiForgeryToken]
            public async Task<ActionResult> DestroyAsync([DataSourceRequest] DataSourceRequest request, Item model)
            {
                if (model != null)
                {
                    await _cosmosDbService.DeleteItemAsync(model.Id);
                }

                return Json(new[] { model }.ToDataSourceResult(request, ModelState));
            }
        }
    ```
    ```Service
        public class CosmosDbService : ICosmosDbService
        {
            private Container _container;

            public CosmosDbService(
                CosmosClient dbClient,
                string databaseName,
                string containerName)
            {
                this._container = dbClient.GetContainer(databaseName, containerName);
            }
            
            public async Task AddItemAsync(Item item)
            {
                await this._container.CreateItemAsync<Item>(item, new PartitionKey(item.Id));
            }

            public async Task DeleteItemAsync(string id)
            {
                await this._container.DeleteItemAsync<Item>(id, new PartitionKey(id));
            }

            public async Task<Item> GetItemAsync(string id)
            {
                try
                {
                    ItemResponse<Item> response = await this._container.ReadItemAsync<Item>(id, new PartitionKey(id));
                    return response.Resource;
                }
                catch(CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
                { 
                    return null;
                }

            }

            public async Task<IEnumerable<Item>> GetItemsAsync(string queryString)
            {
                var query = this._container.GetItemQueryIterator<Item>(new QueryDefinition(queryString));
                List<Item> results = new List<Item>();
                while (query.HasMoreResults)
                {
                    var response = await query.ReadNextAsync();
                    
                    results.AddRange(response.ToList());
                }

                return results;
            }

            public async Task UpdateItemAsync(string id, Item item)
            {
                await this._container.UpsertItemAsync<Item>(item, new PartitionKey(id));
            }
        }
    ```

## See Also

* [Uploading to images to Azure Blob Storage]({% slug azure_blob_storage_aspnetcore %})
