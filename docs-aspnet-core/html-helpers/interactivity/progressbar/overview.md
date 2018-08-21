---
title: Overview
page_title: ProgressBar | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI ProgressBar HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/progressbar
slug: htmlhelpers_progressbar_aspnetcore
position: 1
---

# ProgressBar HtmlHelper Overview

The ProgressBar HtmlHelper extension is a server-side wrapper for the [Kendo UI ProgressBar](http://demos.telerik.com/kendo-ui/progressbar/index) widget.

It allows you to configure the Kendo UI ProgressBar widget from server-side code. The [ProgressBar](http://docs.telerik.com/kendo-ui/controls/interactivity/progressbar/overview) offers rich functionalities for displaying and tracking the progress of a task. It supports multiple types, horizontal and vertical orientation, and also different directions.

For more information on the HtmlHelper, refer to the article on the [ProgressBar HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/progressbar/overview).

## Basic Usage

The following example demonstrates how to define the ProgressBar by using the ProgressBar HtmlHelper.

###### Example

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

## Configuration

The following example demonstrates the basic configuration of the ProgressBar HtmlHelper and how to get the ProgressBar instance.

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
            //Notice that the Name() of the ProgressBar is used to get its client-side instance.
            var progressbar = $("#progressbar").data("kendoProgressBar");
            console.log(progressbar);
        });
    </script>
```

## See Also

* [JavaScript API Reference of the ProgressBar](http://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar)
* [ProgressBar HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/progressbar/overview)
* [ProgressBar Official Demos](http://demos.telerik.com/aspnet-core/progressbar/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
