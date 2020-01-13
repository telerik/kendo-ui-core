---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Tooltip TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/tooltip, /helpers/tag-helpers/tooltip
slug: taghelpers_tooltip_aspnetcore
position: 1
---

# Tooltip TagHelper Overview

The Telerik UI Tooltip TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Tooltip widget.

The Tooltip displays a popup hint for a given html element. Its content can be defined either as static text or loaded dynamically with AJAX.

* [Demo page for the Tooltip](https://demos.telerik.com/aspnet-core/tooltip/index)

## Initializing the Tooltip

The following example demonstrates how to define the Tooltip by using the Tooltip TagHelper.

        <kendo-tooltip name="agglomerations" filter="span"></kendo-tooltip>

## Basic Configuration

The Tooltip TagHelper configuration options are passed as attributes of the tag and through nested tags.

```cshtml

        @(Html.Kendo().Tooltip()
			.For("#agglomerations")
			.Filter("span")
			.Position(TooltipPosition.Top)
			.Width(120)
			.Animation(a => a.Open(e => e.Fade(FadeDirection.In).Duration(300)))
		)
```
```tagHelper

        <kendo-tooltip name="agglomerations" filter="span" position="top" width="120">
			<popup-animation>
				<open effects="fade:in" duration="300" />
			</popup-animation>
		</kendo-tooltip>
```

## See Also

* [Basic Usage of the Tooltip TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/tooltip/index)
* [Server-Side API](/api/tooltip)
