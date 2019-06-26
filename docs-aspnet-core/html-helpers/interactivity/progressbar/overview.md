---
title: Overview
page_title: ProgressBar Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI ProgressBar HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/progressbar
slug: htmlhelpers_progressbar_aspnetcore
position: 1
---

# ProgressBar HtmlHelper Overview

The [ProgressBar](http://docs.telerik.com/kendo-ui/controls/interactivity/progressbar/overview) offers rich functionalities for displaying and tracking the progress of a task.

It supports multiple types, horizontal and vertical orientation, and also different directions.

The ProgressBar HtmlHelper extension is a server-side wrapper for the [Kendo UI ProgressBar](http://demos.telerik.com/kendo-ui/progressbar/index) widget. For more information on the ProgressBar HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](http://docs.telerik.com/aspnet-mvc/helpers/progressbar/overview).

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

```
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
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the ProgressBar is used to get its client-side instance.
            var progressbar = $("#progressbar").data("kendoProgressBar");
            console.log(progressbar);
        });
    </script>
```

## Events

For a complete example on basic ProgressBar events, refer to the [demo on using the events of the ProgressBar](https://demos.telerik.com/aspnet-core/progressbar/events).

## See Also

* [Basic Usage of the ProgressBar HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/progressbar/index)
* [JavaScript API Reference of the ProgressBar](http://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar)
