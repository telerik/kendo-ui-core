---
title: ButtonGroup
page_title: ButtonGroup Overview
description: "Learn the basics when working with the hybrid Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobilebuttongroup/overview, /helpers/hybrid/mobilebuttongroup
slug: overview_hybridbuttongroup_aspnetmvc
---

# Hybrid ButtonGroup HtmlHelper Overview

The hybrid Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI ButtonGroup widget.

The ButtonGroup presents a linear set of grouped buttons.

* [Demo page for the ButtonGroup](https://demos.telerik.com/kendo-ui/m/index#buttongroup/mobile)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

1. Add a hybrid Telerik UI ButtonGroup to the `Index` view. Like most hybrid controls, the ButtonGroup must be initialized within the hybrid View content.

        @(Html.Kendo().MobileView()
            .Name("buttongroup-view")
            .Title("Inbox")
            .Content(@<text>
                @(Html.Kendo().MobileButtonGroup()
                    .Name("select-period")
                    .Items(items =>
                    {
                        items.Add().Text("Month");
                        items.Add().Text("Quarter");
                        items.Add().Text("Year");
                    })
                    .Index(0)
                )
            </text>)
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid ButtonGroup [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/buttongroup#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobileButtonGroup()
        .Name("select-period")
        .Items(items =>
        {
            items.Add().Text("Month");
            items.Add().Text("Quarter");
            items.Add().Text("Year");
        })
        .Index(0)
        .Events(events => events.Select("onSelect"))
    )

    <script>
        function onSelect() {
            // Handle the select event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid ButtonGroup instance by using the code from the following example. Once a reference is established, use the [hybrid ButtonGroup client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/buttongroup#methods) to control its behavior.

    @(Html.Kendo().MobileButtonGroup()
        .Name("select-period")
        .Items(items =>
        {
            items.Add().Text("Month");
            items.Add().Text("Quarter");
            items.Add().Text("Year");
        })
        .Index(0)
    )
    <script>
        $(function() {
            // The Name() of the ButtonGroup is used to get its client-side instance.
            var buttongroup = $("#select-period").data("kendoMobileButtonGroup");
        });
    </script>

## See Also

* [Hybrid ButtonGroupBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileButtonGroupBuilder)
