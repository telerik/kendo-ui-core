---
title: Overview
page_title: ArcGauge | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI ArcGauge HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_arcgaugehelper_aspnetcore
position: 1
---

# ArcGauge HtmlHelper Overview

The ArcGauge HtmlHelper extension is a server-side wrapper for the [Kendo UI ArcGauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ArcGauge.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC](https://docs.telerik.com/aspnet-core/introduction).

1. Create a new action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Add the ArcGauge.

    ###### Example

        @(Html.Kendo().ArcGauge()
            .Name("arcGauge") //The name of the AcrGauge is mandatory. It specifies the "id" attribute of the widget.
            .Value(65)
            .Scale(x => x.Min(0).Max(100))
            .CenterTemplate("#:value#%")
        )

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

* [JavaScript API Reference of the Arc Gauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge)
* [Arc Gauge HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/arcgauge/overview)
* [Arc Gauge Official Demos](http://demos.telerik.com/aspnet-core/arc-gauge/index)
* [Overview of the UI for ASP.NET Core LinearGauge]({% slug overview_lineargaugehelper_aspnetcore %})
* [Overview of the UI for ASP.NET Core RadialGauge]({% slug overview_radialgaugehelper_aspnetcore %})
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
