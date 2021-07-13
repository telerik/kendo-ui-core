---
title: View
page_title: View Overview
description: "Learn the basics when working with the hybrid Telerik UI View HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobileview/overview, /helpers/hybrid/mobileview
slug: overview_hybridview_aspnetmvc
---

# Hybrid View HtmlHelper Overview

The hybrid Telerik UI View HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI View widget.

The View represents a screen in the mobile Application.

* [Demo page for the View](https://demos.telerik.com/kendo-ui/m/index#mobile-view/index)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add a hybrid Telerik UI View to the `Index` view.

        @(Html.Kendo().MobileView()
            .Title("View Title")
            .Content(
                @<text>
                    View Content Template
                </text>
            )
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid View [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/view#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobileView()
            .Name("MobileView")
            .Events(events => events
                .AfterShow("onAfterShow")
            )
    )

    <script>
        function onAfterShow() {
            // Handle the show event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid View instance by using the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and the value specified through the `Name()` method. Once a reference is established, use the [hybrid View client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/view#methods) to control its behavior.

    @(Html.Kendo().MobileView()
            .Name("MobileView")
    )
    <script>
        $(function() {
            // The Name() of the View is used to get its client-side instance.
            var view = $("#Mobileview").data("kendoMobileView");
        });
    </script>

## See Also

* [Hybrid TabStripBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileTabStripBuilder)
