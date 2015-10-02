---
title: Sort child nodes
page_title: Sort child nodes
description: Sort child nodes
---

# Sort child nodes

The example below demonstrates how to programmatically change the order of all TreeView nodes.

#### Example

```html
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
