---
title: Use Editors Based on dataItem Property
page_title: Use dataItem Property Editors | Kendo UI Grid for jQuery
description: "An example on how to use different editors based on the dataItem property of the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/use-different-editors-based-on-data-item-property
slug: howto_use_editors_basedon_dataitem_property_grid
tags: use, editors, basedon, dataitem, property, grid
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

How can I use different editors based on the `dataItem` property of the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to use different editors based on a property from the current data item record in the Grid.

```dojo
    <div id="example" class="k-content">
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
            dataSource: dataSource,
             pageable: true,
             dataBound: function (){
               var grid = this;
               var trs = this.tbody.find('tr').each(function(){
                 var item = grid.dataItem($(this));
                 if( item.UnitPrice % 5 == 0) {
                   $(this).find('.k-grid-edit,.k-grid-delete').hide();
                 }

               });               
             },
             height: 430,
             toolbar: ["create"],
             columns: [
               "ProductName",
               { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "100px" },
               { field: "UnitsInStock", title:"Units In Stock", width: "100px" },
               { field: "Discontinued", width: "100px" },
               { command: ["edit", "destroy"], title: "", width: "172px" }],
             editable: "inline"
            });
        });
      </script>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
