---
title: Group Filter Checkboxes in Grid by Another Field
description: An example on how to group the checkboxes in the filter menu by another field in the Kendo UI Grid.
type: how-to
page_title: Group the Checkboxes in the Filter Menu by Different Field | Kendo UI Grid for jQuery
slug: grid-group-filter-checkboxes
tags: kendoui, kendo, grid, filtering, checkbox filter
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

How to group the checkboxes in the filter menu by a specific field?

## Solution

Although sorting the dataSource of the checkboxes is possible, applying group expression to it will break the built-in functionality of the Grid. However, you can sort the dataSource of the checkboxes by the field that you want to group by and manually insert group separators. In the following example, the entire logic for grouping the checkboxes is within the [`filterMenuOpen`](/api/javascript/ui/grid/events/filtermenuopen) event of the Grid.

```dojo
<style>
  .myGroupClass{
    background: #3bb;
    color: #fff;
    padding: 0 3px;
    line-height: 20px;
    font-size: 12px;
    border-radius: 5px;
  }
  </style>
    <div id="client"></div>
      <script>
        $(document).ready(function() {
          var telerikWebServiceBase = "https://demos.telerik.com/kendo-ui/service/";
          $("#client").kendoGrid({
            dataSource: {
              transport: {
                read:  {
                  url: telerikWebServiceBase + "/Products",
                  dataType: "jsonp"
                },
                update: {
                  url: telerikWebServiceBase + "/Products/Update",
                  dataType: "jsonp"
                },
                destroy: {
                  url: telerikWebServiceBase + "/Products/Destroy",
                  dataType: "jsonp"
                },
                create: {
                  url: telerikWebServiceBase + "/Products/Create",
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
            },
            filterMenuOpen: function(e) {
              var fieldToSortBy = "Discontinued";
              if (e.field !== fieldToSortBy) {
                var filterMultiCheck = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck")
                filterMultiCheck.container.empty();

                filterMultiCheck.checkSource.sort([{field: fieldToSortBy, dir: "asc"},{field: e.field, dir: "asc"}]);
                filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
                filterMultiCheck.createCheckBoxes();

                var listItems = e.container.find("ul").children();
                var sortedItems = filterMultiCheck.checkSource.view().toJSON();
                var previousGroupValue = "";
                for(var i = 0; i < sortedItems.length; i++){
                   if(sortedItems[i][fieldToSortBy] !== previousGroupValue){
                     previousGroupValue = sortedItems[i][fieldToSortBy];
                     debugger;
                     $(listItems[i+1]).prepend("<li class='myGroupClass'>" + fieldToSortBy + ": " + previousGroupValue + "</li>");
                   }
                }
              }
            },
            filterable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              { field: "ProductName", filterable: { multi: true } },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120, filterable: { multi: true } },
              { field: "UnitsInStock", title: "Units In Stock", width: 120, filterable: { multi: true } },
              { field: "Discontinued", width: 120, filterable: { multi: true, dataSource: [{ Discontinued: true }, { Discontinued: false }]} },
              { command: "destroy", title: "&nbsp;", width: 150}],
            editable: true
          });
        });
      </script>
```
