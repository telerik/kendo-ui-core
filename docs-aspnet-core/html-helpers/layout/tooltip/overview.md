---
title: Overview
page_title: Tooltip | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Tooltip HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/tooltip
slug: htmlhelpers_tooltip_aspnetcore
position: 1
---

# Tooltip HtmlHelper Overview

The Tooltip HtmlHelper extension is a server-side wrapper for the [Kendo UI Tooltip](http://demos.telerik.com/kendo-ui/tooltip/index) widget.

It allows you to configure the Kendo UI Tooltip widget from server-side code. The [Tooltip](http://docs.telerik.com/kendo-ui/controls/layout/tooltip/overview) displays a popup hint for a given html element. Its content can be defined either as static text, or loaded dynamically via AJAX.

For more information on the HtmlHelper, refer to the article on the [Tooltip HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/tooltip/overview).

## Basic Usage

The following example demonstrates how to define the Tooltip by using the Tooltip HtmlHelper.

###### Example

```
   <span id="tooltip" class="k-button wider">Hover me!</span>

    @(Html.Kendo().Tooltip()
        .For("#tooltip")
        .Position(TooltipPosition.Top)
        .Content("Hello!")
    )
```

## Configuration

The following example demonstrates the basic configuration of the Tooltip HtmlHelper and how to get the Tooltip instance.

```
    <span id="tooltip" class="k-button wider">
      <а href="#">Hover me</a>
    </span>

    @(Html.Kendo().Tooltip()
        .For("#tooltip")
        .Position(TooltipPosition.Top)
        .Content("Hello!")
        .Width(120)
        .AutoHide(false)
        .Filter("a")
        .Events(events => events.Hide("onHide").Show("onShow"))
    )

    <script type="text/javascript">
        $(function () {
            //Notice that the Name() of the Tooltip is used to get its client-side instance.
            var tooltip = $("#tooltip").data("kendoTooltip");
            console.log(tooltip);
        });
    </script>

```

## See Also

* [JavaScript API Reference of the Tooltip](http://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip)
* [Tooltip HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/tooltip/overview)
* [Tooltip Official Demos](http://demos.telerik.com/aspnet-core/tooltip/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
