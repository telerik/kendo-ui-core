---
title: Overview
page_title: Overview | Kendo UI Slider HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Slider widget for ASP.NET MVC."
slug: overview_sliderhelper_aspnetmvc
position: 1
---

# Slider HtmlHelper Overview

The Slider HtmlHelper extension is a server-side wrapper for the [Kendo UI Slider](https://demos.telerik.com/kendo-ui/slider/index) widget.

## Getting Started

### The Basics

There are two types of Sliders:

* Kendo UI Slider for ASP.NET MVC, which presents one handle and two opposing buttons for selecting a single numeric value.
* Kendo UI RangeSlider for ASP.NET MVC, which present two handlers for defining a range of numeric values.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Slider.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a Slider.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().Slider()
                    .Name("slider") //The name of the Slider is mandatory. It specifies the "id" attribute of the widget.
                    .Min(0) //Set min value of the Slider.
                    .Max(100) //Set min value of the Slider.
                    .Value(20) //Set the value of the Slider.
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().Slider()
                  .Name("slider") //The name of the Slider is mandatory. It specifies the "id" attribute of the widget.
                  .Min(0) //Set min value of the Slider.
                  .Max(100) //Set min value of the Slider.
                  .Value(20) //Set the value of the Slider.
            )
    ```

## Event Handling

You can subscribe to all Slider [events](../../../kendo-ui/api/javascript/ui/slider#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().Slider()
                .Name("slider")
                .Events(e => e
                    .Change("change")
                    .Slide("slide")
                )
        %>
        <script>
        function change() {
            //Handle the change event.
        }

        function slide() {
            //Handle the slide event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().Slider()
              .Name("slider")
              .Events(e => e
                    .Change("change")
                    .Slide("slide")
              )
        )
        <script>
        function change() {
            //Handle the change event.
        }

        function slide() {
            //Handle the slide event.
        }
        </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().Slider()
              .Name("slider")
              .Events(e => e
                  .Change(@<text>
                    function() {
                        //Handle the change event inline.
                    }
                  </text>)
                  .Slide(@<text>
                    function() {
                        //Handle the slide event inline.
                    }
                    </text>)
              )
        )
```

## Reference

### Existing Instances

To reference an existing Kendo UI Slider instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Slider API](../../../kendo-ui/api/javascript/ui/slider#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Slider for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the Slider is used to get its client-side instance.
            var slider = $("#slider").data("kendoSlider");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: SliderBuilder](/api/Kendo.Mvc.UI.Fluent/SliderBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Slider Widget](http://docs.telerik.com/kendo-ui/controls/editors/slider/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
