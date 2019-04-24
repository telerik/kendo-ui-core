---
title: Use DropDownList as Boolean Filter in Grid
description: An example on how to use a DropDownList to filter a boolean column.
type: how-to
page_title: Filter Boolean Grid Column with DropDownList | Kendo UI Grid
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

I am trying to set up a custom filter for a boolean column in our Grid. I need to have a DropDownList which lists True, False, All. How can I implement this?

## Solution

When you initialize a DropDownList widget in the filtering UI, the column will not be filtered correctly because the DropDownList returns string values instead of boolean ones. To fix this, you need to convert the strings to boolean values before the generated filter expression is applied to the Grid.

Follow the steps below to implement this functionality:

1. Use a filter template to show a DropDownList in the column filter menu:

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
1. Use the Grid [filterMenuInit](/api/javascript/ui/grid/events/filtermenuinit) event to replace the default filter label with more appropriate text:
    
    ```
          function onFilterMenuInit(e){
            if (e.field == "Discontinued") {
              // replace default text in filter menu
              e.container.find(".k-filter-help-text").text("Show items with value:");
            }
          }
    ```
1. Use the Grid [filter](/api/javascript/ui/grid/events/filter) event to replace the string value in the generated filter expression with its boolean equivalent:

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

###### Example

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

## See Also

* [DataSource filter API](/api/javascript/data/datasource/configuration/filter)
* [Grid Events](/api/javascript/ui/grid#events)
