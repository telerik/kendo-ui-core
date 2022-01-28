---
title: Cancel Changes Per Row by Using the Incell Editing Mode of the Grid
page_title: Cancel Changes for Specific Row in Incell Editing Mode | Kendo UI Grid for jQuery
description: An example on how to cancel the changes for a specific Kendo UI Grid row when the Grid is in the incell editing mode.
type: how-to
slug: cancel-changes-for-specific-row-with-incell-editing
tags: grid, editing
ticketid: 1111657
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>58.0.3029.110</td>
 </tr>
  <tr>
  <td>Made With Version</td>
  <td>2020.3.1021</td>
 </tr>
</table>

## Description

I use a Grid with a remote Datasource with the `batch:true` setup. The Grid is in the incell editing mode. The toolbar of the Grid has the `create`, `save,` and `cancel` commands. The problem is that the `cancel` command discards all made changes.

In other words, I need my Grid to have both of the following commands:
1. The `cancel` command of the row which discards only the changes of the corresponding row, and
1. The `cancel` command of the toolbar which discards all changes that are made.

How can I provide a `cancel` command per row and at the same time keep the above configurations?

## Suggested Workarounds

The Kendo UI Grid does not provide a built-in solution for achieving this behavior. However, you can still work around this issue by applying custom logic.

1. Add a custom button.
1. On the button click, get the item by `Uid`.
1. Call `cancelChanges` only for that item.

> **Important**
>
> This approach will prevent the item from being updated in the database. However, the old values will be visually reverted after `cancelChanges`.

For more details, refer to the following articles:

* [https://docs.telerik.com/kendo-ui/api/javascript/data/datasource\/methods/getbyuid](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/getbyuid)
* [https://docs.telerik.com/kendo-ui/api/javascript/data/datasource\/methods/cancelchanges](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/cancelchanges)
* [https://docs.telerik.com/kendo-ui/api/javascript/ui/grid\/configuration/columns.command](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.command)

To resolve the resulting scroll-related issue which occurs after the refresh, [restore the scroll position by using a custom approach](https://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance#restore-scroll-positions).

````dojo
<div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var scrollOffset = {
            left: 0,
            top: 0
          };
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                  },
                  update: {
                    url: crudServiceBaseUrl + "/Products/Update",
                    dataType: "jsonp"
                  },
                  destroy: {
                    url: crudServiceBaseUrl + "/Products/Destroy",
                    dataType: "jsonp"
                  },
                  create: {
                    url: crudServiceBaseUrl + "/Products/Create",
                    dataType: "jsonp"
                  },
                  parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                      return {models: kendo.stringify(options.models)};
                    }
                  }
                },
                batch: true,
                pageSize: 20,
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      UnitPrice: { type: "number", validation: { required: true, min: 1} },
                      Discontinued: { type: "boolean" },
                      UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                  }
                }
              });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            pageable: true,
            dataBound:function(e){
              var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
              container.scrollLeft(scrollOffset.left);
              container.scrollTop(scrollOffset.top); // use only if virtual scrolling is disabled
            },
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", width: 120 },
              { command: [{
                name: "Cancel",
                click: function(e) {
                  // prevent page scroll position change
                  e.preventDefault();
                  //console.log(e.toElement.offsetParent.parentElement)
                  var row = e.target.closest('tr')
                  var uid = $(row).data(uid)
                  dataSource = $("#grid").data("kendoGrid").dataSource
                  var item = dataSource.getByUid(uid.uid);
                  dataSource.cancelChanges(item);
                  var container = this.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
                  scrollOffset.left = container.scrollLeft();
                  scrollOffset.top = container.scrollTop();
                  this.refresh()
                }
              }]
              }],
            editable: true
          });
        });
      </script>
    </div>
````
