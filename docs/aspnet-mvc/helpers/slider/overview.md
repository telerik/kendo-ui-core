---
title: Overview
page_title: Help Guide for Slider HtmlHelper extension | Kendo UI documentation
description: Step-by-step instructions how to configure Kendo UI Slider for ASP.NET MVC widget and add Slider HtmlHelper extension.
---

# Slider

The Slider HtmlHelper extension is a server-side wrapper for the&nbsp;[Kendo UI Slider](/api/web/slider)&nbsp;widget.

## Getting Started

There are two types of Slider:

*   Kendo Slider for ASP.NET MVC, which presents one thumb and two opposing buttons for selecting a single value
*   Kendo RangeSlider for ASP.NET MVC, which present two thumbs for defining a range of values

Here is how to configure a simple Kendo Slider:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a slider:
    - WebForms

            <%: Html.Kendo().Slider()
                    .Name("slider") //The name of the slider is mandatory. It specifies the "id" attribute of the widget.
                    .Min(0) //Set min value of the slider
                    .Max(100) //Set min value of the slider
                    .Value(20) //Set the value of the slider
            %>
    - Razor

            @(Html.Kendo().Slider()
                  .Name("slider") //The name of the slider is mandatory. It specifies the "id" attribute of the widget.
                  .Min(0) //Set min value of the slider
                  .Max(100) //Set min value of the slider
                  .Value(20) //Set the value of the slider
            )

## Accessing an Existing Slider

You can reference an existing slider instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/slider#methods) to control its behavior.

### Accessing an existing slider instance

    //Put this after your Kendo Slider for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the slider is used to get its client-side instance
        var slider = $("#slider").data("kendoSlider");
    });
    </script>


## Handling Kendo UI Slider events

You can subscribe to all [events](/api/web/slider#events) exposed by Kendo UI Slider:

### WebForms - subscribe by handler name

    <%: Html.Kendo().Slider()
            .Name("slider")
            .Events(e => e
                .Change("change")
                .Slide("slide")
            )
    %>
    <script>
    function change() {
        //Handle the change event
    }

    function slide() {
        //Handle the slide event
    }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().Slider()
          .Name("slider")
          .Events(e => e
                .Change("change")
                .Slide("slide")
          )
    )
    <script>
    function change() {
        //Handle the change event
    }

    function slide() {
        //Handle the slide event
    }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().Slider()
          .Name("slider")
          .Events(e => e
              .Change(@<text>
                function() {
                    //Handle the change event inline
                }
              </text>)
              .Slide(@<text>
                function() {
                    //Handle the slide event inline
                }
                </text>)
          )
    )

