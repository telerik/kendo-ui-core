---
title: Auto-Resizing to Window
page_title: Auto-Resizing to Window
description: "Learn how to auto-resize the Splitter to fit to the Window component by using the Telerik UI Splitter component for {{ site.framework }}."
slug: htmlhelpers_add_auto_resizing_splitter_to_window_aspnetcore
position: 2
---

# Auto-Resizing to Window

You can add a Splitter that resizes automatically along with the Kendo UI for jQuery Window widget.

```HtmlHelper

    @(Html.Kendo().Window()
        .Name("window")
        .Title("Telerik UI Window")
        .Resizable()
        .Modal(true)
        .Width(400)
        .Height(250)
        .Draggable(true)
    )

    <script id="template" type="text/x-kendo-template">
        @(Html.Kendo().Splitter()
            .Name("splitter")
            .Orientation(SplitterOrientation.Horizontal)
            .Panes(verticalPane =>
            {
                verticalPane.Add().Collapsible(true).Content("left pane <br /><br /> Please resize the Window and watch     the Splitter resize automatically.");
                verticalPane.Add().Collapsible(true).Content("right pane");
            })
            .ToClientTemplate()
        )
    </script>

    <script>
        $(function () {
            var template = kendo.template($("#template").html());
            $("#window").append(template({}));
            $("#window").data("kendoWindow").center();
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

        #window {
            padding: 0;
            overflow: hidden;
        }
    </style>
```    
{% if site.core %}
```TagHelper
    <kendo-window name="window" 
                  title="Telerik UI Window"
                  resizable="true"
                  modal="true"
                  width="400"
                  height="250"
                  draggable="true">
    </kendo-window>

    <script id="template" type="text/html">
        <kendo-splitter name="splitter" 
                        orientation="SplitterOrientation.Horizontal" 
                        is-in-client-template="true">
            <pane collapsible="true">
                left pane <br /><br /> Please resize the Window and watch  the Splitter resize automatically.
            </pane>
            <pane collapsible="true">
                right pane
            </pane>
        </kendo-splitter>
    </script>

    <script>
        $(function () {
            var template = kendo.template($("#template").html());
            $("#window").append(template({}));
            $("#window").data("kendoWindow").center();
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

        #window {
            padding: 0;
            overflow: hidden;
        }
    </style>
```
{% endif %}
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
