---
title: Add Auto-Resizing Splitter to Window
page_title: Splitter | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to auto-resize Kendo UI Splitter to fit to Window component using the Kendo UI Splitter HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_add_auto_resizing_splitter_to_window_aspnetcore
position: 2
---

# Add Auto-Resizing Splitter to Window

The example below demonstrates how to add a Splitter that resizes automatically along with the Kendo UI Window widget.

```Razor
    @(Html.Kendo().Window()
                    .Name("win")
                    .Title("Kendo UI Window")
                    .Modal(true)
                    .Width(400)
                    .Height(250)
                    .Draggable(true)
        
    )

<script id="template" type="text/x-kendo-template">
    @(Html.Kendo().Splitter()
                    .Name("vertical")
                    .Orientation(SplitterOrientation.Horizontal)
                    .Panes(verticalPane =>
                    {
                        verticalPane.Add().Collapsible(true).Content("left pane <br /><br /> Please resize the Window and watch the Splitter resize automatically.");
                        verticalPane.Add().Collapsible(true).Content("right pane");
                    })
                    .ToClientTemplate()
    )
</script>

<script>
    $(function () {
        var template = kendo.template($("#template").html());
        $("#win").append(template({}));
        $("#win").data("kendoWindow").center();
    })
</script>

<style>
    html {
        font: 12px sans-serif;
    }

    #splitter {
        border-width: 0;
        height: 100%;
    }

    #win {
        padding: 0;
        overflow: hidden;
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
