---
title: TabStrip
page_title: TabStrip Overview
description: "Learn the basics when working with the hybrid Telerik UI TabStrip HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobiletabstrip/overview, /helpers/hybrid/mobiletabstrip
slug: overview_hybridtabstrip_aspnetmvc
---

# Hybrid TabStrip HtmlHelper Overview

The hybrid Telerik UI TabStrip HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI TabStrip widget.

The TabStrip is used inside a mobile view or layout footer element to display an application-wide group of navigation buttons.

* [Demo page for the TabStrip](https://demos.telerik.com/kendo-ui/m/index#mobile-tabstrip/index)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

1. Add a hybrid Telerik UI TabStrip to the `Index` view. Like most hybrid controls, the TabStrip must be initialized within the hybrid View content.

        @(Html.Kendo().MobileView()
            .Name("tabstrip-view")
            .Title("Inbox")
            .Footer(
                @<text>

                @(Html.Kendo().MobileTabStrip()
                    .Items(items =>
                    {
                        items.Add().Icon("contacts").Text("Profile");
                        items.Add().Icon("history").Text("Sales");
                        items.Add().Icon("favorites").Text("Rating");
                        items.Add().Icon("settings").Text("Settings");
                    })
                )

            </text>)
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid TabStrip [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/tabstrip#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobileTabStrip()
        .Name("tabstrip")
        .Items(items =>
        {
            items.Add().Icon("contacts").Text("Profile");
            items.Add().Icon("history").Text("Sales");
            items.Add().Icon("favorites").Text("Rating");
            items.Add().Icon("settings").Text("Settings");
        })
        .Events(events => events
            .Select("onSelect")
        )
    )

    <script>
        function onSelect() {
            // Handle the select event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid TabStrip instance by using the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and the value specified through the `Name()` method. Once a reference is established, use the [hybrid TabStrip client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/tabstrip#methods) to control its behavior.

    @(Html.Kendo().MobileTabStrip()
        .Name("tabstrip")
        .Items(items =>
        {
            items.Add().Icon("contacts").Text("Profile");
            items.Add().Icon("history").Text("Sales");
            items.Add().Icon("favorites").Text("Rating");
            items.Add().Icon("settings").Text("Settings");
        })
    )
    <script>
        $(function() {
            // The Name() of the TabStrip is used to get its client-side instance.
            var tabstrip = $("#tabstrip").data("kendoMobileTabStrip");
        });
    </script>

## See Also

* [Hybrid TabStripBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileTabStripBuilder)
