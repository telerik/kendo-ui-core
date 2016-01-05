---
title: Overview
page_title: Overview | Kendo UI Hierarchical Data Source
description: "Learn how to represent hierarchical data using the Kendo UI HierarchicalDataSource component, an extension of Kendo UI DataSource."
slug: overview_hierarchical_datasourcecomponent
position: 1
---

# HierarchicalDataSource Overview

The [Kendo UI HierarchicalDataSource component](/api/javascript/data/hierarchicaldatasource) extends the [DataSource component](/api/javascript/data/datasource), allowing the representation of hierarchical data. This article assumes that you are familiar with the Kendo UI DataSource, and builds upon that knowledge with specific information about hierarchical data.

## Getting Started

### Bind HierarchicalDataSource to Local Data

#### Create the HierarchicalDataSource and bind to local data

The example below demonstrates how to create a `HierarchicalDataSource` component bound to local data.

###### Example

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

#### Create the HierarchicalDataSource and bind to heterogeneous local data

The example below demonstrates how to create a `HierarchicalDataSource` component and bind it to heterogeneous local data by configuring it to bind the children when the fields holding the children items have different names.

###### Example

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

### Bind HierarchicalDataSource to Remote Service

#### Create the HierarchicalDataSource and bind to homogeneous remote service

The example below demonstrates how to create a `HierarchicalDataSource` component that is bound to a homogeneous remote data service.

###### Example

    var homogeneous = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/Employees",
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

The snippet above targets the HierarchicalDataSource to a single service end-point. The data service is homogeneous, i.e. it always returns objects of the same type. After executing `homogeneous.read()`, the service end-point is hit without an `EmployeeId` parameter,m as demonstrated below.

###### Example

    GET http://demos.telerik.com/kendo-ui/service/Employees

    => [ { "EmployeeId": 2, "Name": "Andrew", "HasEmployees": true } ]

Reading the children of the returned item is achieved by calling the [`load` method](/api/framework/node#load) of the data item.

###### Example

    var ceo = homogeneous.view()[0];

    ceo.load();

This hits the service end-point and supplies the id of the data item.

###### Example

    GET http://demos.telerik.com/kendo-ui/service/Employees?EmployeeId=2

    => [
          { "EmployeeId": 3, "Name": "Bob", "HasEmployees": false },
          { "EmployeeId": 4, "Name": "Charlie", "HasEmployees": false }
       ]

Now, the children can be accessed.

###### Example

    // ceo.children is a HierarchicalDataSource, too
    var middleManagement = ceo.children.view();


#### The hasChildren property

The `hasChildren` Boolean property indicates whether a data item contains children that can be fetched from the server. You can either hard-code it, map it to another property, or compute it with a function, as demonstrated below.

###### Example

    // hard-code that the item will always have children
    hasChildren: true

    // map the hasChildren property to the HasEmployees field, serialized from the server
    hasChildren: "HasChildren"

    // compute whether the given item will have children
    hasChildren: function(item) {
        return item.HasEmployees && item.RelatedDepartment;
    }

#### Bind HierarchicalDataSource to remote data with multiple service end-points

The example below demonstrates how to create the HierarchicalDataSource component and bind it to remote data with multiple service end-points.

###### Example

    // configuration of the products service end-point
    var Products = {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/Products",
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

    // configuration of the categories service end-point
    var Categories = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/Categories",
                dataType: "json"
            }
        },
        schema: {
            data: "categories",
            model: {
                id: "categoryId",

                // categories will always have children
                hasChildren: true,

                // children will be fetched from the Products end-point
                children: Products
            }
        }
    });

The configuration above creates a two-level HierarchicalDataSource&mdash;categories and products&mdash;that fetches data from two different end-points&mdash;`/service/Categories` and `/service/Products` respectively.

## Widget Binding

### Bind Widgets to HierarchicalDataSource

At this time, the only widget that is aware of the dataSource hierarchy is the TreeView. However, since the HierarchicalDataSource component inherits from the DataSource component, you can share the root level of the hierarchy with any DataSource-enabled component.

### Share HierarchicalDataSource between Widgets

The example below demonstartes how to share the HierarchicalDataSource component between a Kendo UI TreeView and a Kendo UI Grid.

###### Example

    <ul id="treeview"></ul>
    <div id="grid"></div>

    <script>
    var Categories = new kendo.data.HierarchicalDataSource({
      type: "odata",
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
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
                url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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


## See Also

Articles on the Kendo UI DataSource and HierarchicalDataSource components:

* [HierarchicalDataSource JavaScript API Reference](/api/javascript/data/hierarchicaldatasource)
* [Custom Binding of HierarchicalDataSource]({% slug custombinding_ofhthehierarchical_datasourcecomponent %})
* [DataSource Overview]({% slug overview_kendoui_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
