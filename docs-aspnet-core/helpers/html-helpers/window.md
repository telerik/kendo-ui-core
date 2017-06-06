---
title: Window
page_title: Window | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Window HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_window_aspnetcore
---

# Window HtmlHelper Overview

The Window HtmlHelper extension is a server-side wrapper for the [Kendo UI Window](http://demos.telerik.com/kendo-ui/window/index) widget.

It enables you to configure the Window from server-side code. The [Window](http://docs.telerik.com/kendo-ui/controls/layout/window/overview) displays content in a modal or non-modal HTML window. By default, the user can move, resize, and close a Window. Its content can also be defined either as static HTML or dynamically loaded through AJAX.

For more information on the HtmlHelper, refer to the article on the [Window HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/window/overview).

## Basic Usage

The following example demonstrates how to define the Window by using the Window HtmlHelper.

###### Example

```tab-Razor
 @(Html.Kendo().Window()
    .Name("window")
    .Title("Window title")
    .Content(@<text>
            Static content of the Window.
    </text>)
)
```
```tab-Controller
    public class WindowController  : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the Window HtmlHelper and how to get the Window instance.

###### Example

```tab-Razor

@(Html.Kendo().Window()
        .Name("window")
        .Width(630)
        .Height(300)
        .Title("Window title")
        .Actions(actions => actions.Refresh().Minimize().Maximize().Close())
        .LoadContentFrom("ajaxcontent1", "window")
        .Draggable()
		.Resizable()
        .Events(events => events
            .Open("onOpen")
            .Activate("onActivate")
            .Close("onClose")
            .Refresh("onRefresh")
            .Resize("onResize")
            .DragStart("onDragStart")
            .DragEnd("onDragEnd")
            .Deactivate("onDeactivate")
            .Minimize("onMinimize")
            .Maximize("onMaximize")
        )
)

<script type="text/javascript">
    $(function() {
        //Notice that the Name() of the Window is used to get its client-side instance.
        var dialog = $("#window").data("kendoWindow");
    });
</script>
```

## See Also

* [JavaScript API Reference of the Window](http://docs.telerik.com/kendo-ui/api/javascript/ui/window)
* [Window HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/window/overview)
* [Window Official Demos](http://demos.telerik.com/aspnet-mvc/window/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
