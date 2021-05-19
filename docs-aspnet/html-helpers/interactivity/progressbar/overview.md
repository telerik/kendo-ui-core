---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ProgressBar HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/progressbar, /helpers/interactivity/progressbar/overview
slug: htmlhelpers_progressbar_aspnetcore
position: 1
---

# ProgressBar HtmlHelper Overview

The Telerik UI ProgressBar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ProgressBar widget.

The ProgressBar delivers rich functionality for displaying and tracking the progress of a task. It supports multiple types, horizontal and vertical orientation, reversed direction, minimum and maximum values, and animation duration. 

* [Demo page for the ProgressBar](https://demos.telerik.com/{{ site.platform }}/progressbar/index)

## Initializing the ProgressBar

The following example demonstrates how to define the ProgressBar by using the ProgressBar HtmlHelper.

```
    @(Html.Kendo().ProgressBar()
        .Name("progressbar")
        .Type(ProgressBarType.Percent)
        .Animation(a => a.Duration(600))
    )

    <script type="text-javascript">
        $(document).ready(function () {
            $("#progressbar").data("kendoProgressBar").value(50);
        });   
    </script>
```

## Basic Configuration

The following example demonstrates the basic configuration of the ProgressBar HtmlHelper.

```Razor
    @(Html.Kendo().ProgressBar()
        .Name("progressBar")
        .Type(ProgressBarType.Chunk)
        .ChunkCount(4)
        .Min(0)
        .Max(4)
        .Value(2)
        .ShowStatus(true)
        .Orientation(ProgressBarOrientation.Vertical)
        .Events(e =>
        {
            e.Change("onChange");
            e.Complete("onComplete");
        })
        .Animation(а =>
        {
            а.Duration(500);
        })
    )
```

## Events

You can subscribe to all ProgressBar events. For a complete example on basic ProgressBar events, refer to the [demo on using the events of the ProgressBar](https://demos.telerik.com/{{ site.platform }}/progressbar/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```Razor
    @(Html.Kendo().ProgressBar()
            .Name("progressBar")
            .Events(e => {
                    e.Change("onChange");
                    e.Complete("onComplete");
            })
    )
    <script>
        function onChange(e) {
            // Handle the change event.
        }

        function onComplete(e) {
            // Handle the complete event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```Razor
    @(Html.Kendo().ProgressBar()
        .Name("progressBar")
        .Events(e => e.Change(@<text>
                function() {
                    // Handle the change event.
                }
            </text>)
        )
    )
```

## Referencing Existing Instances

The following example demonstrates how to get a reference to an existing Telerik UI ProgressBar instance. Once the reference is established, use the [ProgressBar client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar#methods) to control its behavior.

```Razor
    @(Html.Kendo().ProgressBar()
        .Name("progressBar")
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the ProgressBar is used to get its client-side instance.
            var progressbar = $("#progressbar").data("kendoProgressBar");
            console.log(progressbar);
        });
    </script>
```

## See Also

* [Basic Usage of the ProgressBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/progressbar/index)
* [Server-Side API](/api/progressbar)
