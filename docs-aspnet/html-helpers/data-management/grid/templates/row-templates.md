---
title: Row Templates
page_title: Row Templates
description: "Get started with the {{ site.product_short }} Grid by Kendo UI and learn how to place custom content into a grid row with the help of row templates."
components: ["grid"]
slug: row_templates_aspnetcore_grid
position: 3
---

# Row Templates

The Kendo UI Grid supports row templates which enable you to place custom content into a Grid row.

When you use a `ClientRowTemplate`, the template defines the complete `<tr>` and `<td>` markup. To center a cell, add a class or an inline `text-align` style directly to the relevant `<td>` element.

```HtmlHelper
    .ClientRowTemplate("<tr data-uid='#=data.uid#'>" +
        "<td class='toppane-input-wrap'>#=data.OrderID#</td>" +
        "<td class='toppane-input-wrap'>#=data.ShipCountry#</td>" +
    "</tr>")
```

```CSS
    .toppane-input-wrap {
        text-align: center;
    }
```

The `toppane-input-wrap` class in this example is a custom application class, not a Kendo UI class. For standard generated Grid cells, use the column alignment options described in the [content alignment article]({% slug cell_alignment_aspnet_grid %}).

For runnable examples, refer to:
* [Demo on using the row template of the Grid HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/grid/rowtemplate)
* [Demo on using the detail-row template of the Grid HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/grid/detailtemplate)
* [Demo on using the toolbar template of the Grid HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-template)

The following example demonstrates how to use a string row template which generates two columns. The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `#= uid #`. The grid uses the `uid` data attribute to determine which data a table row is bound to.

```HtmlHelper
        .ClientRowTemplate("<tr data-uid='#=data.uid#'>" +
            "<td>#=data.OrderID#</td>" +
            "<td><strong>#=ShipCountry #</strong></td>" +
        "</tr>")
```
{% if site.core %}
```TagHelper
    @{
        string rowTemplate = "<tr data-uid='#=data.uid#'>" +
            "<td>#=data.OrderID#</td>" +
            "<td><strong>#=ShipCountry #</strong></td>" +
            "</tr>";
    }
    <kendo-grid name="grid" style="height:430px;"
            row-template="@rowTemplate">
    </kendo-grid>
```
{% endif %}

## Use a JavaScript Function as the Row Template

To define the row template as a JavaScript function, register the function name with `ClientRowTemplateHandler()`. The function receives the data item and must return the complete row markup, including the `data-uid` attribute.

```HtmlHelper
@(Html.Kendo().Grid<ProductViewModel>()
    .Name("grid")
    .ClientRowTemplateHandler("rowTemplateFn")
)
```

```JavaScript
function rowTemplateFn(dataItem) {
    return "<tr data-uid='" + dataItem.uid + "'>" +
        "<td>" + kendo.htmlEncode(dataItem.OrderID) + "</td>" +
        "<td>" + kendo.htmlEncode(dataItem.ShipCountry) + "</td>" +
    "</tr>";
}
```

Use `ClientRowTemplate()` for a Kendo template string; use `ClientRowTemplateHandler()` when the row template is a named JavaScript function.

## Frozen Columns

The Grid does not support row templates together with frozen (locked) columns.


![{{ site.product_short }} A Grid with an applied row template](../row-template.png)

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Using Row Templates in the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/rowtemplate)
* [Using Detail-Row Templates in the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/detailtemplate)
* [Using Toolbar Templates in the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-template)
* [Server-Side API](/api/grid)
