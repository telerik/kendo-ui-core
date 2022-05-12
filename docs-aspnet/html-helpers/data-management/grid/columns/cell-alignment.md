---
title: Content Alignment
page_title: Content Alignment
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and learn how to align the cell content, the column header, and the column footer."
slug: cell_alignment_aspnet_grid
position: 11
---

# Content Alignment

By default, the text and values in the Grid are aligned to the left.

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
    <column field="OrderID" html-attributes='new Dictionary<string,object> { ["style"] = "text-align : right" }'/>
    ```
    {% endif %}



* Apply the `k-text-left`, `k-text-right` or `k-text-center` classes to the column definition by using the `HtmlAttributes()` method.

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

You can set the alignment of the column headers through the `HeaderHtmlAttributes()` method.

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

When a specified column has a footer, you can change the alignment of its content by using the `FooterHtmlAttributes()` method.

```HtmlHelper
    .Columns(columns =>
        {
            columns.Bound(o => o.OrderID).FooterHtmlAttributes(new { style = "text-align: center" });
        })
```
{% if site.core %}
```TagHelper
    <column field="OrderID" footer-html-attributes='new Dictionary<string,object> ["style"] = "text-align: center" }'/>
```
{% endif %}

## See Also

* [Content Alignment of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/cell-alignment)
* [Server-Side API](/api/grid)
