---
title: Auto-Resizing to Window
page_title: Auto-Resizing to Window
description: "Learn how to auto-resize the Splitter to fit to the Window component by using the Telerik UI Splitter HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_add_auto_resizing_splitter_to_window_aspnetcore
position: 2
---

# Auto-Resizing to Window

You can add a Splitter that resizes automatically along with the Kendo UI for jQuery Window widget.

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

## See Also

* [Server-Side API](/api/splitter)
