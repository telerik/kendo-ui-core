---
title: Use MultiSelect for Column Filtering
page_title: MultiSelect for Column Filtering | Kendo UI Grid for jQuery
description: "An example on how to use a Kendo UI MultiSelect for column filtering of the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/filtering-array-column-using-multiselect, /controls/data-management/grid/how-to/multiselect-used-for-column-filtering, /web/grid/how-to/multiselect-used-for-column-filtering, /controls/data-management/grid/how-to/filtering/multiselect-used-for-column-filtering
slug: howto_use_multiselect_forcolumn_filtering_grid
tags: use, multiselect, grid, column, filtering
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

How can I use a Kendo UI MultiSelect for column filtering of the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to use the MultiSelect as a column filter for the Grid.

```dojo
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
    <div id="grid"></div>
    <script>
      var data = [
        { id: 1, name: "Fred", key: 1, value: "Green" },
        { id: 2, name: "Jed", key: 11, value: "Jorgensen" },
        { id: 3, name: "Red", key: 2, value: "Blah" },
        { id: 4, name: "Ted", key: 23, value: "Bleh" },
        { id: 5, name: "Ed", key: 3, value: "Toast" },
        { id: 6, name: "Zed", key: 4, value: "Smith" },
        { id: 7, name: "Ed", key: 41, value: "Johnson" }
      ];

      $(function() {
        var names = _.sortBy(_.uniq(_.pluck(data, "name")), function(n) { return n; });

        function createMultiSelect(element) {
          element.removeAttr("data-bind");

          element.kendoMultiSelect({
            dataSource: names,
            change: function(e) {
              var filter = { logic: "or", filters: [] };
              var values = this.value();
              $.each(values, function(i, v) {
                filter.filters.push({field: "name", operator: "eq", value: v });
              });
              console.log(this.dataSource.data());
              dataSource.filter(filter);
            }
          });
        }

        var dataSource = new kendo.data.DataSource({
          data: data,
          schema: {
            model: {
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                key: { type: "number" },
                value: { type: "string" }
              }
            }
          }
        });

        var grid = $("#grid").kendoGrid({
          dataSource: dataSource,
          sortable: true,
          filterable: true,
          columns: [
            {field: "id", title: "Id"},
            {
              field: "name",
              title: "Name",
              filterable: {
                ui : createMultiSelect,
                extra: false
              }
            },
            {field: "key", title: "Key"},
            { field: "value", title: "Value"}
          ]
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
