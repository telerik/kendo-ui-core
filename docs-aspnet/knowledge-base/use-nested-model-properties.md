---
title: Using Nested Model Properties
page_title: Using Nested Model Properties
description: An example on how to use nested model properties in the {{ site.framework }}
slug: howto_use_nested_model_properties_grid
tags: use, nested, model, properties, grid
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.framework }} Grid</td>
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

How can I use nested Model properties in the {{ site.framework }}'s Grid?

## Solution

To bind a column of the Grid to a Model with nested properties you need to use a Custom DataSource which allows you to configure the `[From](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/customdatasourcemodelfielddescriptorbuilder#fromsystemstring)` configuration property of the `[schema.model.field](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/customdatasourcemodeldescriptorfactory#fieldsystemstring)`.

In addition when you use `From` together with CRUD operations and add new rows, you also have to define in `Schema.Model.Field` the original field or the sequence of nested fields which are used inside `From`.

The reason is that during updates and creates, the Telerik UI DataSource tries to construct a data item object which matches the original (server-side) data-item structure. For new data items, such a structure does not exist and needs to be defined explicitly.

```
  ...
  .DataSource(ds => ds
              .Custom()
              .PageSize(20)
              .ServerFiltering(false)
              .Schema(schema =>
                  schema.Model(model =>
                  {
                    model.Id(id => id.Name);
                    model.Field(f => f.Name);
                    model.Field(f => f.Description).From("Description.Text");
                }).Data("Data").Total("Total")
            )
            .Transport(transport =>
            {
                transport.Read("Orders_Read", "Grid");
                transport.Update("Orders_Update", "Grid");
                transport.Create("Orders_Create", "Grid");
                transport.Destroy("Orders_Destroy", "Grid");
            })
            )
    )
```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid)

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
