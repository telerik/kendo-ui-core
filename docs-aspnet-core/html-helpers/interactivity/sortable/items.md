---
title: Items
page_title: Items | Telerik UI Sortable for ASP.NET Core
description: "Disable and filter the items of the Telerik UI Sortable widget for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
position: 3
---

# Items

The Sortable provides options for controlling the behavior of its items.

## Disabling Items

To make items non-sortable, disable them by providing a selector that matches these items. As a result, the user will not be able to drag the disabled, non-sortable items and change their position. However, they will still be valid sort targets.

```
	@(Html.Kendo().Sortable()
    	.For("#sortable-basic")
    	.Disable(".disable")
	)
```

## Filtering Items

To prevent items both from being dragged and being sort targets, specify a filter.

```
	@(Html.Kendo().Sortable()
    	.For("#sortable-basic")
    	.Filter(".sortable")
	)
```

## Dragging Items between Lists

To enable the dragging of items between two lists, create a Sortable for each list and use the `ConnectWith` configuration in both Sortable components.

```
    @(Html.Kendo().Sortable()
        .For("#sortable-listA")
        .ConnectWith("#sortable-listB")
        .PlaceholderHandler("placeholder")
    )

    @(Html.Kendo().Sortable()
        .For("#sortable-listB")
        .ConnectWith("#sortable-listB")
        .PlaceholderHandler("placeholder")
    )

    <script>
        function placeholder(element) {
            return $("<li class='list-item' id='placeholder'>Drop Here!</li>");
        }
    </script>
```

## See Also

* [Disabling and Filtering Items in the Sortable HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/sortable/filter-disable)
* [Dragging Items between Lists in the Sortable HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/sortable/linkedlists)
* [Server-Side API](/api/sortable)
