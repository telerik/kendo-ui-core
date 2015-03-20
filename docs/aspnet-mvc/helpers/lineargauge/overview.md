---
title: Overview
page_title: LinearGauge HtmlHelper extension for Kendo UI DataViz LinearGauge documentation
description: Getting started with LinearGauge HtmlHelper extension for Kendo UI DataViz LinearGauge for ASP.NET MVC.
---

# RadialGauge

The LinearGauge HtmlHelper extension is a server-side wrapper for the [Kendo DataViz LinearGauge](/api/dataviz/lineargauge) widget.

## Getting Started

Here is how to configure a simple Kendo LinearGauge:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a LinearGauge:
    - WebForms

            <%: Html.Kendo().LinearGauge()
                    .Name("linearGauge") // The name of the linearGauge is mandatory. It specifies the "id" attribute of the widget.
                    .Scale(scale => scale
                        .Min(0) // Set min value of the linearGauge
                        .Max(200) // Set min value of the linearGauge
                    )
                    .Pointer(pointer => pointer
                        .Value(10) // Set the value of the linearGauge
                    )
            %>
    - Razor

            @(Html.Kendo().LinearGauge()
                  .Name("linearGauge") // The name of the linearGauge is mandatory. It specifies the "id" attribute of the widget.
                  .Scale(scale => scale
                      .Min(0) // Set min value of the linearGauge
                      .Max(200) // Set min value of the linearGauge
                  )
                  .Pointer(pointer => pointer
                      .Value(10) // Set the value of the linearGauge
                  )
            )

## Accessing an Existing LinearGauge

You can reference an existing LinearGauge instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/lineargauge#methods) to control its behavior.

### Accessing an existing LinearGauge instance

    //Put this after your Kendo LinearGauge for ASP.NET MVC declaration
    <script>
    $(function() {
    // Notice that the Name() of the linearGauge is used to get its client-side instance
        var gauge = $("#linearGauge").data("kendoLinearGauge");
    });
    </script>

