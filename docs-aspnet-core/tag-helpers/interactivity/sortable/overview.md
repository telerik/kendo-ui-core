---
title: Overview
page_title: Sortable Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Sortable tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_sortable_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/sortable
position: 1
---

# Sortable Tag Helper Overview

The Sortable provides a sortable drag-and-drop functionality to elements within a list.

The Sortable tag helper extension is a server-side wrapper for the [Kendo UI Sortable](https://demos.telerik.com/kendo-ui/sortable/index) widget and enables you to configure the Kendo UI Sortable widget in ASP.NET Core applications.

## Initializing the Sortable

The following example demonstrates how to define the Sortable by using the Sortable tag helper.

    <kendo-sortable name="sortable-basic"></kendo-sortable>

## Basic Configuration

The Sortable tag helper configuration options are passed as attributes of the tag.

> Initialize the Sortable for already existing DOM elements.

```html
<ul id="sortable-basic">
    <li class="sortable">Papercut <span>3:04</span></li>
    <li class="sortable">One Step Closer <span>2:35</span></li>
    <li class="sortable">With You <span>3:23</span></li>
</ul>
```
```tagHelper
<kendo-sortable name="sortable-basic" hint="hint"  placeholder="placeholder">
</kendo-sortable>
```
```cshtml
@(Html.Kendo().Sortable()
    .For("#sortable-basic")
    .HintHandler("hint")
    .PlaceholderHandler("placeholder")
)
```

## See Also

* [Basic Usage of the Sortable Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/sortable/tag-helper)
* [JavaScript API Reference of the Sortable](http://docs.telerik.com/kendo-ui/api/javascript/ui/sortable)
