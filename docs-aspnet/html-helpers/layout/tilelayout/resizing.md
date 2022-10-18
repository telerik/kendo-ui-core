---
title: Resizing
page_title: The Telerik UI TileLayout component for {{ site.framework }} Documentation - TileLayout Resizing 
description: "Learn how to enable and use the resizing functionality of the Telerik UI TileLayout component for {{ site.framework }}."
slug: htmlhelpers_aspnet_tilelayout_resizing
position: 3
---

# TileLayout Resizing

The Telerik UI TileLayout for {{ site.framework }} allows you resize the containers by snapping to the available columns and row units. When enabled the user is able to alter the width or the height of а current item. 

The resizing takes advantage of the [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) mechanism, meaning that the widget increases how the element spans and the browser takes care of how to re-arrange the items if necessary.

## Enabling the Resizable Feature of the TileLayout

To enable the resizable feature of the TileLayout, set the [`Resizable()`](/api/Kendo.Mvc.UI.Fluent/TileLayoutBuilder#resizable) method {% if site.mvc %}
and pass `true` as a parameter{% endif %}. When resizable is enabled, the TileLayout items should have `RowSpan` and `ColSpan` defined.

The example below will render a grid with two rows and two columns which can be resized both vertically and horizontally.

```HtmlHelper
     @(Html.Kendo().TileLayout()
        .Name("tilelayout")
        .Columns(3)
        .Containers(c => {
            c.Add().Header(h => h.Text("Item one")).BodyTemplate("Item one body").ColSpan(1).RowSpan(1);
            c.Add().Header(h => h.Text("Item two")).BodyTemplate("Item two body").ColSpan(1).RowSpan(1);
        })
        .Resizable(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-tilelayout columns="3" resizable="true" name="tilelayout" on-resize="onTileResize">
        <containers>
            <container body-template="Item one body" col-span="1" row-span="1">
                <container-header text="Item one"/>
            </container>
            <container body-template="Item two body" col-span="1" row-span="1">
                <container-header text="Item two"/>
            </container>
        </containers>
    </kendo-tilelayout>   
```
{% endif %}

## Event Handling

The widget triggers a [`Resize()`](/api/Kendo.Mvc.UI.Fluent/TileLayoutEventBuilder#resizesystemstringe) event which provides access to the resized container.

```HtmlHelper
    .Events(e=>e.Resize("onResize"))
    <script>
        function onResize (e) {
            console.log(e.container.find(".k-card-header").text());
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-tilelayout name="tilelayout" on-resize="onResize">
    </kendo-tilelayout>

    <script>
        function onResize(e) {
            console.log(e.container.find(".k-card-header").text());
        }
    </script>
```
{% endif %}

## See Also

* [Overview of the TileLayout (Demo)](https://demos.telerik.com/{{ site.platform }}/tilelayout/index)
* [API Reference of the TileLayout](/api/tilelayout)
* [Reordering]({% slug htmlhelpers_aspnet_tilelayout_reordering %})
* [Containers]({% slug htmlhelpers_aspnet_tilelayout_containers %})
