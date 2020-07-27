---
title: PopOver
page_title: PopOver Overview
description: "Learn the basics when working with the hybrid Telerik UI PopOver HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobilepopover/overview, /helpers/hybrid/mobilepopover
slug: overview_hybridpopover_aspnetmvc
---

# Hybrid PopOver HtmlHelper Overview

The hybrid Telerik UI PopOver HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI PopOver widget.

The PopOver represents a transient view which is displayed when the user taps on a navigational control or area on the screen. It can contain one or more mobile views to which the user can navigate.

* [Demo page for the PopOver](https://demos.telerik.com/kendo-ui/m/index#popover/index)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

1. Add a hybrid Telerik UI PopOver to the `Index` view. Like most hybrid controls, the PopOver must be initialized within the hybrid View content.

        @(Html.Kendo().MobileView()
            .Name("popover-view")
            .Title("Inbox")
            .Header(obj =>
                Html.Kendo().MobileButton()
                    .Align(MobileButtonAlign.Right)
                    .Url("#popover") // The id of the PopOver.
                    .Text("Select location")
                    .Rel(MobileButtonRel.PopOver) // Rel must be set to open the PopOver.
            )
            .Content(obj =>
                Html.Kendo().MobilePopOver()
                    .Name("popover")
                    .Popup(popup => popup.Width("20em").Height("10.6em"))
                    .Content(
                        @<text>
                            PopOver content
                        </text>)
            )
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid PopOver [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/popover#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobilePopOver()
        .Name("popOver")
        .Content(
            @<text>
                PopOver content
            </text>)
            .Events(events => events
                .Close("onClose")
            )
    )

    <script>
        function onClose() {
            // Handle the close event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid PopOver instance by using the code from the following example. Once a reference is established, use the [hybrid PopOver client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/popover#methods) to control its behavior.

    @(Html.Kendo().MobilePopOver()
            .Name("popOver")
            .Content(
            @<text>
                PopOver content
            </text>)
    )
    <script>
        $(function() {
            // The Name() of the PopOver is used to get its client-side instance.
            var popover = $("#popOver").data("kendoMobilePopOver");
        });
    </script>

## See Also

* [Hybrid PopOverBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobilePopOverBuilder)
