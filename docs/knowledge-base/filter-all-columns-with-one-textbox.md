---
title: Filter All Grid Columns with Single Textbox
description: An example on how to filter all columns with a single textbox in the Kendo UI Grid.
type: how-to
page_title: Filter All Columns with Single Textbox | Kendo UI Grid for jQuery
slug: filter-all-columns-with-one-textbox
tags: grid, filter, all, columns, single, input, textbox, one, global, search, entire, whole
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.1026</td>
 </tr>
</table>

## Description

How can I implement a global Grid search and enable the users to search through all Grid columns by using a single input field?

## Solution

1. Within the [`input`](https://developer.mozilla.org/en-US/docs/Web/Events/input) event handler of the textbox, build a filter query by using the value of the textbox.
1. Filter the data source by using the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter) method.

```dojo

    <div id="example">
      Filter all fields:
      <input id='filter' class='k-textbox'/>
      <div id="grid"></div>

      <script>        
        function isNumeric(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function getBoolean(str) {
          if("true".startsWith(str)){
            return true;
          } else if("false".startsWith(str)){
            return false;
          } else {
            return null;
          }          
        }

        $(document).ready(function () {
          $("#grid").kendoGrid({
            dataSource: {
              data: [{ name: "John", dob: new Date(2017,10,12), id:4, isAdmin:true },{ name: "Tim", dob: new Date(1998,3,11), id:5, isAdmin:true },{ name: "Jane", dob: new Date(2000,11,12), id:6,isAdmin:false }],
              schema: {
                model: {
                  fields: {
                    id: { type: "number" },
                    name: { type: "string" },
                    dob: { type: "date" },
                    isAdmin :{type:"boolean"}
                  }
                }
              }
            },
            height: 550,
            columns: [
              { field:"id"},
              { field: "dob", format: "{0:dd/MM/yyyy}"},
              { field: "name"},
              { field: "isAdmin", title: "Is Admin"}
            ]
          });

          $('#filter').on('input', function (e) {
            var grid = $('#grid').data('kendoGrid');
            var columns = grid.columns;

            var filter = { logic: 'or', filters: [] };
            columns.forEach(function (x) {
              if (x.field) {
                var type = grid.dataSource.options.schema.model.fields[x.field].type;
                if (type == 'string') {
                  filter.filters.push({
                    field: x.field,
                    operator: 'contains',
                    value: e.target.value
                  })
                }
                else if (type == 'number') {
                  if (isNumeric(e.target.value)) {
                    filter.filters.push({
                      field: x.field,
                      operator: 'eq',
                      value: e.target.value
                    });
                  }    

                } else if (type == 'date') {
                  var data = grid.dataSource.data();
                  for (var i=0;i<data.length ; i++){
                    var dateStr = kendo.format(x.format, data[i][x.field]);
                    // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                    if(dateStr.startsWith(e.target.value)){
                      filter.filters.push({
                        field: x.field,
                        operator:'eq',
                        value: data[i][x.field]
                      })
                    }
                  }
                } else if (type == 'boolean' && getBoolean(e.target.value) !== null) {
                  var bool = getBoolean(e.target.value);
                  filter.filters.push({
                    field: x.field,
                    operator: 'eq',
                    value: bool
                  });
                }               
              }
            });
            grid.dataSource.filter(filter);
          });
        });
      </script>
    </div>
```
