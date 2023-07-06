---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ProgressBar component for {{ site.framework }}."
previous_url: /helpers/html-helpers/progressbar, /helpers/interactivity/progressbar/overview
slug: htmlhelpers_progressbar_aspnetcore
position: 1
---

# {{ site.framework }} ProgressBar Overview

{% if site.core %}
The Telerik UI ProgressBar TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ProgressBar widget.
{% else %}
The Telerik UI ProgressBar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ProgressBar widget.
wrapper for the Kendo UI DataSource widget.
{% endif %}

The ProgressBar delivers rich functionality for displaying and tracking the progress of a task. It supports multiple types, horizontal and vertical orientation, reversed direction, minimum and maximum values, and animation duration.

* [Demo page for the ProgressBar HtmlHelper](https://demos.telerik.com/{{ site.platform }}/progressbar/index)
{% if site.core %}
* [Demo page for the ProgressBar TagHelper](https://demos.telerik.com/aspnet-core/progressbar/tag-helper)
{% endif %}

## Initializing the ProgressBar

The following example demonstrates how to define the ProgressBar.

```HtmlHelper
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
{% if site.core %}
```TagHelper
<kendo-progressbar name="fastAndFurious" type="ProgressBarType.Percent" animation-duration="600" />

    <script type="text-javascript">
        $(document).ready(function () {
            $("#progressbar").data("kendoProgressBar").value(50);
        });
    </script>
```
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration of the ProgressBar.

```HtmlHelper
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
        .Animation(a =>
        {
            a.Duration(500);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-progressbar name="progressBar" 
        show-status="true" 
        orientation="ProgressBarOrientation.Vertical" 
        type="ProgressBarType.Chunk" 
        animation-duration="600" 
        on-change="onChange" 
        on-complete="onComplete"/>
```
{% endif %}

## Next Steps

* [Getting Started with the ProgressBar]({% slug getting_started_progressbar %})
* [Basic Usage of the ProgressBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/progressbar/index)
{% if site.core %}
* [Basic Usage of the ProgressBar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/progressbar/tag-helper)
{% endif %}

## See Also

* [Using the API of the ProgressBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/progressbar/api)
* [Knowledge Base Section](/knowledge-base)
