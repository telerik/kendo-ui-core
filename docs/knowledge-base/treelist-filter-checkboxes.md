---
title: Filter Data Using Checkbox Filter Menu in TreeList
description: "Learn how to create checkbox filter menu functionality in the Kendo UI TreeList."
type: how-to
page_title: Create Checkbox Filter Menu - Kendo UI TreeList for jQuery
slug: treelist-filter-checkboxes
tags: treelist, filter, menu, checkbox
ticketid: 1610040
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® TreeList for jQuery</td>
	</tr>
</table>


## Description

How can I create a checkbox filter menu functionality in the Kendo UI TreeList?

## Solution

The following example demonstrates how to create a menu functionality based on a checkbox filter in a TreeList:

1. Handle the [`filterMenuInit`](/api/javascript/ui/treelist/events/filtermenuinit) event.
1. Create checkbox for each item for the respective field and insert it to the filter popup.
1. Use DataSource [`filter`](/api/javascript/data/datasource/methods/filter) method to filter the items based on the checkbox selection.


```dojo
    <div id="example">
      <div id="treelist"></div>

      <script id="photo-template" type="text/x-kendo-template">
           <div class='employee-photo'
                style='background-image: url(https://demos.telerik.com/kendo-ui/content/web/treelist/people/#:data.EmployeeID#.jpg);'></div>
           <div class='employee-name'>#: FirstName #</div>
      </script>

      <script>
        $(document).ready(function() {
          var service = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            dataSource: {
              transport: {
                read: {
                  url: service + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                }
              },
              schema: {
                model: {
                  id: "EmployeeID",
                  parentId: "ReportsTo",
                  fields: {
                    ReportsTo: { field: "ReportsTo",  nullable: true },
                    EmployeeID: { field: "EmployeeId", type: "number" },
                    Extension: { field: "Extension", type: "number" }
                  },
                  expanded: true
                }
              }
            },
            height: 840,
            filterable: true,
            sortable: true,
            filterMenuInit: onFilterMenuInit,
            columns: [
              { field: "FirstName", title: "First Name", width: 280,
               template: $("#photo-template").html() },
              { field: "LastName", title: "Last Name", width: 160 },
              { field: "Position" },
              { field: "Phone", width: 200 },
              { field: "Extension", width: 140 },
              { field: "Address" }
            ],
            pageable: {
              pageSize: 15,
              pageSizes: true
            }
          });
        });

        function onFilterMenuInit(e) {
          if (e.field == "LastName" || e.field == "Position") {
            initCheckboxFilter.call(this, e);
          }
        }

        function initCheckboxFilter(e) {
          var popup = e.container.data("kendoPopup");          
          var dataSource = this.dataSource;
          var field = e.field;
          var checkboxesDataSource = new kendo.data.DataSource({
            data: uniqueForField(dataSource.data(), field),
            sort: { field: field, dir: "asc" }
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

      <style>
        .employee-photo {
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

        .employee-name {
          display: inline-block;
          vertical-align: middle;
          line-height: 32px;
          padding-left: 3px;
        }

        .checkbox-container{
          overflow-y: auto;
          height: 400px;
        }
      </style>
    </div>
```

## See Also

* [API Reference of the TreeList](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist).
