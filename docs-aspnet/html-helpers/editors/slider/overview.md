---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Slider for {{ site.framework }}."
previous_url: /helpers/editors/slider/overview
slug: overview_sliderhelper_aspnetcore
position: 1
---

# Slider Overview

{% if site.core %}
The Telerik UI Slider TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Slider widget.
{% else %}
The Telerik UI Slider HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Slider widget.
{% endif %}

The Slider provides a rich input for selecting numeric values. The Slider can either present one handle and two opposing buttons for selecting a single numeric value, or two handlers for defining a range of numeric values. Unlike the HTML5 range input, the Slider enables the consistent experience across browsers and delivers rich API calls and event models.

* [Demo page for the Slider HtmlHelper](https://demos.telerik.com/{{ site.platform }}/slider/index)
{% if site.core %}
* [Demo page for the Slider TagHelper](https://demos.telerik.com/aspnet-core/slider/tag-helper)
{% endif %}

## Initializing the Slider

The following example demonstrates how to how to define the Slider.

```HtmlHelper
    @(Html.Kendo().Slider()
        .Name("slider") // The name of the Slider is mandatory. It specifies the "id" attribute of the widget.
        .Min(0) // Set min value of the Slider.
        .Max(100) // Set min value of the Slider.
        .Value(20) // Set the value of the Slider.
    )

    @(Html.Kendo().RangeSlider()
      .Name("rangeslider")
      .Min(0)
      .Max(10)
      .SmallStep(1)
      .LargeStep(10))
```
{% if site.core %}
```TagHelper

    <kendo-slider name="slider"
        min="0" max="100"
        small-step="1"
        value="20">
    </kendo-slider>

    <kendo-rangeslider name="rangeslider"
        increase-button-title="Right"
        decrease-button-title="Left"
        min="0" max="10"
        small-step="1"
        large-step="10">
    </kendo-rangeslider>
```
{% endif %}

## Basic Configuration

The Slider configuration options are passed as attributes.

```HtmlHelper
    @(Html.Kendo().Slider()
        .Name("slider")
        .IncreaseButtonTitle("Right")
        .DecreaseButtonTitle("Left")
        .Min(0)
        .Max(30)
        .SmallStep(1)
        .LargeStep(10)
        .Value(18)
        .HtmlAttributes(new { @class = "temperature" }))
```
{% if site.core %}
```TagHelper
    <kendo-slider name="slider"
        increase-button-title="Right"
        decrease-button-title="Left"
        min="0" max="30"
        small-step="1"
        large-step="10"
        value="18" class="temperature" title="slider">
    </kendo-slider>
```
{% endif %}


## Events

You can subscribe to all Slider events. For a complete example on basic Slider events, refer to the [demo on using the events of the Slider](https://demos.telerik.com/{{ site.platform }}/slider/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Slider()
          .Name("slider")
          .Events(e => e
                .Change("change")
                .Slide("slide")
          )
    )
    <script>
        function change(e) {
            // Handle the change event.
        }

        function slide(e) {
            // Handle the slide event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-slider name="slider"
        on-change="change"
        on-slide="slide"
    </kendo-slider>
    <script>
        function change(e) {
            // Handle the change event.
        }

        function slide(e) {
            // Handle the slide event.
        }
    </script>
```
{% endif %}


### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Slider()
        .Name("slider")
        .Events(e => e
            .Change(@<text>
              function(e) {
                  // Handle the change event inline.
              }
            </text>)
            .Slide(@<text>
              function(e) {
                  // Handle the slide event inline.
              }
              </text>)
        )
    )
```

## Referencing Existing Instances

To reference an existing Telerik UI Slider instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Slider client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/slider#methods) to control its behavior.

```
    // Place the following after your Telerik UI Slider for {{ site.framework }} declaration.
    <script>
        $(function() {
            // The Name() of the Slider is used to get its client-side instance.
            var slider = $("#slider").data("kendoSlider");
        });
    </script>
```

## See Also

* [Basic Usage by the Slider HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/slider)
{% if site.core %}
* [Basic Usage of the Slider TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/slider/tag-helper)
{% endif %}
* [Using the API of the Slider HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/slider/api)
* [Server-Side API](/api/slider)
