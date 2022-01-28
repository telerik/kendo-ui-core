---
title: NavBar
page_title: NavBar Overview
description: "Learn the basics when working with the hybrid Telerik UI NavBar HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobilelanavbar/overview, /helpers/hybrid/mobilenavbar
slug: overview_hybridnavbar_aspnetmvc
---

# Hybrid NavBar HtmlHelper Overview

The hybrid Telerik UI NavBar HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI NavBar widget.

The NavBar displays an application navigation bar. It provides options for showing the current view title in the center and also for rendering additional left- and right-aligned controls such as **Back** buttons and so on.

* [Demo page for the NavBar](https://demos.telerik.com/kendo-ui/m/index#navbar/index)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add a hybrid Telerik UI NavBar to the `Index` view. Like most hybrid controls, the NavBar must be initialized within the hybrid View content.

        @(Html.Kendo().MobileView()
            .Name("navbar-home")
            .Title("Index")
            .Header(obj =>
                Html.Kendo().MobileNavBar()
                        .Content(navbar =>
                        @<text>
                            @(Html.Kendo().MobileBackButton()
                                    .Align(MobileButtonAlign.Left)
                                    .Text("Back"))
                            @navbar.ViewTitle("")
                        </text>)
                )
            .Content(@<text>View Content</text>)
        )

1. Initialize the mobile applic1.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Referencing Existing Instances

You can reference a hybrid NavBar instance by using the code from the following example. Once a reference is established, use the [hybrid NavBar client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/navbar#methods) to control its behavior.

    @(Html.Kendo().MobileView()
        .Name("navbar-home")
        .Title("Index")
        .Header(obj =>
            Html.Kendo().MobileNavBar()
                .Name("MobileNavBar")
                .Content(navbar =>
                    @<text>
                        @(Html.Kendo().MobileBackButton()
                                .Align(MobileButtonAlign.Left)
                                .Text("Back"))
                        @navbar.ViewTitle("")
                    </text>)
        )
        .Content(@<text>View Content</text>)
    )
    <script>
        $(function() {
            // The Name() of the NavBar is used to get its client-side instance.
            var navbar = $("#MobileNavBar").data("kendoMobileNavBar");
        });
    </script>

## See Also

* [Hybrid NavBarBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileNavBarBuilder)
