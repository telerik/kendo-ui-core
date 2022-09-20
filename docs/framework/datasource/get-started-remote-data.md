---
title: Getting Started with Remote Services
page_title: jQuery DataSource Documentation | Getting Started with the Remote Data Binding
description: "Get started with the jQuery DataSource component by Kendo UI and learn how to bind and configure remote data in your JavaScript widgets."
slug: getting_started_kendoui_remote_data_binding
position: 3
---

# Getting Started with the Remote DataSource Binding

This guide demonstrates how to configure the Kendo UI for jQuery DataSource component with remote data and display the results of the retrieved data on the page by adding HTML elements.

For examples where the DataSource is bound to Kendo UI widgets, refer to the [Kendo UI for jQuery demos library](https://demos.telerik.com/kendo-ui/).

After the completion of this guide, you will be able to sort, filter, and log the data items as demonstrated in the following example:

```dojo
	<div id="container"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        },
        schema: {
          model: {
            fields: {
              OrderID: { type: "number" },
              Freight: { type: "number" },
              ShipName: { type: "string" },
              OrderDate: { type: "date" },
              ShipCity: { type: "string" }
            }
          }
        },
        sort: { field: "Freight", dir: "asc" },
        filter: { field: "ShipName", operator: "contains", value: "mar" }
      });

      dataSource.fetch(function(){
        var currentView = dataSource.view();  
        currentView.forEach(function(el){
          $('#container').append(`<p><b>OrderID: </b>${el.OrderID}<b> - ShipName: </b>${el.ShipName} --> <b>Freight: ${el.Freight}</b></p> `)
        });
      });
    </script>
```

## 1. Bind the DataSource to Remote Data

When you bind the DataSource to remote data, the component requires information about the URLs of the web service, the request type, and the response data type. A `transport` configuration must identify the protocols, the URLs of the endpoints, and the serialization formats for any or all CRUD (Create, Read, Update, Destroy) data operations.

The example below demonstrates how to use the [`transport.read`](/api/javascript/data/datasource/configuration/transport.read) option to retrieve the data from a remote endpoint.


```
    var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        }
      });
```

## 2. Configure the Schema Model

Configuring the schema is optional. When the response is more complex than a plain array of objects, you have to configure a [`schema`](/api/javascript/data/datasource/configuration/schema).

```
    var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        },
        schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                Freight: { type: "number" },
                ShipName: { type: "string" },
                OrderDate: { type: "date" }
              }
            }
        },
    });
```

## 3. Fetch the Remote Data

To load the data provided by the `Orders` endpoint, call the `.read()` or `fetch()` method.

```
	dataSource.fetch(function(){
        ....
    });
```

## 4. Get the Returned Data Items

Now, you will access the returned data items by using the [`view`](/api/javascript/data/datasource/methods/view) method of the DataSource. You can also retrieve them through [`data()`](/api/javascript/data/datasource/methods/data).

Note that when the DataSource is bound to a Kendo UI widget or chart, the explicit invocation may not be necessary. By default, the widgets automatically bind to an associated DataSource. To override this built-in behavior, use the `autoBind` configuration.

```
	dataSource.fetch(function(){
        var currentView = dataSource.view();
    });
```

Once the basic initialization is completed, you can start adding additional configurations to the DataSource.

## 5. Add Sorting 

You will now sort the items in the DataSource by using the [`sort`](/api/javascript/data/datasource/configuration/sort) configuration option.

The following example demonstrates how to enable the client-side sorting of the DataSource. To sort the data on the server, enable the [`serverSorting`](/api/javascript/data/datasource/configuration/serversorting) option.

```
	var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        },
        schema: {
          model: {
            fields: {
              OrderID: { type: "number" },
              Freight: { type: "number" },
              ShipName: { type: "string" },
              OrderDate: { type: "date" }
            }
          }
        },
        sort: { field: "Freight", dir: "asc" }
    });
```

## 6. Add Filtering 

You can filter the items in the DataSource by using the [`filter`](/api/javascript/data/datasource/configuration/filter) configuration option. 

The example below demonstrates how to enable the client-side filtering of the DataSource. To sort the data on the server, enable the [`serverFiltering`](/api/javascript/data/datasource/configuration/serverfiltering) option.

```
	var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        },
        schema: {
          model: {
            fields: {
              OrderID: { type: "number" },
              Freight: { type: "number" },
              ShipName: { type: "string" },
              OrderDate: { type: "date" }
            }
          }
        },
        sort: { field: "Freight", dir: "asc" },
        filter: { field: "ShipName", operator: "contains", value: "mar" }
    });
```


## Next Steps 

* [Setting the Local CRUD Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %})
* [DataSource Operations]({% slug datasourceoperations_kendoui_datasourcecomponent %}) 
* [Demo Page for the DataSource](https://demos.telerik.com/kendo-ui/datasource/index)

## See Also 

* [JavaScript API Reference of the DataSource](/api/javascript/data/datasource)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>