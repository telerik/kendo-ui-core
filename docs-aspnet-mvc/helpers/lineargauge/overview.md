---
title: Overview
page_title: Overview | Kendo UI LinearGauge HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI LinearGauge widget for ASP.NET MVC."
slug: overview_lineargaugehelper_aspnetmvc
position: 1
---

# LinearGauge HtmlHelper Overview

The LinearGauge HtmlHelper extension is a server-side wrapper for the [Kendo LinearGauge](https://demos.telerik.com/kendo-ui/linear-gauge/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI LinearGauge.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a LinearGauge.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().LinearGauge()
                    .Name("linearGauge") //The name of the LinearGauge is mandatory. It specifies the "id" attribute of the widget.
                    .Scale(scale => scale
                        .Min(0) //Set the min value of the LinearGauge.
                        .Max(200) //Set the min value of the LinearGauge.
                    )
                    .Pointer(pointer => pointer
                        .Value(10) //Set the value of the LinearGauge.
                    )
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().LinearGauge()
                  .Name("linearGauge") //The name of the LinearGauge is mandatory. It specifies the "id" attribute of the widget.
                  .Scale(scale => scale
                      .Min(0) //Set the min value of the LinearGauge.
                      .Max(200) //Set the min value of the LinearGauge.
                  )
                  .Pointer(pointer => pointer
                      .Value(10) //Set the value of the LinearGauge.
                  )
            )
    ```

## Reference

### Existing Instances

To reference an existing Kendo UI LinearGauge instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [LinearGauge API](../../../kendo-ui/api/javascript/dataviz/ui/lineargauge#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI LinearGauge for ASP.NET MVC declaration.
        <script>
        $(function() {
        //Notice that the Name() of the LinearGauge is used to get its client-side instance.
            var gauge = $("#linearGauge").data("kendoLinearGauge");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: LinearGaugeBuilder](/api/Kendo.Mvc.UI.Fluent/LinearGaugeBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI LinearGauge Widget](http://docs.telerik.com/kendo-ui/controls/gauges/lineargauge/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
