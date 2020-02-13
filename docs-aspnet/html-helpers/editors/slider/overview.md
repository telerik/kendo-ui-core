---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Slider for {{ site.framework }}."
previous_url: /helpers/editors/slider/overview
slug: overview_sliderhelper_aspnetcore
position: 1
---

# Slider HtmlHelper Overview

The Telerik UI Slider HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Slider widget.

The Slider provides a rich input for selecting numeric values. The Slider can either present one handle and two opposing buttons for selecting a single numeric value, or two handlers for defining a range of numeric values. Unlike the HTML5 range input, the Slider enables the consistent experience across browsers and delivers rich API calls and event models.

* [Demo page for the Slider](https://demos.telerik.com/{{ site.platform }}/slider/index)

## Initializing the Slider

The following example demonstrates how to how to define the Slider by using the Slider HtmlHelper.

```
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

## Events

You can subscribe to all Slider events. For a complete example on basic Slider events, refer to the [demo on using the events of the Slider](https://demos.telerik.com/{{ site.platform }}/slider/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```
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

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
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
* [Using the API of the Slider HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/slider/api)
* [Server-Side API](/api/slider)
