---
title: Overview
page_title: Overview
description: "The Telerik UI Window component for {{ site.framework }} enables users to select multiple items, supports local and remote data binding, and provides templates for easier customization."
previous_url: /helpers/html-helpers/window, /helpers/layout/window/overview
slug: htmlhelpers_window_aspnetcore
position: 0
---

# {{ site.framework }} Window Overview

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
        .Resizable(resizable => resizable.Enabled(false))
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

| Feature | Description |
|---------|-------------|
| [Dimensions]({% slug htmlhelpers_window_dimensions_aspnetcore %}) |The Window supports setting different dimensions.|
| [Positioning]({% slug htmlhelpers_window_positioning_aspnetcore %}) |It is possible to predefine the position of the Window.|
| [Constraining the position]({% slug htmlhelpers_window_constrain_aspnetcore %}) |The draggable area can be restricted.|
| [Loading content]({% slug htmlhelpers_window_loadingcontent_aspnetcore %}) |The MultiSelect offers dynamic content loading.|
| [Using iframe]({% slug htmlhelpers_window_iframe_aspnetcore %}) | You can configure the Window to display its content in an iframe.|
| [Integration with forms]({% slug htmlhelpers_window_forms_aspnetcore %}) |The Window has a built-in integration with the Form component.|
| [Custom actions]({% slug htmlhelpers_window_customactions_aspnetcore %}) |One of the powerful capabilities of the Window is customizing its actions.|
| [Animations]({% slug htmlhelpers_window_animations_aspnetcore %}) |The Window provides rich animation configuration.|
| [Accessibility]({% slug accessibility_aspnetcore_window %}) |The Window is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.|

## Next Steps

* [Getting Started with the Window]({% slug aspnetcore_window_getting_started %})
* [Basic Usage of the Window HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/window/index)
{% if site.core %}
* [Basic Usage of the Window TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/window/tag-helper)
{% endif %}

## See Also

* [Using the API of the Window for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/window/api)
* [Knowledge Base Section](/knowledge-base)

