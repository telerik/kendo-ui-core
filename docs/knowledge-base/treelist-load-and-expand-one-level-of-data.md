---
title: Load and expand only the first level data in the TreeList
description: An example on how to load the Kendo UI TreeList expanded initially up to a certain point (level in the hierarchy).
type: how-to
page_title: Partially expand the TreeList | Kendo UI TreeList for jQuery
slug: treelist-load-and-expand-one-level-of-data
ticketid: 1148152
tags: treelist, expand, partial, read, request, node, root, level, initially, load, only
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI TreeList</td>
	</tr>
	<tr>
		<td>Created with Product Version</td>
		<td>2017.3.1026</td>
	</tr>
</table>


## Description

The very first fetch of data from the server needs to show the data expanded down to the searched term (that may have children), so we don't want to expand it. This poses a problem because when expanding the rows, the read just starts firing off and it kills the web page as it tries to load the whole treelist into view.

How do I turn off the transport read from firing when I need to expand the first set of data that was retrieved? But still be able to have the widget set up in a way that I can still retrieve data from the server when the user clicks to expand a row?

## Solution

To load the Kendo UI TreeList expanded initially up to a certain point(level in the hierarchy) the following steps will help you achieve it:

1. Set the Kendo UI TreeList [`autoBind`](/api/javascript/ui/treelist/configuration/autobind) property to `false` initially
1. Make a read request (the custom call which will return the initial data) using the dataSource [`read()`](/api/javascript/data/datasource/methods/read) method
1. Use the Kendo UI TreeListDataSource [`load()`](/api/javascript/data/treelistdatasource/methods/load) method to load the root
1. Use the Kendo UI TreeList [`expand()`](/api/javascript/ui/treelist/methods/expand) method to expand only the items which are in the view() - this will not make a request for non-loaded items

```
    dataSource.read().then(function() {
        var root = dataSource.at(0);
        return dataSource.load(root);
    }).then(function() {
        var root = dataSource.at(0);
        var children = dataSource.childNodes(root);
        treeList.expand(treeList.items());
    });
```

```dojo
    <div id="example">
      <div id="treelist"></div>

      <script>
        $(document).ready(function () {

          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

                    var dataSource = new kendo.data.TreeListDataSource({
                            transport: {
                                read: {
                                    url: crudServiceBaseUrl + "/EmployeeDirectory",
                                    dataType: "jsonp"
                                }
                            },
                            schema: {
                                model: {
                                    id: "EmployeeId",
                                    parentId: "ReportsTo",
                                    fields: {
                                        EmployeeId: { type: "number", nullable: false },
                                        ReportsTo: { field: "ReportsTo", nullable: true }
                                    }
                                }
                            }
                        });

          var treeList = $("#treelist").kendoTreeList({
            autoBind:false,
            dataSource: dataSource,
            toolbar: [ "create" ],
            editable: "popup",
            height: 540,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 250 },
              { field: "LastName", title: "Last Name" },
              { field: "Position" },
              { field: "Phone", title: "Phone" },
              { field: "Extension", title: "Ext", format: "{0:#}" },
              { command: [ "edit", "destroy" ] }
            ]
          }).data("kendoTreeList");

          dataSource.read().then(function() {
            var root = dataSource.at(0);
            return dataSource.load(root);
          }).then(function() {
            var root = dataSource.at(0);
            var children = dataSource.childNodes(root);
           	treeList.expand(treeList.items());
          });
        });
      </script>
    </div>
```
