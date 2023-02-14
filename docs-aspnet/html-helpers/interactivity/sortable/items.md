---
title: Items
page_title: Items
description: "Disable, filter, and drag items within containers and between lists when working with the Telerik UI Sortable component for {{ site.framework }}."
slug: htmlhelpers_sortable_aspnetcore_items
position: 3
---

# Items

The Sortable provides options for controlling the behavior of its items.

## Disabling Items

To make items non-sortable, disable them by providing a selector that matches these items. As a result, the user will not be able to drag the disabled non-sortable items, or to change their position. However, they will still be valid sort targets.

```HtmlHelper
	@(Html.Kendo().Sortable()
    	.For("#sortable-basic")
    	.Disable(".disable")
	)
```
{% if site.core %}
```TagHelper
    <kendo-sortable name="sortable-basic" disabled=".disable">
    </kendo-sortable>
```
{% endif %}

## Filtering Items

To prevent items both from being dragged and being sort targets, specify a filter.

```HtmlHelper
	@(Html.Kendo().Sortable()
    	.For("#sortable-basic")
    	.Filter(".sortable")
	)
```
{% if site.core %}
```TagHelper
    <kendo-sortable name="sortable-basic" filter=".sortable">
    </kendo-sortable>
```
{% endif %}

## Dragging Items within Containers

By default, the Sortable uses the mouse cursor to determine the place of the drop placeholder. This means that if the mouse cursor is not over a sortable item, the placeholder will not be re-positioned.

If the axis is set to `"x"` or `"y"`, the Sortable will start operating in an axis movement mode and will use only the `x` or `y` coordinate of the mouse cursor to determine the position of the placeholder. The axis mode is useful when dragging is restricted in a container.

## Dragging Items between Lists

To enable the dragging of items between two lists, create a Sortable for each list and use the `ConnectWith` configuration in both Sortable components.

```HtmlHelper
    @(Html.Kendo().Sortable()
        .For("#sortable-listA")
        .ConnectWith("#sortable-listB")
        .PlaceholderHandler("placeholder")
    )

    @(Html.Kendo().Sortable()
        .For("#sortable-listB")
        .ConnectWith("#sortable-listA")
        .PlaceholderHandler("placeholder")
    )

    <script>
        function placeholder(element) {
            return $("<li class='list-item' id='placeholder'>Drop Here!</li>");
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-sortable name="sortable-listA" connect-with="#sortable-listB" placeholder="placeholder" >
    </kendo-sortable>

    <kendo-sortable name="sortable-listB" connect-with="#sortable-listA" placeholder="placeholder" >
    </kendo-sortable>

    <script>
        function placeholder(element) {
            return $("<li class='list-item' id='placeholder'>Drop Here!</li>");
        }
    </script>
```
{% endif %}

## See Also

* [Disabling and Filtering Items in the Sortable HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sortable/filter-disable)
* [Dragging Items within Containers by the Sortable HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sortable/sortable-panels)
* [Dragging Items between Lists in the Sortable HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sortable/linkedlists)
* [Server-Side API](/api/sortable)
