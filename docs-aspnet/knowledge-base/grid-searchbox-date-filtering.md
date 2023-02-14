---
title: Grid Search Box Date Filtering
description: Filter the Grid data by a DateTime Field using its Search box
type: how-to
page_title: How to filter the data of the Grid by a DateTime field with the Search tool
slug: grid-searchbox-date-filtering
tags: grid, search, box, date, time, field, filter, data, schema, parse
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® UI Grid for UI for {{ site.framework }}</td>
 </tr>
  <tr>
  <td>Progress Тelerik UI version</td>
  <td>2022.1.119</td>
 </tr>
</table>


## Description

How can I filter the Grid's data by a DateTime field with the Search tool? It recognizes strings formatted like dates as integers, for example, 07/08/1996 is parsed as 07. 

## Solution

When the Grid is bound to a numeric field and the search input includes numbers the input is parsed as a number by default. 

To change this behavior, configure the `Schema.Model.Parse` property of the Numeric field to use a JavaScript handler function. Тo prevent the parsing of the date as a number, look for special date symbols in the handler and return null if there are any.


### Client Operations

For a runnable sample of the Client-side operations approach refer to this [Telerik REPL](https://netcorerepl.telerik.com/mmaowUPI25QV9sSD08).


```View.cshtml
    .DataSource( dataSource => dataSource
        .Custom()
        ...
        .Schema(schema =>
        {
            schema.Model(model =>
            {
                model.Id(x => x.OrderID);
                model.Field(p => p.Freight).Parse("parseFreight");
                model.Field(p=>p.OrderDate);
                model.Field(p => p.ShipName);
            });
            schema.Data("Data");
            schema.Total("Total");
        })
    )

    <script>
        function parseFreight(val){
            var s = val.toString();
            if (s.indexOf("/") !== -1) {
                return null;
            }
            return kendo.parseFloat(val);
        }
    </script>
```

### Server Operations

For a runnable sample of the Server-side operations approach refer to this [Telerik REPL](https://netcorerepl.telerik.com/cmOIQqFy26LMASWU44).


```View.cshtml
    .DataSource( dataSource => dataSource
        .Custom()
        ...
        .ServerFiltering(true)
        .ServerPaging(true)
        .Schema(schema =>
        {
            schema.Model(model =>
            {
                model.Id(x => x.OrderID);
                model.Field(p => p.Freight).Parse("parseFreight");
                model.Field<DateTime?>(p=>p.OrderDate);
                model.Field(p => p.ShipName);
            });
            schema.Data("Data");
            schema.Total("Total");
        })
    )

    <script>
        function parseFreight(val){
            var s = val.toString();
            if (s.indexOf("/") !== -1) {
                return null;
            }
            return kendo.parseFloat(val);
        }
    </script>
```
