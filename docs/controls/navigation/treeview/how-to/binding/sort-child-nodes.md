---
title: Sort Child Nodes
page_title: Sort Child Nodes | Kendo UI TreeView
description: "Learn how to programmatically change the order of all Kendo UI TreeView nodes."
slug: howto_sortchildnodes_treeview
---

# Sort Child Nodes

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
