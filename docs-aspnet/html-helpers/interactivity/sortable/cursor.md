---
title: Cursor
page_title: Cursor
description: "Get started with the Telerik UI Sortable component for {{ site.framework }} and learn how to customize the displayed cursor."
slug: htmlhelpers_sortable_aspnetcore_cursor
position: 4
---

# Cursor

The `cursor` configuration option determines the type of cursor that will be displayed while the user is dragging a sortable item.

For the full list of built-in cursor types, refer to [quirksmode.org](http://quirksmode.org/css/user-interface/cursor.html).

> Avoid using a custom cursor in Internet Explorer. Due to the browser specifics in custom icon rendering, using a custom cursor may lead to performance issues.

The following example demonstrates how to change the cursor type to `"move"`.

```HtmlHelper
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    @(Html.Kendo().Sortable()
        .For("#sortable")
        .Cursor("move")
    )
```
{% if site.core %}
```TagHelper
     <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <kendo-sortable name="sortable" cursor="move" >
    </kendo-sortable>
```
{% endif %}

The `cursor` option changes the style of the cursor only for the time the item is dragged. To change the cursor type on `hover`, use CSS.

```HtmlHelper
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    @(Html.Kendo().Sortable()
        .For("#sortable")
        .Cursor("url('https://demos.telerik.com/kendo-ui//content/web/sortable/grabbing.cur'), default")
    )

    <style>
        #sortable li {
            cursor: url('https://demos.telerik.com/kendo-ui//content/web/sortable/grabbing.cur'), default;
        }
    </style>
```
{% if site.core %}
```TagHelper
     <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <kendo-sortable name="sortable" cursor="url('https://demos.telerik.com/kendo-ui//content/web/sortable/grabbing.cur'), default" >
    </kendo-sortable>

    <style>
        #sortable li {
            cursor: url('https://demos.telerik.com/kendo-ui//content/web/sortable/grabbing.cur'), default;
        }
    </style>
```
{% endif %}

## See Also

* [Basic Usage of the Sortable HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sortable/index)
{% if site.core %}
* [Basic Usage of the Sortable TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/sortable/tag-helper)
{% endif %}
* [Server-Side API](/api/sortable)
