---
title: Show hidden columns when editing
description: Example on how to show hidden columns when editing
type: how-to
page_title: Show hidden columns when editing | Kendo UI Grid
slug: grid-show-hidden-on-edit
tags: grid, edit, show, hidden, on, editor
res_type: kb
component: grid
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.1026</td>
 </tr>
</table>

## Description

I have a grid in inline edit mode with hidden columns and the user should be able to edit them.

## Solution

Simply toggle the visibility of the column using the built-in methods of the Kendo Grid. Show the column using [showColumn](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-showColumn) method within the [beforeEdit](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-beforeEdit) event handler and hide it using [hideColumn](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-hideColumn) when [save](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-save) event is fired.
    

```html

    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
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
            save:function(){
              this.hideColumn(2);
            },
            cancel:function(){
              this.hideColumn(2);
            },
            beforeEdit:function(){
              this.showColumn(2);
            },
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
              { field: "UnitsInStock", title:"Units In Stock", width: "120px", hidden:true },
              { field: "Discontinued", width: "120px", editor: customBoolEditor },
              { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "inline"
          });
        });

        function customBoolEditor(container, options) {
          var guid = kendo.guid();
          $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
          $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
        }
      </script>
    </div>
```