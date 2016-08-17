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

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a Slider.

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

You can subscribe to all Slider [events](/api/javascript/ui/slider#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

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

The example below demonstrates how to subscribe to events by a template delegate.

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

You can reference an existing Kendo UI Slider instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Slider API](/api/javascript/ui/slider#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Slider for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the Slider is used to get its client-side instance.
            var slider = $("#slider").data("kendoSlider");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Slider:

* [ASP.NET MVC API Reference: SliderBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SliderBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Slider Widget]({% slug overview_kendoui_slider_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
