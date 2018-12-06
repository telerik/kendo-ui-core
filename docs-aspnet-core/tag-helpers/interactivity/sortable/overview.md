---
title: Overview
page_title: Sortable | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Sortable tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_sortable_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/sortable
position: 1
---

# Sortable Tag Helper Overview

The Sortable tag helper helps you configure the Kendo UI Sortable widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Sortable by using the Sortable tag helper.

###### Example

    <kendo-sortable name="sortable-basic"></kendo-sortable>

## Configuration

The Sortable tag helper configuration options are passed as attributes of the tag.

> **Important**
>
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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
