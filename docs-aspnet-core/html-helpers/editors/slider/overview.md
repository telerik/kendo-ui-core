---
title: Overview
page_title: Slider Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Slider for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_sliderhelper_aspnetcore
position: 1
---

# Slider HtmlHelper Overview

The Kendo UI Slider provides a rich input for selecting numeric values.

The Slider can be either of the following types:
* Kendo UI Slider for ASP.NET Core, which presents one handle and two opposing buttons for selecting a single numeric value.
* Kendo UI RangeSlider for ASP.NET Core, which present two handlers for defining a range of numeric values.

The Slider HtmlHelper extension is a server-side wrapper for the [Kendo UI Slider](https://demos.telerik.com/kendo-ui/slider/index) widget. For more information on the Slider HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/slider/overview).

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

You can subscribe to all Slider [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/slider#events). For a complete example on basic Slider events, refer to the [demo on using the events of the Slider](https://demos.telerik.com/aspnet-core/slider/events).

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

To reference an existing Kendo UI Slider instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Slider API](https://docs.telerik.com/kendo-ui/api/javascript/ui/slider#methods) to control its behavior.

```
    // Place this after your Kendo UI Slider for ASP.NET Core declaration.
    <script>
        $(function() {
            // The Name() of the Slider is used to get its client-side instance.
            var slider = $("#slider").data("kendoSlider");
        });
    </script>
```

## See Also

* [Basic Usage by the Slider HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/slider)
* [Using the API of the Slider HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/slider/api)
* [JavaScript API Reference of the Slider](http://docs.telerik.com/kendo-ui/api/javascript/ui/slider)
