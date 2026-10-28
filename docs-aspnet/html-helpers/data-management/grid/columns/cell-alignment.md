---
title: Content Alignment
page_title: Content Alignment
description: "Learn how to align Telerik UI Grid cell, header, and footer content in {{ site.framework }} by using styles and alignment classes."
components: ["grid"]
slug: cell_alignment_aspnet_grid
position: 11
---

# Content Alignment

By default, Grid cell content is left-aligned.

## Cell Content

To change the content alignment of the Grid, use either of the following approaches:
* Apply a `text-align` style to the column definition by using the `HtmlAttributes()` method.

    ```HtmlHelper
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderID).HtmlAttributes(new { style = "text-align: right" });
        })
    ```
    {% if site.core %}
    ```TagHelper
    <column field="OrderID" html-attributes='new Dictionary<string,object> { ["style"] = "text-align: right" }'/>
    ```
    {% endif %}



* Apply the `k-text-left`, `k-text-right`, or `k-text-center` classes to the column definition by using the `HtmlAttributes()` method.

    ```HtmlHelper
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderID).HtmlAttributes(new { @class = "k-text-right" });
        })
    ```
    {% if site.core %}
    ```TagHelper
    <column field="OrderID" html-attributes='new Dictionary<string,object> { ["class"] = "k-text-right" }'/>
    ```
    {% endif %}

## Column Headers

Set the alignment of the column headers through the `HeaderHtmlAttributes()` method.

```HtmlHelper
    .Columns(columns =>
        {
            columns.Bound(o => o.OrderID).HeaderHtmlAttributes(new { style = "text-align: right; justify-content: flex-end;" });
        })
```
{% if site.core %}
```TagHelper
<column field="OrderID" header-html-attributes='new Dictionary<string,object> { ["style"] = "text-align: right; justify-content: flex-end;" }'/>
```
{% endif %}

## Column Footers

When a column has a footer, change the alignment of its content by using the `FooterHtmlAttributes()` method.

```HtmlHelper
    .Columns(columns =>
        {
            columns.Bound(o => o.OrderID).FooterHtmlAttributes(new { style = "text-align: center" });
        })
```
{% if site.core %}
```TagHelper
    <column field="OrderID" footer-html-attributes='new Dictionary<string,object> { ["style"] = "text-align: center" }'/>
```
{% endif %}

## See Also

{% if site.core %}
* [ASP.NET Core Grid overview](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Content Alignment of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/cell-alignment)
* [Grid server-side API reference for {{ site.framework }}](/api/grid)
