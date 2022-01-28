---
title: SplitView
page_title: SplitView Overview
description: "Learn the basics when working with the hybrid Telerik UI SplitView HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobilesplitview/overview, /helpers/hybrid/mobilesplitview
slug: overview_hybridsplitview_aspnetmvc
---

# Hybrid SplitView HtmlHelper Overview

The hybrid Telerik UI SplitView HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI SplitView widget.

The SplitView represents a tablet-specific view that consists of two or more mobile Pane controls.

* [Demo page for the SplitView](https://demos.telerik.com/kendo-ui/m/index#splitview/index)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add a hybrid Telerik UI SplitView to the `Index` view.

        @(Html.Kendo().MobileSplitView()
            .Name("MobileSplitView") //SplitView `id`
            .Panes(panes =>
            {
                // Add the side pane.
                panes.Add().Content(
                    @<text>
                        @(Html.Kendo().MobileView()
                                .Title("Side View")
                                .Content("Side View Content")
                        )
                    </text>
                );
                // Add the main pane.
                panes.Add().Content(
                    @<text>
                        @(Html.Kendo().MobileView()
                                .Title("Main View")
                                .Content("Main View Content")
                        )
                    </text>
                );
            })
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid SplitView [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/splitview#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobileSplitView()
            .Name("MobileSplitView")
            .Panes(panes =>
            {
                panes.Add().Content(
                    @<text>
                        @(Html.Kendo().MobileView()
                                .Title("Side View")
                                .Content("Side View Content")
                        )
                    </text>
                );
            })
            .Events(events => events
                .Init("onInit")
            )
    )

    <script>
        function onInit() {
            // Handle the init event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid SplitView instance by using the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and the value specified through the `Name()` method. Once a reference is established, use the [hybrid SplitView client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/splitview#methods) to control its behavior.

    @(Html.Kendo().MobileSplitView()
            .Name("MobileSplitView") //SplitView `id`
            .Panes(panes =>
            {
                panes.Add().Content(
                    @<text>
                        @(Html.Kendo().MobileView()
                                .Title("Side View")
                                .Content("Side View Content")
                        )
                    </text>
                );
            })
    )
    <script>
        $(function() {
            // The Name() of the SplitView is used to get its client-side instance.
            var splitview = $("#MobileSplitView").data("kendoMobileSplitView");
        });
    </script>

## See Also

* [Hybrid SplitViewBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileSplitViewBuilder)
