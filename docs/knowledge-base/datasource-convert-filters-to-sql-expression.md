---
title: Convert DataSource Filters to SQL Expression
page_title: Convert DataSource Filters to SQL Expression
description: "Learn how to convert regular and nested filters to SQL expressions."
slug: datasource-convert-to-sql-expression
tags: telerik, kendo, jquery, grid, datasource, sql, expression, scheduler, treelist, where, filter, filters
component: datasource
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DataSource for jQuery</td>
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

How can I convert the DataSource filters to an SQL expression?

## Solution

1. Define a mapping object between the Kendo Filter operators and the SQL Comparison operators.
1. Loop through the datasource filters.
1. Check if there are nested filters and use recursion to extract them.
1. Retrieve a mapping by using the operator of the current filter.
1. Check the type of the value. If it is a date, use the [`kendo.toString`](/api/javascript/kendo/methods/tostring) method to format it in the correct SQL datetime format.
1. Use the [`kendo.format`](/api/javascript/kendo/methods/format) method to replace the placeholders in the mapping string with the field and value of the current filter.
1. Finally, combine all of the filter strings into a single string.

Once the SQL expression is generated, you can use a number of different approaches to send the string back to the server for further processing. For example, the [`data`](/api/javascript/data/datasource/configuration/transport.read#transportreaddata) option of the [`transport`](/api/javascript/data/datasource/configuration/transport) configurations.

The following example showcases the complete solution integrated with a Kendo UI Grid:

```dojo
    <button id="get" type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"><span class="k-button-text">Convert Filters to SQL Query</span></button>
    <div id="console" style='padding: 1em;'>
      <p>SELECT * FROM mytable</p>
      <p>WHERE <span id="console-filter" style='color: #205493;'></span></p>
    </div>
    <div id="grid"></div>
    <script>

      // Configure the date format for the SQL expressions.
      const SQL_DATE_FORMAT = "yyyyMMdd hh:mm:ss";

      const mappings = {
        "eq": "{0} = '{1}'",
        "neq": "{0} != '{1}'",
        "isnull": "{0} IS NULL",
        "isnotnull": "{0} IS NOT NULL",
        "lt": "{0} < '{1}'",
        "lte": "{0} <= '{1}'",
        "gt": "{0} > '{1}'",
        "gte": "{0} >= '{1}'",
        "startswith": "{0} LIKE '{1}%'",
        "doesnotstartwith": "{0} NOT LIKE '{1}%'",
        "contains": "{0} LIKE '%{1}%'",
        "doesnotcontain": "{0} NOT LIKE '%{1}%'",
        "isempty": "{0} = ''",
        "isnotempty": "{0} != ''"
      };

      const toSQLExpression = (filter) => {
        if(!filter) return;

        let filters = filter.filters,
            field,
            value,
            operator,
            mapping,
            type,
            logic = filter.logic || "AND",
            result = [];

        for(let i=0; i<filters.length; i++) {
          filter = filters[i],
            field = filter.field,
            value = filter.value,
            operator = filter.operator;

          if(filter.filters) {
            filter = toSQLExpression(filter);
          } else {
            mapping = mappings[operator];
            type = $.type(value);

            if(type == "date") {
              value = kendo.toString(value, SQL_DATE_FORMAT);
            }

            filter = kendo.format(mapping, field, value);
          }

          result.push(filter);
        }

        filter = result.join(" " + logic.toUpperCase() + " ");

        if (result.length > 1) {
          filter = "(" + filter + ")";
        }

        return filter;
      }

      $("#get").on("click", () => {
        let filters = $("#grid").data("kendoGrid").dataSource.filter();
        let sqlFilters = toSQLExpression(filters);

        $("#console-filter").text(sqlFilters);
      });

      $(document).ready(function() {
        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            filter: {
              logic: "and",
              filters: [
                {field: "Freight", operator: "gte", value: 10},
                {field: "Freight", operator: "lte", value: 100},
                {
                  logic: "or",
                  filters: [
                    {field: "ShipName", operator: "startswith", value: "Vin"},
                    {field: "ShipName", operator: "contains", value: "ey"},
                  ]
                },
                {
                  logic: "or",
                  filters: [
                    {field: "ShipCity", operator: "contains", value: "Br"},
                    {field: "ShipCity", operator: "contains", value: "Be"},
                  ]
                },
                {
                  logic: "and",
                  filters: [
                    {field: "OrderDate", operator: "gt", value: kendo.parseDate("7/11/1996")},
                    {field: "OrderDate", operator: "lt", value: kendo.parseDate("4/22/1998")},
                  ]
                }
              ]
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
          columns: [
            {
              field:"OrderID",
              filterable: false
            },
            {
              field: "Freight"
            },
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
          ]
        });
      });
    </script>
```
