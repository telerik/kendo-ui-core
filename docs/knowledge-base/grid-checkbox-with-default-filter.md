---
title: Create Custom Checkbox Filter Combined with Default Filter Menu in the Grid
page_title: Add Custom Checkbox Filter on Top of the Default Filter Menu- Kendo UI Grid for jQuery
description: "Learn how to add a checkbox filter menu functionality in the Kendo UI for jQuery Data Grid component."
slug: create_custom_checkbox_filter_menu__over_default_filter_grid
tags: grid, create, checkbox, filter, menu, custom, kendoui, jquery
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>


## Description

How can I add a custom checkbox filter functionality in combination with the default filter menu in the Kendo UI Data Grid for jQuery?

## Solution

To achieve the desired scenario, apply custom logic in the [`filterMenuInit`](/api/javascript/ui/grid/events/filtermenuinit) event handler.

The following example demonstrates how to add the `Is Null` or `Empty` and `Is not empty` checkbox filter options on top of the default filter functionality of the Grid.


```dojo
    <div id="grid"></div>
    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
              transport: {
                read: {
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
                parameterMap: function (options, operation) {
                  if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
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
                    ProductName: { validation: { required: true} },
                    UnitPrice: { type: "number", validation: { required: true, min: 1} },
                    Discontinued: { type: "boolean" },
                    UnitsInStock: { type: "number", validation: { min: 0, required: true} }
                  }
                }
              }
            });

        $("#grid").kendoGrid({
          dataSource: dataSource,
          pageable: true,
          height: 550,
          toolbar: ["create"],
          columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
            { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" },
            { command: ["edit", "destroy"], title: "&nbsp;", width: "200px"}],
          editable: "inline",
          filterable: true,
          filterMenuInit: onFilterMenuInit
        });
      });

      function onFilterMenuInit(e) {
        if (e.field == "ProductName") {
          initCheckboxFilter.call(this, e);
        }
      }

      function initCheckboxFilter(e) {
        var popup = e.container.data("kendoPopup");
        var dataSource = this.dataSource;
        var field = e.field;
        var data = [{value: "Is Null or Empty"}, {value: "Is not empty"}]
        // Add the checkboxes container.
        var helpTextElement = e.container.children(":first").children(":first");
        helpTextElement.nextUntil(":has(.k-button)").remove();
        var element = $("<div class='checkbox-container'><ul class='fieldlist'><li><input type='checkbox' id='eq1' /></li><li><input type='checkbox' id='eq2' /></li></ul></div>").insertAfter(helpTextElement);
        // Initialize the Kendo UI Checkboxes.
        $('#eq1').kendoCheckBox({
          label: "Is Null or Empty"
        });

        $('#eq2').kendoCheckBox({
          label: "Is not empty",
        });
        // Prevent the internal filtering.
        e.container.find("[type='submit']").click(function (e) {
          e.preventDefault();
          e.stopPropagation();
          var filter = dataSource.filter() || { logic: "and", filters: [] };
          // Create a custom filter expression.
          var fieldFilters = $.map(element.find(":checkbox:checked"), function (input) {
            if($(input).next().text() == "Is Null or Empty") {
              return {
                logic: "or",
                filters: [
                  {
                    field: field,
                    operator: "isnull"
                  },
                  {
                    field: field,
                    operator: "isempty"
                  }
                ]
              }
            };

            if($(input).next().text() == "Is not empty") {
              return {
                field: field,
                operator: "isnotempty",
              };
            }

          });

          if (fieldFilters.length) {
            removeFiltersForField(filter, field);
            filter.filters.push({
              logic: "and",
              filters: fieldFilters
            });
            // Filter the dataSource.
            dataSource.filter(filter);
          }
          // Close the filter menu.
          popup.close();
        });
      }

      function removeFiltersForField(expression, field) {
        if (expression.filters) {
          expression.filters = $.grep(expression.filters, function (filter) {
            removeFiltersForField(filter, field);
            if (filter.filters) {
              return filter.filters.length;
            } else {
              return filter.field != field;
            }
          });
        }
      }
    </script>

    <style type="text/css">
      ul.fieldlist {
        list-style-type: none;
        padding-left: 2px;
      }
    </style>
```

## See Also

* [JavaScript API Reference of the jQuery Data Grid](/api/javascript/ui/grid)
