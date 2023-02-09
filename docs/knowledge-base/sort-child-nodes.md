---
title: Sort the Child Nodes of the TreeView
page_title: Sort the Child Nodes of the TreeView
description: "Learn how to programmatically change the order of all Kendo UI for jQuery TreeView nodes."
slug: howto_sortchildnodes_treeview
previous_url: /controls/navigation/treeview/how-to/binding/sort-child-nodes
tags: telerik, kendo, jquery, treeview, sort, child, nodes
component: treeview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeView for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I sort the child nodes of the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to programmatically change the order of all TreeView nodes.

```dojo
      <div>
        <div style="float:left;">
          <button id="expand">Expand trees</button>
          <div id="treeview-desc"></div>

        </div>
        <div style="float:left;">
          <button id="sort">Change sort order</button>
          <div id="treeview-asc"></div>
        </div>
      </div>
      <script>
        function setSort(items){
          for(var i=0; i < items.length; i++){
            if(items[i].hasChildren){
              items[i].children.sort({field: "FullName", dir: "desc"});
              setSort(items[i].children.view());
            }
          }
        }

        var serviceRoot = "//demos.telerik.com/kendo-ui/service";
        asc = new kendo.data.HierarchicalDataSource({
          sort: { field: "FullName", dir: "asc" },
          transport: {
            read: {
              url: serviceRoot + "/Employees",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeId",
              hasChildren: "HasEmployees"
            }
          }
        }),
          desc = new kendo.data.HierarchicalDataSource({
          sort: { field: "FullName", dir: "desc" },
          transport: {
            read: {
              url: serviceRoot + "/Employees",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeId",
              hasChildren: "HasEmployees"
            }
          }
        });

        var treeAsc = $("#treeview-asc").kendoTreeView({
          loadOnDemand:false,
          dataSource: asc,
          dataTextField: "FullName"
        }).getKendoTreeView();

        var treeDesc = $("#treeview-desc").kendoTreeView({
          loadOnDemand:false,
          dataSource: desc,
          dataTextField: "FullName"
        }).getKendoTreeView();

        $("#expand").click(function() {
          treeAsc.expand("li");
          treeDesc.expand("li");
        });

        $("#sort").click(function() {
          setSort(treeAsc.dataSource.view());
        });

      </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
