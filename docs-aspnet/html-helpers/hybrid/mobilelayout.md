---
title: Layout
page_title: Layout Overview
description: "Learn the basics when working with the hybrid Telerik UI Layout HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobilelayout/overview, /helpers/hybrid/mobilelayout
slug: overview_hybridlayout_aspnetmvc
---

# Hybrid Layout HtmlHelper Overview

The hybrid Telerik UI Layout HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI Layout widget.

* [Client-side API page for the Layout](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/layout)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add a Kendo UI Layout to the `Index` view.

        @(Html.Kendo().MobileLayout()
            .Name("layout")
            .Platform("ios")
            .Header(obj =>
                Html.Kendo().MobileNavBar()
                    .Content(navbar =>
                        @<text>
                            @(Html.Kendo().MobileBackButton()
                                .Align(MobileButtonAlign.Left)
                                .HtmlAttributes(new { @class = "nav-button" })
                                .Url(Url.RouteUrl(new { controller = "suite" }))
                                .Text("Back"))

                            @navbar.ViewTitle("iOS Platform")
                        </text>)
            )
            .Footer(obj =>
                Html.Kendo().MobileTabStrip()
                    .Items(items => {
                        items.Add().Icon("contacts").Text("Profile");
                        items.Add().Icon("settings").Text("Settings");
                    })
            )
        )

1. Add the View that will use the Layout.

        @(Html.Kendo().MobileView()
            .Name("layoutView")
            .Layout("layout") // the `Name` of the layout
            .Content(
                @<text>
                    <p>
                        This examples shows the platform specific layouts.
                        Change the OS to see how the header and footer changes.
                    </p>
                </text>)
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid Layout [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/layout#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobileLayout()
            .Name("MobileLayout")
            .Events(events => events
                .Show("onShow")
            )
    )

    <script>
        function onShow() {
            // Handle the show event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid Layout instance by using the code from the following example. Once a reference is established, use the [hybrid Layout client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/layout) to control its behavior.

    @(Html.Kendo().MobileLayout()
            .Name("MobileLayout")
    )
    <script>
        $(function() {
            // The Name() of the Layout is used to get its client-side instance.
            var layout = $("#MobileLayout").data("kendoMobileLayout");
        });
    </script>

## See Also

* [Hybrid LayoutBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileLayoutBuilder)
