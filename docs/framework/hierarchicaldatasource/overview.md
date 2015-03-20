---
title: Overview
page_title: HierarchicalDataSource component in Kendo UI framework
description: See how to represent hierarchical data using HierarchicalDataSource component, an extension of Kendo UI DataSource.
---

# Overview

The HierarchicalDataSource component extends the [DataSource component](/api/framework/datasource), allowing
representation of hierarchical data. This help topic assumes that you are familiar with the
Kendo UI DataSource, and builds upon that knowledge with information that is specific to
hierarchical data.

## Getting Started

### Creating a HierarchicalDataSource bound to local data

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

### Creating a HierarchicalDataSource bound to a homogeneous remote data service

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

The above snippet will target the HierarchicalDataSource to a single service end-point.
The data service is homogeneous, i.e. it always returns objects of the same type.
After executing `homogeneous.read()`, the service end-point is hit without a EmployeeId parameter:

    GET http://demos.telerik.com/kendo-ui/service/Employees

    => [ { "EmployeeId": 2, "Name": "Andrew", "HasEmployees": true } ]

Reading the children of the returned item is achieved by calling the [`load` method](/api/framework/node#load) of the data item:

    var ceo = homogeneous.view()[0];

    ceo.load();

This will hit the service end-point and will supply the id of the data item:

    GET http://demos.telerik.com/kendo-ui/service/Employees?EmployeeId=2

    => [
          { "EmployeeId": 3, "Name": "Bob", "HasEmployees": false },
          { "EmployeeId": 4, "Name": "Charlie", "HasEmployees": false }
       ]

Now, the children can be accessed:

    // ceo.children is a HierarchicalDataSource, too
    var middleManagement = ceo.children.view();


### The `hasChildren` property

The `hasChildren` boolean property indicates whether a data item contains children that can be fetched from the server.
You can either hard-code it, map it to another property, or compute it with a function:

    // hard-code that the item will always have children
    hasChildren: true

    // map the hasChildren property to the HasEmployees field, serialized from the server
    hasChildren: "HasChildren"

    // compute whether the given item will have children
    hasChildren: function(item) {
        return item.HasEmployees && item.RelatedDepartment;
    }

### Binding a HierarchicalDataSource to remote data with multiple service end-points

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

The configuration above creates a two-level HierarchicalDataSource (categories and products) that
fetches data from two different end-points (/service/Categories and /service/Products, respectively).

## Binding UI widgets to HierarchicalDataSource

At this time, the only widget that is aware of the datasource hierarchy is the TreeView. However,
since the HierarchicalDataSource inherits the DataSource component, you can share the root level of
the hierarchy with any DataSource-enabled component.

### Sharing a HierarchicalDataSource between a TreeView and a Grid

    var Categories = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/Categories"
            }
        },
        schema: {
            model: {
                hasChildren: "Products",
                id: "CategoryID",
                children: {
                    transport: {
                        read: {
                            url: "http://demos.telerik.com/kendo-ui/service/Products"
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

