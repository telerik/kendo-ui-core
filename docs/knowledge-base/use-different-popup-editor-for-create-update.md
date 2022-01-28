---
title: Use Different Popup Editors for Create and Update Operations
page_title: Use Different Popup Editors | Kendo UI Grid for jQuery
description: "An example on how to use different popup editors for create and update operations in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/use-different-popup-editor-for-create-update
slug: howto_use_different_poup_editors_for_create_update_operations
tags: use, various, popup, editors, grid, create, update, operations
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
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

How can I use different popup editors for create and update operations in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to use different popup editors in a Grid for the Create and Update data operations.

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <div id="grid"></div>
    <script>
      $(document).ready(function(){
        var dataSource = new kendo.data.DataSource({
          pageSize: 5,
          data: products,
          autoSync: true,
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} }
              }
            }
          }
        });

        $("#grid").kendoGrid({
          editable: {
            mode:"popup",
            template: $("#template").html()
          },
          dataSource: dataSource,
          pageable: true,
          edit:function(e){
            $('#categories').kendoDropDownList({
              optionLabel: "Select category...",
              dataTextField: "CategoryName",
              dataValueField: "CategoryID",
              change: function(){
                e.model.Category.CategoryName=this.text();
                e.model.ProductID = e.sender.dataSource.data().length;
              },
              dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                  read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                }
              }
            });
            $("#products").kendoDropDownList({
              autoBind: false,
              cascadeFrom: "categories",
              optionLabel: "Select product...",
              dataTextField: "ProductName",
              dataValueField: "ProductID",
              change: function(){
                e.model.ProductName = this.text();
              },
              dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                  read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                }
              }
            });
          },
          toolbar: ["create"],
          columns: [
            { field:"ProductName",title:"Product Name" },
            { field: "Category", title: "Category", width: "160px", template: "#=Category.CategoryName#" },
            { command: ["edit", "destroy"], title: "&nbsp;", width: "160px" }]

        });
      })
    </script>
    <script type="text/x-kendo-template" id="template">
    #if(data.isNew()) {#
        #var createTemp = kendo.template($("\#createTemplate").html());#
        #=createTemp(data)#
    #} else {#
        #var createTemp = kendo.template($("\#editTemplate").html());#
        #=createTemp(data)#
    #}#
    </script>
    <script type="text/x-kendo-template" id="createTemplate">
    <input id="categories" style="margin-left:10px">
    </script>
    <script type="text/x-kendo-template" id="editTemplate">
    <input id="products" style="margin-left:10px">
    </script>
    <script>

    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
