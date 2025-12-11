---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Circular ProgressBar component for {{ site.framework }}."
components: ["circularprogressbar"]
slug: htmlhelpers_circular_progressbar_aspnetcore
position: 0
---

# Circular ProgressBar Overview

{% if site.core %}
The Telerik UI Circular ProgressBar TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Circular ProgressBar widget.
{% else %}
The Telerik UI Circular ProgressBar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Circular ProgressBar widget.
{% endif %}

The Circular ProgressBar allows you to display and track the progress of a task or process.

The component gives you the flexibility to customize its appearance with a template or set different colors for specific progress ranges.

* [Demo page for the Circular ProgressBar HtmlHelper](https://demos.telerik.com/{{ site.platform }}/circularprogressbar/index)
{% if site.core %}
* [Demo page for the Circular ProgressBar TagHelper](https://demos.telerik.com/aspnet-core/circularprogressbar/tag-helper)
{% endif %}

## Initializing the Circular ProgressBar

The following example demonstrates how to define a Circular ProgressBar.

```HtmlHelper
    @(Html.Kendo().CircularProgressBar()
        .Name("progressbar")
        .Value(0)
    )
```
{% if site.core %}
```TagHelper
    <kendo-circularprogressbar name="progressbar" value=0></kendo-circularprogressbar>
```
{% endif %}

You can control the size of the Circular ProgressBar by setting its height through the `HtmlAttributes()` method{% if site.core %} when using the HtmlHelper definition or through the `style` attribute when using the TagHelper definition{% endif %}.

```HtmlHelper
    @(Html.Kendo().CircularProgressBar()
        .Name("progressbar")
        .HtmlAttributes(new {style = "height: 500px;"})
        .Value(10)
    )
```
{% if site.core %}
```TagHelper
    <kendo-circularprogressbar name="progressbar" value="10" style="height: 500px;">
    </kendo-circularprogressbar>
```
{% endif %}

## Basic Configuration

The following example shows the basic configuration of the Circular ProgressBar with different colors based on the current value and a template that displays the current value in the center of the progress bar.

```HtmlHelper
    @(Html.Kendo().CircularProgressBar()
        .Name("progressbar")
        .Value(0)
        .Colors(c =>
        {
            c.Add().Color("#C0392B").To(25);
            c.Add().Color("#D35400").From(25).To(50);
            c.Add().Color("#D4AC0D").From(50).To(75);
            c.Add().Color("#58D68D").From(75).To(99);
            c.Add().Color("#229954").From(99);
        })
        .CenterTemplate("<span style='color: #: color #;'>#= value == 100 ? \"<span class='k-icon k-i-check'></span>\" : value + '%' #</span>")
    )
```
{% if site.core %}
```TagHelper
    <script id="progress-template" type="text/kendo-ui-template">
        # if (value == 100) { #
        <span class='k-icon k-i-check'></span>
        # }else{#
           #: value # %
        #}#
    </script>

    <kendo-circularprogressbar name="progressbar" value=0 center-template-id="progress-template">
        <colors>
            <color to=25 color="#C0392B"/>
            <color from=25 to=50 color="#D35400"/>
            <color from=50 to=75 color="#D4AC0D"/>
            <color from=75 to=99 color="#58D68D"/>
            <color from=99 color="#229954"/>
        </colors>
    </kendo-circularprogressbar>
```
{% endif %}

## Modes

The Circular ProgressBar supports infinite and finite modes.

* The infinite mode renders a Circular ProgressBar that is always spinning without an indication of when the task will be complete. To enable the infinite mode, set the `Indeterminate()` configuration option to `true`{% if site.core %} or add the `indeterminate` attribute when using the TagHelper mode{% endif %}:

    ```HtmlHelper
        @(Html.Kendo().CircularProgressBar()
            .Name("progressbar")
            .Indeterminate(true)
            .Colors(c =>
            {
                c.Add().Color("#0071bc");
            })
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-circularprogressbar name="progressbar" indeterminate="true">
            <colors>
                <color color="#0071bc"/>
            </colors>
        </kendo-circularprogressbar>
    ```
    {% endif %}

* The finite mode is the default mode of the Circular ProgressBar. The component indicates the task completion. To update the value of the Circular ProgressBar dynamically, use the [`value()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/circularprogressbar/methods/value) API method. 

    The following example showcases how to update the Circular ProgressBar value every 50 milliseconds.

    ```HtmlHelper
        @(Html.Kendo().CircularProgressBar()
            .Name("progressbar")
            .Value(0)
        )

        <script>
            $(document).ready(function() {
                // Update the value every 50 milliseconds until it reaches 100%.
                let interval = setInterval(function () {
                    let pb = $("#progressbar").data("kendoCircularProgressBar");
                    let value = pb.value();

                    if (value >= 100) {
                        clearInterval(interval);
                        return;
                    }

                    pb.value(value + 1);
                }, 50);
            })
        </script>
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-circularprogressbar name="progressbar" value=0></kendo-circularprogressbar>

        <script>
            $(document).ready(function() {
                // Update the value every 50 milliseconds until it reaches 100%.
                let interval = setInterval(function () {
                    let pb = $("#progressbar").data("kendoCircularProgressBar");
                    let value = pb.value();

                    if (value >= 100) {
                        clearInterval(interval);
                        return;
                    }

                    pb.value(value + 1);
                }, 50);
            })
        </script>
    ```
    {% endif %}

## Colors

You can customize the appearance of the Circular ProgressBar by setting different colors for specific ranges of the progress it displays. To configure the colors, use the `Colors` configuration{% if site.core %} when using the HtmlHelper declaration or the `<colors>` tag when using the TagHelper declaration{% endif %}.

The following example demonstrates a Circular ProgressBar that changes its color based on the current value:

```HtmlHelper
    @(Html.Kendo().CircularProgressBar()
        .Name("progressbar")
        .Value(0)
        .Colors(c =>
        {
            c.Add().Color("#C0392B").To(25);
            c.Add().Color("#D35400").From(25).To(50);
            c.Add().Color("#D4AC0D").From(50).To(75);
            c.Add().Color("#58D68D").From(75).To(99);
            c.Add().Color("#229954").From(99);
        })
        .CenterTemplate("<span style='color: #: color #;'>#= value == 100 ? \"<span class='k-icon k-i-check'></span>\" : value + '%' #</span>")
    )
```
{% if site.core %}
```TagHelper
    <script id="progress-template" type="text/kendo-ui-template">
        # if (value == 100) { #
        <span class='k-icon k-i-check'></span>
        # }else{#
           #: value # %
        #}#
    </script>

    <kendo-circularprogressbar name="progressbar" value=0 center-template-id="progress-template">
        <colors>
            <color to=25 color="#C0392B"/>
            <color from=25 to=50 color="#D35400"/>
            <color from=50 to=75 color="#D4AC0D"/>
            <color from=75 to=99 color="#58D68D"/>
            <color from=99 color="#229954"/>
        </colors>
    </kendo-circularprogressbar>
```
{% endif %}

## Template

The `CenterTemplate()` option{% if site.core %} or the `center-template-id` TagHelper attribute{% endif %} allows you to display a custom message or the current value in the center of the Circular ProgressBar.

The following example shows how to render the progress bar value in the center of the Circular ProgressBar and an icon that indicates when the progress bar completes.

```HtmlHelper
    @(Html.Kendo().CircularProgressBar()
        .Name("progressbar")
        .Value(0)
        .CenterTemplate("<span style='color: #: color #;'>#= value == 100 ? \"<span class='k-icon k-i-check'></span>\" : value + '%' #</span>")
    )
```
{% if site.core %}
```TagHelper
    <script id="progress-template" type="text/kendo-ui-template">
        # if (value == 100) { #
        <span class='k-icon k-i-check'></span>
        # }else{#
            #: value # %
        #}#
    </script>

    <kendo-circularprogressbar name="progressbar" value=0 center-template-id="progress-template">
    </kendo-circularprogressbar>
```
{% endif %}

## Next Steps

* [Getting Started with the Circular ProgressBar]({% slug circular_progressbar_getting_started %})
* [Basic Usage of the Circular ProgressBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/circularprogressbar/index)
{% if site.core %}
* [Basic Usage of the Circular ProgressBar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/circularprogressbar/tag-helper)
{% endif %}

## See Also

* [Using the API of the Circular ProgressBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/circularprogressbar/api)
* [Knowledge Base Section](/knowledge-base)
