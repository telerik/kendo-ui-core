---
title: Switch
page_title: Switch Overview
description: "Learn the basics when working with the hybrid Telerik UI Switch HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobileswitch/overview, /helpers/hybrid/mobileswitch
slug: overview_hybridswitch_aspnetmvc
---

# Hybrid Switch HtmlHelper Overview

The hybrid Telerik UI Switch HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI Switch widget.

The Switch displays two exclusive choices.

* [Demo page for the Switch](https://demos.telerik.com/kendo-ui/m/index#switch/mobile)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

1. Add a hybrid Telerik UI Switch to the `Index` view. Like most hybrid controls, the Switch must be initialized within the hybrid View content.

        @(Html.Kendo().MobileView()
            .Name("switch-view")
            .Title("Inbox")
            .Content(
                @<text>

                @(Html.Kendo().MobileSwitch()
                    .Name("subscription-switch")
                    .Checked(true)
                    .OnLabel("YES")
                    .OffLabel("NO")
                )

            </text>)
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid Switch [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/switch#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobileSwitch()
        .Name("mobile-switch")
        .Events(events => events.Change("onChange"))
    )

    <script>
        function onChange() {
            // Handle the change event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid Switch instance by using the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and the value specified through the `Name()` method. Once a reference is established, use the [hybrid Switch client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/switch#methods) to control its behavior.

    @(Html.Kendo().MobileSwitch()
        .Name("subscription-switch")
        .Checked(true)
        .OnLabel("YES")
        .OffLabel("NO")
    )
    <script>
        $(function() {
            // The Name() of the Switch is used to get its client-side instance.
            var switch = $("#subscription-switch").data("kendoMobileSwitch");
        });
    </script>

## See Also

* [Hybrid SwitchBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileSwitchBuilder)
