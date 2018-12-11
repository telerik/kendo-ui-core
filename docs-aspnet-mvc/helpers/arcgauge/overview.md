---
title: Overview
page_title: ArcGauge | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI ArcGauge widget for ASP.NET MVC."
slug: overview_arcgaugehelper_aspnetmvc
position: 1
---

# ArcGauge HtmlHelper Overview

The ArcGauge HtmlHelper extension is a server-side wrapper for the [Kendo UI ArcGauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ArcGauge.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Add a ArcGauge.

    ```ASPX
        <%: Html.Kendo().ArcGauge()
            // The name of the AcrGauge is mandatory.
            // It specifies the "id" attribute of the widget.
            .Name("arcGauge")
            .Value(65)
            .Scale(x => x.Min(0).Max(100))
            .CenterTemplate("#:value#%")
        %>
    ```
    ```Razor
        @(Html.Kendo().ArcGauge()
            // The name of the AcrGauge is mandatory.
            // It specifies the "id" attribute of the widget.
            .Name("arcGauge")
            .Value(65)
            .Scale(x => x.Min(0).Max(100))
            .CenterTemplate("#:value#%")
        )
    ```

## Reference

### Existing Instances

To reference an existing Kendo UI ArcGauge instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ArcGauge API](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI ArcGauge for ASP.NET MVC declaration.
    <script>
        $(function() {
            //Notice that the Name() of the ArcGauge is used to get its client-side instance.
            var gauge = $("#arcGauge").data("kendoArcGauge");
        });
    </script>

## See Also

* [Telerik UI for ASP.NET MVC API Reference: ArcGaugeBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ArcGaugeBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ArcGauge Widget](http://docs.telerik.com/kendo-ui/controls/gauges/arcgauge/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
