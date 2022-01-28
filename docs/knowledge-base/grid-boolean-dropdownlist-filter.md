---
title: Use DropDownList as Boolean Filter in Grid
description: An example on how to use a DropDownList to filter a Boolean column.
type: how-to
page_title: Filter Boolean Grid Column with DropDownList | Kendo UI Grid for jQuery
slug: grid-boolean-dropdownlist-filter
tags: grid, boolean, filter, template, dropdownlist
ticketid: 1403934
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2019.1.220</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

How can I set up a custom filter for a Boolean column in the Grid and have a DropDownList which lists `true`, `false`, `all`?

## Solution

When you initialize a DropDownList widget in the filtering UI, the column will not be filtered correctly because the DropDownList returns string values instead of Boolean ones. To fix this, you need to convert the strings to Boolean values before the generated filter expression is applied to the Grid.

1. Use a filter template to show a DropDownList in the column filter menu.

    ```
         { field: "Discontinued", width: "130px", filterable: { ui: boolFilterTemplate } }
    ```

    ```
          function boolFilterTemplate(input) {
            input.kendoDropDownList({
              dataSource: {
                data: [
                  { text: "True", value: true },
                  { text: "False", value: false }
                ]
              },
              dataTextField: "text",
              dataValueField: "value",
              valuePrimitive: true,
              optionLabel: "All"
            });
          }
    ```

1. Use the [`filterMenuInit`](/api/javascript/ui/grid/events/filtermenuinit) event of the Grid to replace the default filter label with more appropriate text.

    ```
          function onFilterMenuInit(e){
            if (e.field == "Discontinued") {
              // replace default text in filter menu
              e.container.find(".k-filter-help-text").text("Show items with value:");
            }
          }
    ```

1. Use the [`filter`](/api/javascript/ui/grid/events/filter) event of the Grid to replace the string value in the generated filter expression with its Boolean equivalent.

    ```
          function onFilter(e){
            if (e.field === "Discontinued") {
              var filter = e.filter;
              if (filter && filter.filters && filter.filters.length > 0) {
                var filters = filter.filters;
                // convert the filter string value to a boolean one
                filters[0].value = (filters[0].value === "true");
              }
            }
          }
    ```

The following example demonstrates the full implementation of the suggested approach.

```dojo
    <div id="grid"></div>

    <script>
      $(document).ready(function() {
        $("#grid").kendoGrid({
          dataSource: {
            transport: {
              read:  {
                url: "https://demos.telerik.com/kendo-ui/service/Products",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                fields: {
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" }
                }
              }
            },
            pageSize: 20
          },
          height: 550,
          scrollable: true,
          sortable: true,
          filterable: true,
          pageable: true,
          columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
            { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
            { field: "Discontinued", width: "130px", filterable: { ui: boolFilterTemplate } }
          ],
          filter: onFilter,
          filterMenuOpen: onFilterMenuInit
        });

        function boolFilterTemplate(input) {
          input.kendoDropDownList({
            dataSource: {
              data: [
                { text: "True", value: true },
                { text: "False", value: false }
              ]
            },
            dataTextField: "text",
            dataValueField: "value",
            valuePrimitive: true,
            optionLabel: "All"
          });
        }

        function onFilter(e){
          if (e.field === "Discontinued") {
            var filter = e.filter;
            if (filter && filter.filters && filter.filters.length > 0) {
              var filters = filter.filters;
              // convert the filter string value to a boolean one
              filters[0].value = (filters[0].value === "true");
            }
          }
        }

        function onFilterMenuInit(e){
          if (e.field == "Discontinued") {
            // replace default text in filter menu
            e.container.find(".k-filter-help-text").text("Show items with value:");
          }
        }
      });
    </script>
```


