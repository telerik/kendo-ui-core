---
title: Button
page_title: Button Overview
description: "Learn the basics when working with the hybrid Telerik UI Button HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobilebutton/overview, /helpers/hybrid/mobilebutton
slug: overview_hybridbutton_aspnetmvc
---

# Hybrid Button HtmlHelper Overview

The hybrid Telerik UI Button HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI Button widget.

The Button navigates to a mobile View or executes a custom callback when tapped.

* [Demo page for the Button](https://demos.telerik.com/kendo-ui/m/index#mobile-button/index)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

1. Add a hybrid Telerik UI Button to the `Index` view. Like most hybrid controls, the Button must be initialized within the hybrid View content.

        @(Html.Kendo().MobileView()
            .Name("button-view")
            .Title("Inbox")
            .Content(
                @<text>

                @(Html.Kendo().MobileButton()
                        .Name("mobile-button2")
                        .Text("Trigger Event 2")
                        .HtmlAttributes(new { style = "margin: 2em; text-align: center;" })
                )

            </text>)
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid Button [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/button#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobileButton()
        .Name("MobileButton")
        .Text("Button Text")
        .Events(events => events
            .Click("onClick")
        )
    )

    <script>
        function onClick() {
            // Handle the click event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid Button instance by using the code from the following example. Once a reference is established, use the [hybrid Button client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/button#methods) to control its behavior.

    @(Html.Kendo().MobileButton()
            .Name("MobileButton")
            .Text("Button Text")
    )
    <script>
        $(function() {
            // The Name() of the Button is used to get its client-side instance.
            var button = $("#MobileButton").data("kendoMobileButton");
        });
    </script>

## See Also

* [Hybrid ButtonBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileButtonBuilder)
