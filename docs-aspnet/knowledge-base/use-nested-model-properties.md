---
title: Use Nested Model Properties
page_title: Use Nested Model Properties | {{ site.framework }}
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

To bind a column of the Grid to a Model with nested properties you need to use a Custom DataSource which allows you to configure the `[From](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/CustomDataSourceModelFieldDescriptorBuilder#fromsystemstring)` configuration property of the `[Schema.Model.Field](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/CustomDataSourceModelDescriptorFactory#fieldsystemstring)`.

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

## See Also

* [JavaScript API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [JavaScript API Reference of the DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
* [Server-side API Reference of the DataSource](https://docs.telerik.com/{{ site.platform }}/api/datasource)