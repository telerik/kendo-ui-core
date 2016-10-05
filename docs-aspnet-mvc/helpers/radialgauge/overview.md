---
title: Overview
page_title: Overview | Kendo UI RadialGauge HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI RadialGauge widget for ASP.NET MVC."
slug: overview_radialgaugehelper_aspnetmvc
position: 1
---

# RadialGauge HtmlHelper Overview

The RadialGauge HtmlHelper extension is a server-side wrapper for the [Kendo UI RadialGauge](/api/javascript/dataviz/ui/radialgauge) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI RadialGauge.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a RadialGauge.

###### Example

```tab-ASPX

        <%: Html.Kendo().RadialGauge()
                .Name("radialGauge") // The name of the radialGauge is mandatory. It specifies the "id" attribute of the widget.
                .Scale(scale => scale
                    .Min(0) //Set the min value of the RadialGauge.
                    .Max(200) //Set the min value of the RadialGauge.
                )
                .Pointer(pointer => pointer
                    .Value(10) //Set the value of the RadialGauge.
                )
        %>
```
```tab-Razor

        @(Html.Kendo().RadialGauge()
              .Name("radialGauge") //The name of the RadialGauge is mandatory. It specifies the "id" attribute of the widget.
              .Scale(scale => scale
                  .Min(0) // Set the min value of the RadialGauge.
                  .Max(200) // Set the min value of the RadialGauge.
              )
              .Pointer(pointer => pointer
                  .Value(10) //Set the value of the RadialGauge.
              )
        )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI RadialGauge instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [RadialGauge API](/api/javascript/dataviz/ui/radialgauge#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI RadialGauge for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the RadialGauge is used to get its client-side instance.
            var gauge = $("#radialGauge").data("kendoRadialGauge");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the RadialGauge:

* [ASP.NET MVC API Reference: RadialGaugeBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/RadialGaugeBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI RadialGauge Widget]({% slug overview_kendoui_radialgaugewidget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
