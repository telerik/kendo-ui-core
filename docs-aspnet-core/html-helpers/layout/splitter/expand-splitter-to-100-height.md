---
title: Expand to 100% Height and Auto-Resize
page_title: Splitter | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to make the Kendo UI Splitter expand vertically and resize together with the browser window using Kendo UI Splitter HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_expand_splitter_to_100_height_aspnetcore
position: 3
---

# Expand to 100% Height and Auto-Resize

This article demonstrates how to make the Kendo UI Splitter expand vertically and resize together with the browser window, and also explains what the standard requirements in such scenarios are.

Web standards require that elements with percentage height have a parent element with an explicit height. The rule applies recursively until an element with a pixel height is reached, or until the `<html>` element is reached. If the requirement is not met, the computed height of the Splitter falls back to `auto` and the widget collapses, depending on its content.

Also, make sure you remove the border of the Splitter. Elements that are 100% high cannot have borders, margins, paddings, and sibling elements.

In a nested-Splitter scenario, the inner Splitters remove their borders automatically, given that each Splitter is a direct child of a parent pane.

## Automatic Resizing to 100% Height

In the first example below, the outer Splitter has no siblings and has a 100% height style applies. Its parent is the `<body>` element, so it receives a `height:100%` style. This in turn requires the `<html>` element to obtain the same style.

```Razor
@(Html.Kendo().Splitter()
                .Name("splitter")
                .Orientation(SplitterOrientation.Vertical)
                .Panes(verticalPane => {
                    verticalPane.Add().Collapsible(true).Size("60px").Content("Outer splitter : top pane (resizable and collapsible)");
                    verticalPane.Add().Collapsible(false)
                                      .Content(Html.Kendo().Splitter()
                                                        .Name("horizontal")
                                                        .Orientation(SplitterOrientation.Horizontal)
                                                        .Panes(horizontalPanes => {
                                                            horizontalPanes.Add().Collapsible(true).Size("100px").Content("Inner splitter :: left pane");
                                                            horizontalPanes.Add().Collapsible(false).Content("Inner splitter :: center pane"); ;
                                                            horizontalPanes.Add().Collapsible(false).Resizable(true).Size("15%").Content("Inner splitter :: right pane");
                                                        }).ToHtmlString()
                                                       );
                    verticalPane.Add().Collapsible(false).Resizable(false).Size("15%").Content("Outer splitter : bottom pane (non-resizable, non-collapsible)");
                })
    )

<style>
    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    #vertical,
    #horizontal {
        height: 100%;
    }

    #vertical {
        border-width: 0;
    }
</style>
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


## Manual Resizing to Calculated Heights

If the dimensions of the Splitter do not depend directly on the browser viewport size, or if the Splitter has visible siblings, using a 100% height for it may not be applicable. In this case you will need to set the height of the Splitter [wrapper](https://docs.telerik.com/kendo-ui/intro/widget-basics/wrapper-element) `<div>` manually and then call the widget's [`resize`](https://docs.telerik.com/kendo-ui/controls/layout/splitter/overview#resizing-a-splitter-manually) method.

The example below demonstrates a Kendo UI Splitter with a calculated height.

```Razor
<div id="header">Page header</div>
@(Html.Kendo().Splitter()
                .Name("vertical")
                .Orientation(SplitterOrientation.Vertical)
                .Panes(verticalPane =>
                {
                    verticalPane.Add().Collapsible(true).Size("60px").Content("Outer splitter : top pane (resizable and collapsible)");
                    verticalPane.Add().Collapsible(false)
                                        .Content(Html.Kendo().Splitter()
                                                        .Name("horizontal")
                                                        .Orientation(SplitterOrientation.Horizontal)
                                                        .Panes(horizontalPanes =>
                                                        {
                                                            horizontalPanes.Add().Collapsible(true).Size("100px").Content("Inner splitter :: left pane");
                                                            horizontalPanes.Add().Collapsible(false).Content("Inner splitter :: center pane"); ;
                                                            horizontalPanes.Add().Collapsible(false).Resizable(true).Size("15%").Content("Inner splitter :: right pane");
                                                        }).ToHtmlString()
                                                        );
                    verticalPane.Add().Collapsible(false).Resizable(false).Size("15%").Content("Outer splitter : bottom pane (non-resizable, non-collapsible)");
                })
)

<div id="footer">Page footer</div>

<script>
    $(document).ready(function () {
        var outerSplitter = $("#vertical").data("kendoSplitter");
        var browserWindow = $(window);
        var headerFooterHeight = $("#header").height() + $("#footer").height();

        function resizeSplitter() {
            outerSplitter.wrapper.height(browserWindow.height() - headerFooterHeight);
            outerSplitter.resize();
        }

        resizeSplitter();
        browserWindow.resize(resizeSplitter);
    })
</script>

<style>
    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    #horizontal {
        height: 100%;
    }

    #vertical {
        border-width: 0;
    }

    #header,
    #footer {
        height: 50px;
        background: #fed;
    }
</style>
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
