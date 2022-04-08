---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Window component for {{ site.framework }}."
previous_url: /helpers/html-helpers/window, /helpers/layout/window/overview
slug: htmlhelpers_window_aspnetcore
position: 1
---

# Window Overview

{% if site.core %}
The Telerik UI Window TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Window widget.
{% else %}
The Telerik UI Window HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Window widget.
{% endif %}

The Window displays content in a modal or non-modal HTML window. By default, the user can move, resize, and close a Window. Its content can also be defined either as static HTML or dynamically loaded with AJAX.

* [Demo page for the Window HtmlHelper](https://demos.telerik.com/{{ site.platform }}/window/index)
{% if site.core %}
* [Demo page for the Window TagHelper](https://demos.telerik.com/aspnet-core/window/tag-helper)
{% endif %}

## Initializing the Window

The following example demonstrates how to define the Window.

```HtmlHelper
    @(Html.Kendo().Window()
        .Name("window")
        .Title("Window title")
        .Content(@<text>
                Static content of the Window.
        </text>)
    )
```
{% if site.core %}
```TagHelper
    <kendo-window name="window" title="Window title">
        <content>Static content of the Window.</content>
    </kendo-window>
```
{% endif %}
```Controller
    public class WindowController  : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```

## Basic Configuration

The Window provides default configuration options that can be set during initialization such as height and width, user actions, draggable behavior, initial position, and so on.

The following example demonstrates the basic configuration of the Window.

```HtmlHelper
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
            // The Name() of the Window is used to get its client-side instance.
            var dialog = $("#window").data("kendoWindow");
        });
    </script>
```
{% if site.core %}
```TagHelper
    @{
        string[] actions = new string[] { "Refresh", "Minimize", "Maximize", "Close" };
    }

    <kendo-window name="window" 
                  title="Window title" 
                  width="500"
                  height="300"
                  visible="true"
                  actions="actions"
                  content-url="@Url.Action("AjaxContent","Window")"
                  draggable="false"
                  resizable="false">
    </kendo-window>

     <script type="text/javascript">
        $(function() {
            // The Name() of the Window is used to get its client-side instance.
            var dialog = $("#window").data("kendoWindow");
        });
    </script>
```
{% endif %}

## Functionality and Features

* [Dimensions]({% slug htmlhelpers_window_dimensions_aspnetcore %})
* [Positioning]({% slug htmlhelpers_window_positioning_aspnetcore %})
* [Constraining the position]({% slug htmlhelpers_window_constrain_aspnetcore %})
* [Loading content]({% slug htmlhelpers_window_loadingcontent_aspnetcore %})
* [Using iframe]({% slug htmlhelpers_window_iframe_aspnetcore %})
* [Integration with forms]({% slug htmlhelpers_window_forms_aspnetcore %})

## Events

You can subscribe to all Window [events](/api/Kendo.Mvc.UI.Fluent/WindowEventBuilder). For a complete example on basic Window events, refer to the [demo on using the events of the Window](https://demos.telerik.com/{{ site.platform }}/window/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by handler name.

```HtmlHelper
    @(Html.Kendo().Window()
        .Name("window")
        .Events(e => e
            .Open("window_open")
            .Close("window_close")
        )
    )
    <script>
        function window_open() {
            // Handle the open event.
        }

        function window_close() {
            // Handle the close event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-window name="window" on-open="window_open" on-close="window_close"></kendo-window>
    <script>
        function window_open() {
            // Handle the open event.
        }

        function window_close() {
            // Handle the close event.
        }
    </script>
```
{% endif %}

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

```HtmlHelper
    @(Html.Kendo().Window()
        .Name("window")
        .Events(e => e
            .Open(@<text>
                function() {
                    // Handle the open event inline.
                }
            </text>)
            .Close(@<text>
                function() {
                    // Handle the close event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-window name="window"
     on-open="function() {
        //Handle the open event inline.
    }"
     on-close="function() {
       //Handle the open event inline.
    }">
    </kendo-window>
```
{% endif %}

## See Also

* [Basic Usage of the Window HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/window/index)
{% if site.core %}
* [Basic Usage of the Window TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/window/tag-helper)
{% endif %}
* [Using the API of the Window HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/window/api)
* [Server-Side API](/api/window)
