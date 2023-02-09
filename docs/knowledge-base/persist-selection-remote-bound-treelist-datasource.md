---
title: Persist Selection Upon Retrieving New Data with Remotely Bound TreeList 
page_title: Persist Selected Rows - Kendo UI TreeList for jQuery
description: "Learn how to persist the selected rows of the remotely bound Kendo UI TreeList for jQuery upon retrieving new data."
slug: howto_persist_selected_rows_remote_bound_treelist
tags: persist, selected, rows, treelist, remote, bind
component: treelist
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I persist the selected rows of Kendo UI TreeList for jQuery bound to a remote data source after new data is retrieved upon expanding rows?

## Solution

Store the ids of the selected items whenever the user selects a row and then within the [`dataBound`](/api/javascript/ui/treelist/events/databound) event handler restore the selected rows.


```dojo
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

          $("#treelist").kendoTreeList({
            dataSource: dataSource,
            columns: [
              { selectable: true, width: "65px" },
              { field: "FirstName", expandable: true, title: "First Name", width: 250 },
              { field: "LastName", title: "Last Name" },
              { field: "Position" },
              { field: "Extension", title: "Ext", format: "{0:#}" }
            ],
            dataBound: function () {
              var that = this;
              if (that._selectedIds) {
                var selector = "";
                that._selectedIds.forEach(function (x, i) {
                  if (i > 0) {
                    selector += ", "
                  }
                  selector += '[data-uid="' + that.dataSource.get(x).uid + '"]'
                })
                that.select($(selector))
              }
            }
          }).on('click', 'input', function () {
            var that = $('#treelist').data('kendoTreeList');
            that._selectedIds = [];

            that.select().each(function () {
              that._selectedIds.push(that.dataItem($(this)).EmployeeId)
            })
          });
        });
      </script>
```

## See Also

* [JavaScript API Reference of the TreeList](/api/javascript/ui/treelist)
