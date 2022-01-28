---
title: Auto-Resizing the Height
page_title: Auto-Resizing the Height
description: "Learn how to make the Splitter expand vertically and resize together with the browser window by using Telerik UI Splitter HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_expand_splitter_to_100_height_aspnetcore
position: 4
---

# Auto-Resizing the Height

The Splitter enables you to expand it vertically and resize it together with the browser window.

Web standards require that elements with percentage height have a parent element with an explicit height. The rule applies recursively until an element with a pixel height is reached, or until the `<html>` element is reached. If the requirement is not met, the computed height of the Splitter falls back to `auto` and the widget collapses, depending on its content.

You also have to remove the border of the Splitter. Elements that are 100% high cannot have borders, margins, paddings, and sibling elements. In a nested-Splitter scenario, if each Splitter is a direct child of a parent pane, the inner Splitters remove their borders automatically.

## Resizing to 100% Height Automatically

In the following example, the outer Splitter has no siblings and has a 100% height style applied. Its parent is the `<body>` element and it receives a `height:100%` style which, in turn, requires the `<html>` element to obtain the same style.

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


## Resizing to Calculated Heights Manually

If the dimensions of the Splitter do not depend directly on the browser viewport size or if the Splitter has visible siblings, using a 100% height for it may not be applicable. In this case, you need to set the height of the Splitter [Kendo UI for jQuery `wrapper`](https://docs.telerik.com/kendo-ui/intro/widget-basics/wrapper-element) `<div>` manually and then call the `resize` method.

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

## See Also

* [Server-Side API](/api/splitter)
