---
title: Overview
page_title: Tooltip | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Tooltip tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/tooltip, /aspnet-core/helpers/tag-helpers/tooltip
slug: taghelpers_tooltip_aspnetcore
position: 1
---

# Tooltip Tag Helper Overview

The Tooltip tag helper helps you configure the Kendo UI Tooltip widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Tooltip by using the Tooltip tag helper.

###### Example

        <kendo-tooltip name="agglomerations" filter="span"></kendo-tooltip>

## Configuration

The Tooltip tag helper configuration options are passed as attributes of the tag and through nested tags.

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
