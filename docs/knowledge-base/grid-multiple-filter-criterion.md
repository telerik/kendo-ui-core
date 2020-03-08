---
title: Create Filter Widgets with Multiple Filter Criteria in Grid
description: An example on how to create a filter widget with a multiple filter criterion in the Kendo UI Grid.
type: how-to
page_title: Create Filter Widgets with Multiple Filter Criteria | Kendo UI Grid for jQuery
slug: grid-multiple-filter-criterion
tags: grid, multiple, filter, filters, criterion, extra, more, filtering, filtratrion, many
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
  <td>2018.1.117</td>
 </tr>
</table>

## Description

How can I create a filter widget with a multiple filter criterion in the Grid?

## Solution

1. In the [`filterMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuinit) event handler, add the required number of inputs.
1. When the `click` event of the **Submit** button is clicked, build the filter query and filter the data source by using the [`flter`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-filter) method.

```dojo
    <h1>Ship Name column has custom filte UI</h1>
    <div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    Freight: { type: "number" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShipCity: { type: "string" }
                  }
                }
              },
              pageSize: 20,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: [{
              field:"OrderID",
              filterable: false
            },
                      "Freight",
                      {
                        field: "OrderDate",
                        title: "Order Date",
                        format: "{0:MM/dd/yyyy}"
                      }, {
                        field: "ShipName",
                        title: "Ship Name"
                      }, {
                        field: "ShipCity",
                        title: "Ship City"
                      }
                     ],
            filterMenuInit:onFilterMenuInit
          });

          function onFilterMenuInit(e){
            if(e.field == 'ShipName'){
              e.container.html('');
              $('<div id="logic">')
                .appendTo(e.container)
                .kendoDropDownList({
                dataTextField:'name',
                dataValueField:'value',
                dataSource: [{name:'AND',value:'and'},{name:'OR',value:'or'}],

              })

              for(var i = 0; i < 3; i++){
                $('<div id="operator'+i+'">')
                  .appendTo(e.container)
                  .kendoDropDownList({
                  dataTextField:'name',
                  dataValueField:'value',
                  dataSource: [
                    {name:'Is equal to',value:'eq'},
                    {name:'Is not equal to',value:'neq'},
                    {name:'Contains',value:'contains'}

                  ],

                })

                $('<input class="k-textbox" id="value'+i+'">')
                  .appendTo(e.container)
              }


              var submit = $('<button type="submit" class="k-button k-primary">Filter</button>')

              $('<div >')
                .append(submit)
                .append('<button type="reset" class="k-button">Clear</button>')
                .appendTo(e.container)

              submit.on('click', function(){
                var grid =  $('#grid').data('kendoGrid');
                var logic = $('#logic').data('kendoDropDownList').value();
                var filterQuery =grid.dataSource.filter();

                if(filterQuery){
                  removeFiltersForField(filterQuery,'ShipName')
                }else{
                  filterQuery= {logic:'and', filters:[]};
                }

                var shipNameFilter = {logic:logic, filters:[]};

                for(var i =0; i < 3; i++){
                  shipNameFilter.filters.push({
                    field:'ShipName',
                    operator: $('operator'+i).data('kendoDropDownList').value(),
                    value: $('value'+i).val()
                  })
                }

                filterQuery.filters.push(shipNameFilter)

                grid.dataSource.filter(filterQuery);


              })

            }}
        });

        function removeFiltersForField(expression, field) {
          if (expression.filters) {
            expression.filters = $.grep(expression.filters, function(filter) {
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
    </div>
```
