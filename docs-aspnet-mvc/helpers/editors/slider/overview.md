---
title: Overview
page_title: Slider Overview| Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Slider for ASP.NET MVC."
slug: overview_sliderhelper_aspnetmvc
position: 1
---

# Slider HtmlHelper Overview

The Telerik UI Slider HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Slider widget.

The Slider provides a rich input for selecting numeric values nd can be either a Slider which presents one handle and two opposing buttons for selecting a single numeric value or a Slider which presents two handlers for defining a range of numeric values.

* [Demo page for the Slider](https://demos.telerik.com/aspnet-mvc/slider)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a Slider.

    ```ASPX
        <%: Html.Kendo().Slider()
            .Name("slider") // The name of the Slider is mandatory. It specifies the "id" attribute of the Slider.
            .Min(0) // Set min value of the Slider.
            .Max(100) // Set min value of the Slider.
            .Value(20) // Set the value of the Slider.
        %>
    ```
    ```Razor
        @(Html.Kendo().Slider()
            .Name("slider") // The name of the Slider is mandatory. It specifies the "id" attribute of the Slide.
            .Min(0) // Set min value of the Slider.
            .Max(100) // Set min value of the Slider.
            .Value(20) // Set the value of the Slider.
        )
    ```

## Events

You can subscribe to all Slider [events](/api/slider#events).For a complete example on basic Slider events, refer to the [demo on using the events of the Slider](https://demos.telerik.com/aspnet-mvc/slider/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Slider()
            .Name("slider")
            .Events(e => e
                .Change("change")
                .Slide("slide")
            )
    %>
    <script>
        function change() {
            // Handle the change event.
        }

        function slide() {
            // Handle the slide event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Slider()
            .Name("slider")
            .Events(e => e
                .Change("change")
                .Slide("slide")
            )
    )
    <script>
        function change() {
            // Handle the change event.
        }

        function slide() {
            // Handle the slide event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().Slider()
        .Name("slider")
        .Events(e => e
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
            .Slide(@<text>
                function() {
                    // Handle the slide event inline.
                }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Slider instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Slider client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/slider#methods) to control its behavior.

    // Place the following after the Slider for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the Slider is used to get its client-side instance.
            var slider = $("#slider").data("kendoSlider");
        });
    </script>

## See Also

* [Basic Usage by the Slider HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/slider)
* [Using the API of the Slider HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/slider/api)
* [SliderBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SliderBuilder)
* [Slider Server-Side API](/api/slider)
