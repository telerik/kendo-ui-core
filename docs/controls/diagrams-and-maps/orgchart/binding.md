---
title: Data Binding
page_title: Kendo UI for jQuery OrgChart Documentation | OrgChart Data Binding
description: "Get started with the Kendo UI for jQuery OrgChart and bind the widget to local or remote data."
slug: databinding_kendoui_orgchart_widget
position: 2
---

# Data Binding

The OrgChart provides options for binding it to [local arrays](#binding-to-local-data) and [remote data](#binding-to-remote-data).

## Binding to Local Data

The following example demonstrates how to bind an OrgChart to a local data array.

```dojo
    <div id="orgchart"></div>

    <script>
      var data = [
        { Id: 1, Name: "Gevin Bell", Title: "CEO", ParentId: null, Expanded: true},
        { Id: 2, Name: "Clevey Thrustfield", Title: "COO", ParentId: 1, Expanded: true },
        { Id: 3, Name: "Carol Baker", Title: "CFO", ParentId: 1 },
        { Id: 4, Name: "Kendra Howell", Title: "CMO", ParentId: 2},
        { Id: 5, Name: "Sean Rusell", Title: "Financial Manager", ParentId: 3},
        { Id: 6, Name: "Steven North", Title: "Senior Manager", ParentId: 3 },
        { Id: 7, Name: "Michelle Hudson", Title: "Operations Manager", ParentId: 2},
        { Id: 8, Name: "Andrew Berry", Title: "Accountant", ParentId: 5 }            
      ];

      var orgChartDataSource = new kendo.data.OrgChartDataSource({
        data: data,
        schema: {
          model: {            
            Id: "id",
            parentId: "parentId",
            fields: {
              id: { field: "Id", type: "number", nullable: false },
              parentId: { field: "ParentId", nullable: true},
              title: { field: "Title",  nullable: true },
              name: { field: "Name" },
              expanded: { field: "Expanded" }
            }
          }
        }
      });

      $("#orgchart").kendoOrgChart({            
        dataSource: orgChartDataSource
      });
    </script>
```

## Binding to Remote Data

You can also bind the OrgChart to remote data. Remote data binding enables the retrieval of data from the server. For more information, refer to the article on [using the Kendo UI DataSource]({% slug basicusage_kendoui_datasourcecomponent %}).

The Kendo UI OrgChart supports lazy loading. Whether all nodes will be loaded on the initial request or the nodes will be loaded on demand depends on the respective read endpoint. 
If the endpoint returns the items per node, additional request will be sent to the server for loading the child nodes when the parent node gets expanded. 

The following example demonstrates how to enable remote binding for the OrgChart by setting the DataSource `transport` configuration.

```dojo

     <div id="orgchart"></div>

    <script>
        var crudServiceBaseUrl = "http://localhost/kendo-ui-service";
        $("#orgchart").kendoOrgChart({
            editable: false,
            dataSource: {
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/EmployeesOrgChart",
                        dataType: "json"
                    }
                },
                schema: {
                    model: {
                        id: "Id",
                        parentId: "ParentId",
                        expanded: true,
                        fields: {
                            Id: { type: "number", editable: false, nullable: false },
                            ParentId: { field: "ParentId", nullable: true },
                            title: { field: "Position", nullable: true },
                            hasChildren: { field: "HasChildren", nullable: true },
                            avatar: { field: "Avatar", nullable: true },
                            name: { field: "FullName" }
                        }
                    }
                }
            }
        });
    </script>
```

## See Also

* [Basic Usage of the OrgChart (Demo)](https://demos.telerik.com/kendo-ui/orgchart/index)
* [Remote Data Binding in the OrgChart (Demo)](https://demos.telerik.com/kendo-ui/orgchart/remote-data-binding)
* [Load On Demand in the OrgChart (Demo)](https://demos.telerik.com/kendo-ui/orgchart/load-on-demand)
* [OrgChart JavaScript API Reference](/api/javascript/ui/orgchart)
