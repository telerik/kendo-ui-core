---
title: Overview
page_title: Window | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Window HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/window
slug: htmlhelpers_window_aspnetcore
position: 1
---

# Window HtmlHelper Overview

The Window HtmlHelper extension is a server-side wrapper for the [Kendo UI Window](http://demos.telerik.com/kendo-ui/window/index) widget.

It enables you to configure the Window from server-side code. The [Window](http://docs.telerik.com/kendo-ui/controls/layout/window/overview) displays content in a modal or non-modal HTML window. By default, the user can move, resize, and close a Window. Its content can also be defined either as static HTML or dynamically loaded through AJAX.

For more information on the HtmlHelper, refer to the article on the [Window HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/window/overview).

## Basic Usage

The following example demonstrates how to define the Window by using the Window HtmlHelper.

```Razor
 @(Html.Kendo().Window()
    .Name("window")
    .Title("Window title")
    .Content(@<text>
            Static content of the Window.
    </text>)
)
```
```Controller
    public class WindowController  : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```

## Configuration

The Window provides default configuration options that can be set during initialization. Some of the options include:

* [Minimum and maximum height and width during resizing]({% slug htmlhelpers_window_dimensions_aspnetcore %}).
* Available user actions&mdash;close, refresh, maximize, minimize, or pin&mdash;and the option to define custom ones.
* Title.
* [Draggable]({% slug htmlhelpers_window_constrain_aspnetcore %}) and resizable behaviors.
* Initial position in pixels with regard to the page top-left corner.
* Pinned state&mdash;whether the Window moves together with the rest of the page content during scrolling.

The following example demonstrates the basic configuration of the Window HtmlHelper and how to get the Window instance.

###### Example

    @(Html.Kendo().Window()
        .Name("window")
        .Width(500)
        .Height(300)
        .Title("Window title")
        .Visible(true)
        .Actions(actions => actions.Refresh().Minimize().Maximize().Close())
        .LoadContentFrom("AjaxContent", "Window")
        .Draggable(false)
        .Resizable(false)
    )

    <script type="text/javascript">
        $(function() {
            //Notice that the Name() of the Window is used to get its client-side instance.
            var dialog = $("#window").data("kendoWindow");
        });
    </script>

## Functionality and Features

* [Dimensions]({% slug htmlhelpers_window_dimensions_aspnetcore %})
* [Positioning]({% slug htmlhelpers_window_positioning_aspnetcore %})
* [Constraining the position]({% slug htmlhelpers_window_constrain_aspnetcore %})
* [Loading content]({% slug htmlhelpers_window_loadingcontent_aspnetcore %})
* [Using iframe]({% slug htmlhelpers_window_iframe_aspnetcore %})
* [Integration with forms]({% slug htmlhelpers_window_forms_aspnetcore %})

## Event Handling

You can subscribe to all Window [events](/api/Kendo.Mvc.UI.Fluent/WindowEventBuilder).

### By Handler Name

The following example demonstrates how to subscribe to events by handler name.

###### Example

    @(Html.Kendo().Window()
        .Name("window")
        .Events(e => e
            .Open("window_open")
            .Close("window_close")
        )
    )
    <script>
        function window_open() {
            //Handle the open event.
        }

        function window_close() {
            //Handle the close event.
        }
    </script>


### By Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

###### Example

    @(Html.Kendo().Window()
        .Name("window")
        .Events(e => e
            .Open(@<text>
                function() {
                    //Handle the open event inline.
                }
            </text>)
            .Close(@<text>
                function() {
                    //Handle the close event inline.
                }
            </text>)
        )
    )

## See Also

* [JavaScript API Reference of the Window](http://docs.telerik.com/kendo-ui/api/javascript/ui/window)
* [Window HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/window/overview)
* [Window Official Demos](http://demos.telerik.com/aspnet-mvc/window/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
