---
title: Hierarchical DataSource
page_title: HierarchicalDataSource Overview | Kendo UI Hierarchical Data Source
description: "Learn how to represent hierarchical data when using the Kendo UI for jQuery HierarchicalDataSource component, an extension for the DataSource control, in your JavaScript widgets."
previous_url: /framework/hierarchicaldatasource/overview
slug: overview_hierarchical_datasourcecomponent
position: 8
---

# Hierarchical DataSource Component

The [Kendo UI for jQuery HierarchicalDataSource component](/api/javascript/data/hierarchicaldatasource) extends the [DataSource component](/api/javascript/data/datasource) and allows the representation of hierarchical data.

## Binding to Local Data

The following example demonstrates how to create a `HierarchicalDataSource` component and bind it to local data.

    var categorizedMovies = [ {
          categoryName: "SciFi",
          items: [
            { title: "Star Wars: A New Hope", year: 1977 },
            { title: "Star Wars: The Empire Strikes Back", year: 1980 },
            { title: "Star Wars: Return of the Jedi", year: 1983 }
          ]
      }, {
          categoryName: "Drama",
          items: [
            { title: "The Shawshenk Redemption", year: 1994 },
            { title: "Fight Club", year: 1999 },
            { title: "The Usual Suspects", year: 1995 }
          ]
      }
    ];

    var localDataSource = new kendo.data.HierarchicalDataSource({ data: categorizedMovies });

The following example demonstrates how to create a `HierarchicalDataSource` component and bind it to heterogeneous local data by configuring it to bind the children when the fields which hold the children items have different names.

      var data = [{
        CategoryName: "Category 1",
        Products: [{
          ProductName: "Product 1",
          Suppliers: [{
            SupplierName: "Supplier 1"
          }]
        }]
      }];

      var Suppliers = {
        schema: {
          data: "Suppliers"
        }
      };

      var Products = {
        schema: {
          data: "Products",
          model: {
            children: Suppliers
          }
        }
      };

      var categoriesDataSource = new kendo.data.HierarchicalDataSource({
        data: data,
        schema: {
          model: {
            children: Products
          }
        }
      });

## Binding to Remote Data Services

To bind the `HierarchicalDataSource` component to remote data: 

1. Create a `HierarchicalDataSource` instance and bind it to a homogeneous remote data service. The following example targets the HierarchicalDataSource to a single service endpoint. The data service is homogeneous, that is, it always returns objects of the same type.

        var homogeneous = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Employees",
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    id: "EmployeeId",
                    hasChildren: "HasEmployees"
                }
            }
        });

1. After you execute `homogeneous.read()`, the service endpoint has no `EmployeeId` parameter.

        GET https://demos.telerik.com/kendo-ui/service/Employees

        => [ { "EmployeeId": 2, "Name": "Andrew", "HasEmployees": true } ]

1. Call the [`load` method](/api/framework/node#load) of the data item to read the children of the returned item.

        var ceo = homogeneous.view()[0];

        ceo.load();

1. This approach hits the service endpoint and supplies the `id` of the data item.

        GET https://demos.telerik.com/kendo-ui/service/Employees?EmployeeId=2

        => [
              { "EmployeeId": 3, "Name": "Bob", "HasEmployees": false },
              { "EmployeeId": 4, "Name": "Charlie", "HasEmployees": false }
           ]

    As a result, you can now access the children.

        // ceo.children is a HierarchicalDataSource, too
        var middleManagement = ceo.children.view();


1. The `hasChildren` Boolean property indicates whether a data item contains children that can be fetched from the server. You can either hard-code it, map it to another property, or compute it with a function.

    // Hard-code that the item will always have children.
    hasChildren: true

    // Map the hasChildren property to the HasEmployees field, serialized from the server.
    hasChildren: "HasChildren"

    // Compute whether the given item will have children.
    hasChildren: function(item) {
        return item.HasEmployees && item.RelatedDepartment;
    }

The following example demonstrates how to create the HierarchicalDataSource component and bind it to remote data with multiple service endpoints. The configuration creates a two-level HierarchicalDataSource (categories and products) that fetches data from two different endpoints&mdash;`/service/Categories` and `/service/Products` respectively.

    // Configuration of the products service endpoint.
    var Products = {
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Products",
                    dataType: "json"
                }
            },
            schema: {
                data: "products",
                model: {
                    // products will never have children
                    hasChildren: false
                }
            }
        };

    // Configuration of the categories service endpoint.
    var Categories = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/Categories",
                dataType: "json"
            }
        },
        schema: {
            data: "categories",
            model: {
                id: "categoryId",

                // categories will always have children
                hasChildren: true,

                // children will be fetched from the Products endpoint
                children: Products
            }
        }
    });

## Widget Binding

Currently, the Kendo UI widgets that support the DataSource hierarchy are the TreeView, PanelBar, TreeMap, and DropDownTree. However, since the HierarchicalDataSource component inherits from the DataSource component, any DataSource-enabled component can use the root level of the hierarchy.

The following example demonstrates how to share the HierarchicalDataSource component between a Kendo UI TreeView and a Kendo UI Grid.

    <ul id="treeview"></ul>
    <div id="grid"></div>

    <script>
    var Categories = new kendo.data.HierarchicalDataSource({
      type: "odata",
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
        }
      },
      schema: {
        model: {
          id: "CategoryID",
          hasChildren: "Products",
          children: {
            type: "odata",
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
              }
            },
            schema: {
              model: {
                id: "ProductID",
                hasChildren: false
              }
            }
          }
        }
      }
    });

    $("#treeview").kendoTreeView({
      dataSource: Categories,
      dataTextField: ["CategoryName", "ProductName"]
    });

    $("#grid").kendoGrid({
       dataSource: Categories,
       columns: [
         { field: "CategoryName", title: "Name" },
         { field: "Description" }
       ]
    });
    </script>

## Building Custom HierarchicalDataSources

The HierarchicalDataSource allows you to apply custom ways for data binding when the default configuration is not actionable.

### Customizing the Transport Binding

If you have a way of fetching data that cannot be achieved through the default [`transport` configuration](/api/framework/hierarchicaldatasource#configuration-transport) of the DataSource, you can provide the custom transport&mdash;a [custom `read` function](/api/framework/datasource#configuration-transport.read) that fetches the data and delivers it to the data source. This configuration enables you to query different URLs conditionally or provide generated authentication tokens for each request.

```
    <script>
    var datasource = new kendo.data.HierarchicalDataSource({
      transport: {
        read: function(options) {
          var id = options.data.EmployeeId;

          // [additional processing here]

          $.ajax({
            url: "https://demos.telerik.com/kendo-ui/service/employees",
            dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
            data: { EmployeeId: id },
            success: function(result) {
              // Notify the data source that the request succeeded.
              options.success(result);
            },
            error: function(result) {
              // Notify the data source that the request failed.
              options.error(result);
            }
          });
        }
      },
      schema: {
        model: {
          id: "EmployeeId",
          hasChildren: "HasEmployees"
        }
      }
    });

    datasource.read();
    </script>
```

### Fetching Hierarchy through Single Requests

Because the HierarchicalDataSource loads data on demand, loading all available data can result in multiple requests to the server. To prevent this, make a single AJAX request to get all the data, and then provide it to the dataSource.

```dojo
    <script>
      var datasource = new kendo.data.HierarchicalDataSource({
        transport: {
          read: function(options) {
            // asynchonous operation for getting data (e.g. $.ajax)
            // then pass data in success or error handler
            options.success([
              { id: 1, Name: "Tea", items: [
                { id: 2, Name: "Earl Gray" },
                { id: 3, Name: "Oolong" }
              ] }
            ]);
          }
        },
        schema: {
          model: {
            children: "items"
          }
        }
      });

      datasource.read();

      var rootItems = datasource.data();

      // The result can be observed in the browser`s console (F12)
      console.log(rootItems.length); // logs 1

      rootItems[0].load(); // does not initiate AJAX request

      console.log(rootItems[0].children.data().length); // logs 2

    </script>
```
## See Also

* [HierarchicalDataSource JavaScript API Reference](/api/javascript/data/hierarchicaldatasource)
* [DataSource Overview]({% slug overview_kendoui_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
