---
title: Drawer
page_title: Drawer Overview
description: "Learn the basics when working with the hybrid Telerik UI Drawer HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobiledrawer/overview, /helpers/hybrid/mobiledrawer
slug: overview_hybriddrawer_aspnetmvc
---

# Hybrid Drawer HtmlHelper Overview

The hybrid Telerik UI Drawer HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI Drawer widget.

The Drawer provides a slide to reveal the global mobile application toolbox or navigation.

* [Demo page for the Drawer](https://demos.telerik.com/kendo-ui/m/index#drawer/index)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add the default application view. By default, the Drawer is revealed at the left side when swiping from left to right.

        @(Html.Kendo().MobileView()
            .Name("drawer-view")
            .Title("Deleted Items")
            .Content(obj =>
                Html.Kendo().MobileListView()
                    .Items(items =>
                    {
                        items.Add().Icon("trash").Text("Untitled message 4");
                        items.Add().Icon("trash").Text("Untitled message 5");
                    })
            )
        )

1. Add a hybrid Drawer to the `Index` view.

        @(Html.Kendo().MobileDrawer()
            .Name("my-drawer")
            .HtmlAttributes(new { style = "width: 270px" })
            .Views("drawer-home") // A list of the view ids on which the Drawer will appear.
            .Content(obj =>
                Html.Kendo().MobileListView().Type("group")
                    .Items(root => {
                        root.Add().Text("Tasks").Items(items =>
                        {
                            items.Add().Text("To Do");
                            items.Add().Text("In Progress");
                            items.Add().Text("Done");
                            items.Add().Text("High Priority");
                            items.Add().Text("Low Priority");
                        });

                        root.Add().Text("Account").Items(items =>
                        {
                            items.Add().Icon("settings").Text("Settings");
                            items.Add().Icon("off").Text("Log Out");
                        });
                    })
            )
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid Drawer [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/drawer#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobileDrawer()
            .Name("MobileDrawer")
            .Events(events => events
                .BeforeShow("onBeforeShow")
            )
    )

    <script>
        function onBeforeShow() {
            // Handle the show event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid Drawer instance by using the code from the following example. Once a reference is established, use the [hybrid Drawer client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/drawer#methods) to control its behavior.

    @(Html.Kendo().MobileDrawer()
            .Name("MobileDrawer")
    )
    <script>
        $(function() {
            // The Name() of the Drawer is used to get its client-side instance.
            var drawer = $("#Mobiledrawer").data("kendoMobileDrawer");
        });
    </script>

## See Also

* [Hybrid DrawerBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileDrawerBuilder)
