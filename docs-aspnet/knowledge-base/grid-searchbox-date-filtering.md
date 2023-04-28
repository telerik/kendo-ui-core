---
title: Using Search Box to Filter the Grid Data by Date 
description: Learn how to filter the Grid data by a DateTime field when using its Search box. Find the solution in the {{ site.product }} Knowledge Base.
type: how-to
page_title: Filter the Grid Data by a DateTime Field with the Search Tool
slug: grid-searchbox-date-filtering
tags: grid, search, box, date, time, field, filter, data, schema, parse
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
  <tr>
  <td>Progress Тelerik UI for {{ site.framework }} version</td>
  <td>2022.1.119</td>
 </tr>
</table>


## Description

How can I filter the Grid's data by a `DateTime` field with the Search tool? It recognizes strings formatted like dates as integers, for example, 07/08/1996 is parsed as 07. 

## Solution

When the Grid is bound to a numeric field and the search input includes numbers the input is parsed as a number by default. 

To change this behavior, configure the `Schema.Model.Parse` property of the Numeric field to use a JavaScript handler function. To prevent the parsing of the date as a number, look for special date symbols in the handler and return null if there are any.


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

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
