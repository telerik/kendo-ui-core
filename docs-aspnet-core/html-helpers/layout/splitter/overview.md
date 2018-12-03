---
title: Overview
page_title: Splitter | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Splitter HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/splitter
slug: htmlhelpers_splitter_aspnetcore
position: 1
---

# Splitter HtmlHelper Overview

The Splitter HtmlHelper extension is a server-side wrapper for the [Kendo UI Splitter](http://demos.telerik.com/kendo-ui/splitter/index) widget.

It allows you to configure the Kendo UI Splitter widget from server-side code. The [Splitter](http://docs.telerik.com/kendo-ui/controls/layout/splitter/overview) provides a dynamic layout of resizable and collapsible panes. It converts the children of an HTML element into an interactive layout by adding resize and collapse handles depending on its configuration. The vertical and horizontal orientation of a Kendo UI Splitter can be combined to build complex layouts.

For more information on the HtmlHelper, refer to the article on the [Splitter HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/splitter/overview).

## Basic Usage

The following example demonstrates how to define the Splitter by using the Splitter HtmlHelper.

```Razor
    @(Html.Kendo().Splitter()
        .Name("splitter")
        .Orientation(SplitterOrientation.Vertical)
        .Panes(verticalPanes =>
        {
            verticalPanes.Add()
                .Content(
                    Html.Kendo().Splitter()
                        .Name("horizontal")
                        .Panes(horizontalPanes =>
                        {
                            horizontalPanes.Add()
                                .HtmlAttributes(new { id = "left-pane" })
                                .Size("220px")
                                .Content(@<div class="pane-content">
                                    <h3>Inner splitter / left pane</h3>
                                </div>);

                            horizontalPanes.Add()
                                .HtmlAttributes(new { id = "center-pane" })
                                .Content(@<div class="pane-content">
                                    <h3>Inner splitter / center pane</h3>
                                </div>);

                            horizontalPanes.Add()
                                .HtmlAttributes(new { id = "right-pane" })
                                .Collapsible(true)
                                .Size("220px")
                                .Content(@<div class="pane-content">
                                    <h3>Inner splitter / right pane</h3>
                                </div>);
                        }).ToHtmlString()
                );

            verticalPanes.Add()
                .Size("100px")
                .Collapsible(false)
                .Content(@<div class="pane-content">
                    <h3>Outer splitter / middle pane</h3>
                </div>);

            verticalPanes.Add()
                .Size("100px")
                .Content(@<div class="pane-content">
                    <h3>Outer splitter / bottom pane</h3>
                </div>);
        })
    )
```
```Controller
    public class SplitterController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the Splitter HtmlHelper and how to get the Splitter instance.

```
    @(Html.Kendo().Splitter()
        .Name("splitter")
        .HtmlAttributes(new { style = "height: 400px;" })
        .Orientation(SplitterOrientation.Vertical)
        .Events(events => events
            .Collapse("collapse")
            .Resize("resize")
            .Expand("expand")
            .ContentLoad("contentLoad")
        )
        .Panes(panes =>
        {
            panes.Add()
                .HtmlAttributes(new { id = "top_pane" })
                .Size("100px")
                .Collapsible(true)
                .Scrollable(false)
                .Content(@<p>
                    Top pane
                </p>);

            panes.Add()
                .HtmlAttributes(new { id = "middle_pane" })
                .Content(@<div class="pane-content">
                    <h3>Middle pane</h3>
                </div>);

            panes.Add()
                .HtmlAttributes(new { id = "bottom_pane" })
                .Collapsible(true)
                .Scrollable(true)
                .Size("20%")
                .Content(@<p>
                    Bottom pane
                </p>);
        })
    )

    <script type="text/javascript">
        $(function () {
            //Notice that the Name() of the Splitter is used to get its client-side instance.
            var splitter = $("#splitter").data("kendoSplitter");
            console.log(splitter);
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Splitter](http://docs.telerik.com/kendo-ui/api/javascript/ui/splitter)
* [Splitter HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/splitter/overview)
* [Splitter Official Demos](http://demos.telerik.com/aspnet-core/splitter/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
