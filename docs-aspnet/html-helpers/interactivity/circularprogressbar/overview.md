---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Circular ProgressBar component for {{ site.framework }}."
slug: htmlhelpers_circular_progressbar_aspnetcore
position: 1
---

# Cirular Progressbar Overview

{% if site.core %}
The Telerik UI Circular ProgressBar TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Circular ProgressBar widget.
{% else %}
The Telerik UI Circular ProgressBar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Circular ProgressBar widget.
wrapper for the Kendo UI DataSource widget.
{% endif %}

The ProgressBar allows you to display and track the progress of a task.

The component gives you the flexibility to customize its appearance with a template, or set different colors for specific progress ranges.

* [Demo page for the Circular ProgressBar](https://demos.telerik.com/{{ site.platform }}/circular-progressbar/index)

## Initializing the Cirular ProgressBar

The following example demonstrates how to define the Circular ProgressBar, get a reference to its client-side object, and set its value.

```HtmlHelper
    @(Html.Kendo().CircularProgressBar()
        .Name("progressbar")
        .Value(0)
    )

    <script type="text-javascript">
        $(document).ready(function () {
            $("#progressbar").data("kendoCircularProgressBar").value(50);
        });   
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-circularprogressbar name="progressbar" value=0></kendo-circularprogressbar>

    <script type="text-javascript">
        $(document).ready(function () {
            $("#progressbar").data("kendoCircularProgressBar").value(50);
        });   
    </script>
```
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration of the ProgressBar.

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

You can control the size of the Circular ProgressBar, by placing it in a `div` container with a specific height.

## Modes

The Circular ProgressBar has two modes: `infinite` and `finite`.

* The `infinite` mode renders a Circular ProgressBar that is always spinning and with no clear indication of when the task will be completed. To enable the `infinite` mode, set the `Indeterminate` configuration option to `true`:

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

* The `finite` mode is the default mode of the Circular ProgressBar. In this mode the component clearly indicates when the task will be completed. To update the value of the Circular ProgressBar, use the [`value`](https://docs.telerik.com/kendo-ui/api/javascript/ui/circularprogressbar/methods/value) API method. The following example showcases how to update the value every 50 milliseconds:

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

You can customize the appearance of the Circular ProgressBar by setting different colors for specific ranges of the progress it displays. To configure the colors, use the `Colors` configuration option.

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

You can use the `CenterTemplate` option, to display a custom message or an Html element in the center of the Circular ProgressBar.

The following example shows how to render custom text that matches the color of the Circular ProgressBar:

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

## Referencing Existing Instances

The following example demonstrates how to get a reference to an existing Telerik UI Circular ProgressBar instance. Once the reference is established, use the [Circular ProgressBar client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/circularprogressbar#methods) to control its behavior.

```HtmlHelper
    @(Html.Kendo().CircularProgressBar()
        .Name("progressbar")
        .Value(0)
    )

    <script type="text/javascript">
        $(document).ready(function () {
            // The Name() of the Circular ProgressBar is used to get its client-side instance.
            $("#progressbar").data("kendoCircularProgressBar").value(50);
        }); 
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-circularprogressbar name="progressbar" value=0>
    </kendo-circularprogressbar>

    <script type="text/javascript">
        $(document).ready(function () {
            // The Name() of the Circular ProgressBar is used to get its client-side instance.
            $("#progressbar").data("kendoCircularProgressBar").value(50);
        }); 
    </script>
```
{% endif %}

## See Also

* [Circular ProgressBar Overview (Demo)](https://demos.telerik.com/{{ site.platform }}/circular-progressbar/index)
* [JavaScript API Reference of the Circular ProgressBar](https://docs.telerik.com/kendo-ui/api/javascript/ui/circularprogressbar)
