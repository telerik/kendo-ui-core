---
title: Filter Grid by Using the MultiSelect
description: An example on how to customize the kendo UI Grid filter and use the Kendo UI MultiSelect widget.
type: how-to
page_title: Filter the Grid with the MultiSelect Widget | Kendo UI Grid for jQuery
slug: filter-grid-with-multi-select-widget
tags: kendo ui, mvc, grid, multi, select, filter, custom,
ticketid: 1129339
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
   <td>Created with version 2017.3.913</td>
  </tr>
</table>

## Description

How can I apply multiple filters in a Grid for a single field with the Kendo UI MultiSelect widget?

## Solution

1. Specify which function will create the custom filter widget by using the `columns.filterable.ui` for menu filtering and `columns.filterable.cell.template` for row filtering.
1. In that function, create a MultiSelect widget.
1. When the `change` event is fired, apply the filters to the Grid based on the currently selected items.

```dojo
    <div id="example">
          <div id="grid"></div>
          <script>
            $(document).ready(function () {
              $("#grid").kendoGrid({
                filterMenuInit(e){
                  if(e.field== 'Country'){
                    e.container.css('width','300px')
                    e.container.find('[title="Operator"]').remove()
                    e.container.find('button').parent().remove()

                  }
                },
                dataSource: {
                  type: "odata",
                  transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                  },
                  pageSize: 20
                },
                height: 550,
                groupable: true,
                sortable: true,
                filterable:{extra:false},
                pageable: {
                  refresh: true,
                  pageSizes: true,
                  buttonCount: 5
                },
                columns: [{
                  template: "<div class='customer-photo'" +
                  "style='background-image: url(../content/web/Customers/#:data.CustomerID#.jpg);'></div>" +
                  "<div class='customer-name'>#: ContactName #</div>",
                  field: "ContactName",
                  title: "Contact Name",
                  width: 240
                }, {
                  field: "ContactTitle",
                  title: "Contact Title"
                }, {
                  field: "CompanyName",
                  title: "Company Name"
                }, {
                  field: "Country",
                  width: 150,
                  filterable:{
                    cell: {
                      operator: "eq",
                      showOperators: false
                    },
                    ui: function(element){
                      element.kendoMultiSelect({
                        dataSource:["UK", "Sweden","France","Germany"],
                        change: function (e){
                          var grid = $('#grid').data('kendoGrid');
                          var currentFilters = grid.dataSource.filter();
                          var value = this.value();

                          if(!currentFilters){
                            currentFilters = {filters:[], logic:'and'}
                          }

                          currentFilters.filters =  currentFilters.filters.filter(function(x){
                            return x.field != 'Country' && x.field != undefined
                          })

                          if(!value || value.length < 1 ){
                            grid.dataSource.filter(currentFilters);
                            return;
                          }

                          var countryFilters = {logic:'or', filters:[]}

                          this.value().forEach(function(x){
                            countryFilters.filters.push({field:'Country', operator:'eq', value:x})
                          })

                          currentFilters.filters.push(countryFilters)

                          grid.dataSource.filter(currentFilters)   
                          this.value(value)
                        }
                      })
                    }
                  }
                }]
              });
            });
          </script>
        </div>

        <style type="text/css">
          .customer-photo {
            display: inline-block;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-size: 32px 35px;
            background-position: center center;
            vertical-align: middle;
            line-height: 32px;
            box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
            margin-left: 5px;
          }

          .customer-name {
            display: inline-block;
            vertical-align: middle;
            line-height: 32px;
            padding-left: 3px;
          }
        </style>
```
