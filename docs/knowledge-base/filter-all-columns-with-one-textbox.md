---
title: Filter all columns with single textbox
description: Example on how to filter all columns with single textbox
type: how-to
page_title: Filter all columns with single textbox | Kendo UI Grid
slug: filter-all-columns-with-one-textbox
tags: grid, filter, all, columns, single, input, textbox, one, global, search, entire, whole
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

I want the users to search through all columns of the grid using one single input field. How can I implement a global grid search?

## Solution

Within the [input event](https://developer.mozilla.org/en-US/docs/Web/Events/input) handler of the text box, build a filter query using the value of the textbox. Then filter the data source using the [filter method](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-filter).
    

```html

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
                      ProductName: { type:"string", validation: { required: true } },
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
            height: 550,
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
              { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
              { field: "Discontinued", width: "120px"}]
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
                  var date = new Date(e.target.value)

                  if (!isNaN(date.getTime()) ) {
                    filter.filters.push({
                      field: x.field,
                      operator: 'eq',
                      value: date
                    })
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