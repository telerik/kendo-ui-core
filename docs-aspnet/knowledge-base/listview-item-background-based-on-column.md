---
title: Coloring Background of ListView Items Based on Data Column in UI for ASP.NET Core
description: Learn how to color the background of ListView items dynamically based on a data column in UI for ASP.NET Core.
type: how-to
page_title: Change ListView Item Background Color Based on Data Column in ASP.NET Core
meta_title: Change ListView Item Background Based on Data Column in ASP.NET Core
slug: listview-item-background-based-on-column
tags: listview,asp.net core,conditional-formatting,template
res_type: kb
ticketid: 1718451
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
ListView for UI for ASP.NET Core
</td>
</tr>
<tr>
<td> Version </td>
<td> 2026.1.415 </td>
</tr>
</tbody>
</table>

## Description

I want to change the background color of each item in the [ListView](https://docs.telerik.com/aspnet-core/html-helpers/data-management/listview/overview) based on a data column's value. For instance, if a product is discontinued, I need the item's background to be displayed in red.

This knowledge base article also answers the following questions:
- How to apply conditional formatting to ListView items in ASP.NET Core?
- How to dynamically style ListView items based on a data field?
- How to customize ListView items using templates?

## Solution

To achieve this, modify the ListView's client-side template and add a conditional class to the outer element. Then use CSS to define the styling for these classes.

1. Update the ListView template to include conditional logic for applying a specific class:

```html
<script type="text/x-kendo-template" id="template">
    <div class="product #= Discontinued ? 'product--discontinued' : '' #">
        <img src="@Url.Content("~/shared/web/foods/#= ProductID #.jpg")"
             alt="#= ProductName #" />
        <h3>#= ProductName #</h3>
        <p>#= kendo.toString(UnitPrice, "c") #</p>
    </div>
</script>
```

2. Define the required CSS styles for the default and conditional item states:

```css
#listView .product {
    padding: 12px;
}

#listView .product--discontinued {
    background-color: #f8d7da;
    color: #842029;
}
```

3. Bind the ListView to your data source and apply the template:

```html
@(Html.Kendo().ListView<ProductViewModel>()
    .Name("listView")
    .ClientTemplateId("template")
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
)
```

With this approach, the background color of the ListView items dynamically changes based on the `Discontinued` column value.

## See Also

- [ListView Overview - UI for ASP.NET Core](https://docs.telerik.com/aspnet-core/html-helpers/data-management/listview/overview)
- [Remote Data Binding in ListView](https://demos.telerik.com/aspnet-core/listview/remote-data-binding)
- [Kendo UI Templates Documentation](https://docs.telerik.com/kendo-ui/framework/templates/overview)

