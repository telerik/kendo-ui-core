---
title: Overview
page_title: RadialGauge HtmlHelper extension for Kendo UI DataViz RadialGauge for ASP.NET MVC
description: Guidance for RadialGauge HtmlHelper extension, how to configure Kendo UI DataViz RadialGauge widget and control the behavior of the extension.
---

# RadialGauge

The RadialGauge HtmlHelper extension is a server-side wrapper for the [Kendo DataViz RadialGaug](/api/dataviz/radialgauge)e widget.

## Getting Started

Here is how to configure a simple Kendo RadialGauge:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a RadialGauge:
    - WebForms

            <%: Html.Kendo().RadialGauge()
                    .Name("radialGauge") // The name of the radialGauge is mandatory. It specifies the "id" attribute of the widget.
                    .Scale(scale => scale
                        .Min(0) // Set min value of the radialGauge
                        .Max(200) // Set min value of the radialGauge
                    )
                    .Pointer(pointer => pointer
                        .Value(10) // Set the value of the radialGauge
                    )
            %>
    - Razor

            @(Html.Kendo().RadialGauge()
                  .Name("radialGauge") // The name of the radialGauge is mandatory. It specifies the "id" attribute of the widget.
                  .Scale(scale => scale
                      .Min(0) // Set min value of the radialGauge
                      .Max(200) // Set min value of the radialGauge
                  )
                  .Pointer(pointer => pointer
                      .Value(10) // Set the value of the radialGauge
                  )
            )

## Accessing an Existing Radial Gauge

You can reference an existing RadialGauge instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/radialgauge#methods) to control its behavior.



### Accessing an existing RadialGauge instance

    //Put this after your Kendo RadialGauge for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the radialGauge is used to get its client-side instance
        var gauge = $("#radialGauge").data("kendoRadialGauge");
    });
    </script>

