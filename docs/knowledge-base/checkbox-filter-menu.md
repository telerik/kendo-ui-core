---
title: Create Checkbox Filter Menu
page_title: Create Checkbox Filter Menu | Kendo UI Grid for jQuery
description: "An example on how to create a checkbox filter menu functionality in the widget."
previous_url: /controls/data-management/grid/how-to/checkbox-filter-menu, /web/grid/how-to/checkbox-filter-menu, /controls/data-management/grid/how-to/filtering/checkbox-filter-menu
slug: howto_create_checkbox_filter_menu_grid
tags: grid, create, checkbox, filter, menu
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>

</table>


## Description

How can I create a checkbox filter menu functionality in the Kendo UI Grid?

## Solution

The following example demonstrates how to create a menu functionality based on a checkbox filter in a Grid.

> The functionality is available out of the box using the [columns.filterable.multi](/api/javascript/ui/grid/configuration/columns.filterable.multi) property.

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
        var checkboxesDataSource = new kendo.data.DataSource({
          data: uniqueForField(dataSource.data(), field)
        });


        var helpTextElement = e.container.children(":first").children(":first");
        helpTextElement.nextUntil(":has(.k-button)").remove();
        var element = $("<div class='checkbox-container'></div>").insertAfter(helpTextElement).kendoListView({
          dataSource: checkboxesDataSource,
          template: "<div><input type='checkbox' value='#:" + field + "#'/>#:" + field + "#</div>"
        });
        e.container.find("[type='submit']").click(function (e) {
          e.preventDefault();
          e.stopPropagation();
          var filter = dataSource.filter() || { logic: "and", filters: [] };
          var fieldFilters = $.map(element.find(":checkbox:checked"), function (input) {            
            return {
              field: field,
              operator: "eq",
              value: input.value
            };
          });
          if (fieldFilters.length) {
            removeFiltersForField(filter, field);
            filter.filters.push({
              logic: "or",
              filters: fieldFilters
            });
            dataSource.filter(filter);
          }
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

      function uniqueForField(data, field) {
        var map = {};
        var result = [];
        var item;
        for (var i = 0; i < data.length; i++) {
          item = data[i];
          if (!map[item[field]]) {
            result.push(item.toJSON());
            map[item[field]] = true;
          }
        }
        return result;
      }
    </script>
    <style type="text/css">
      .checkbox-container
      {
        max-height: 200px;
        overflow:auto;
      }
    </style>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
