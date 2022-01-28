---
title: Use MultiSelect for Row Filtering in Combination with Menu Multi Checkbox Filtering
page_title: MultiSelect for Row Filtering with Menu Multi Checkbox Filtering | Kendo UI Grid for jQuery
description: "An example on how to set a Kendo UI MultiSelect for row filtering of the Kendo UI Grid and Make it Work in Combination with Menu Multi Checkbox Filtering."
slug: howto_use_multiselect_forrow_filtering__incombination_withmenu_chechbox_filter_grid
tags: use, multiselect, grid, row, filtering, menu, checkbox
component: grid
type: how-to
ticketid: 1544503
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

How can I use a Kendo UI MultiSelect for row filtering of the Kendo UI Grid for jQuery and make it work in combination with menu multi checkbox filtering?

## Solution

1. Use [`columns.filterable.cell.template`](/api/javascript/ui/grid/configuration/columns.filterable.cell#columnsfilterablecelltemplate) property to set the MultiSelect as the row filter.
2. In the [`filter`](/api/javascript/ui/grid/events/filter) Grid event update the MultiSelect values to match the applied filter from the multi checkbox menu.

The following example demonstrates the full implementation of the suggested approach.

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
          filterable: {
            mode: "row, menu"
          },
          columns: [
            {field: "id", title: "Id"},
            {
              field: "name",
              title: "Name",
              filterable: {
                cell: {
                  template: function (args) {
                    createMultiSelect(args.element);
                  },
                  showOperators: false
                },
                multi: true, search: true
              }
            },
            {field: "key", title: "Key"},
            { field: "value", title: "Value"}
          ],
          filter: function(e){
            //clear MultiSelect value
            if(!e.filter && e.field == "name"){
              $("[data-field='name']").find("[data-role='multiselect']").data("kendoMultiSelect").value([]);
            }
            // Update MultiSelect with values from the chechbox filter
            if(e.filter && e.field == "name"){
              var values =[];
              e.filter.filters.forEach(function(el) {
                values.push(el.value)
              })
              $("[data-field='name']").find("[data-role='multiselect']").data("kendoMultiSelect").value(values);
            }
          }
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
