---
title: Application
page_title: Application Overview
description: "Learn the basics when working with the hybrid Telerik UI Application HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobileapplication/overview, /helpers/hybrid/mobileapplication
slug: overview_hybridapplication_aspnetmvc
---

# Hybrid Application HtmlHelper Overview

The hybrid Telerik UI Application HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI Application widget.

The Application displays a set of choices related to a task the user initiates.

* [Demo page for the Application](https://demos.telerik.com/kendo-ui/m/index#application/loadingpopup)

## Basic Configuration

The Application for ASP.NET MVC provides the necessary tools for building native-looking web-based mobile applications. When initialized, the mobile Application modifies the behavior of the hybrid UI widgets so that they navigate between the mobile views when the user taps them.

To implement navigation, use either of the available approaches:
* Server navigation
* Ajax navigation

### Server Navigation

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add an action method for the `detail` view.

        public ActionResult Details()
        {
            return View();
        }

1. Add the default hybrid Telerik UI View for ASP.NET MVC. The mobile application expects that the immediate child of the application element is a `MobileView`.

        @(Html.Kendo().MobileView()
            .Name("Index")
            .Title("Index")
            .Content(
                @<text>
                    View Content Template

                    <!--Add a button that will `server navigate` the application.-->
                    @(Html.Kendo().MobileButton()
                        .Text("Navigate to Details")
                        .Url("Details", "Home")
                    )

                </text>
            )
        )

1. Create a new `Details` ASP.NET MVC View file under the `/Views/Home/` folder.

        @(Html.Kendo().MobileView()
            .Title("Details")
            .Name("Details")
            .Content(
                @<text>
                View Details Template
                <!--Add a back button that will `server navigate` the application to `Index`.-->
                @(Html.Kendo().MobileButton()
                    .Text("Go Back")
                    .Url("./")
                )
                </text>
            )
        )

1. Initialize the Application inside the `Master/Layout` page and enable the server navigation.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the Application.

### Ajax Navigation

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add an action method for the `detail` view. The view is returned as `Partial`.

        public ActionResult Details()
        {
            return PartialView();
        }

1. Add the default hybrid Telerik UI View for ASP.NET MVC. The mobile application expects that the immediate child of the application element is a `MobileView`.

        @(Html.Kendo().MobileView()
            .Name("Index")
            .Title("Index")
            .Content(
                @<text>
                    View Content Template

                    <!--Add a button that will `server navigate` the application.-->
                    @(Html.Kendo().MobileButton()
                        .Text("Navigate to Details")
                        .Url("Details", "Home")
                    )

                </text>
            )
        )

1. Create a new `Details` ASP.NET MVC View file under the `/Views/Home/` folder.

        @(Html.Kendo().MobileView()
            .Title("Details")
            .Name("Details")
            .Content(
                @<text>
                View Details Template
                <!--Add a back button that will `server navigate` the application to `Index`.-->
                @(Html.Kendo().MobileButton()
                    .Text("Go Back")
                    .Url("#:back")
                )
                </text>
            )
        )

1. Initialize the mobile application inside the `Master/Layout` page.

        @(Html.Kendo().MobileApplication()
            .PushState(true)
            .ServerNavigation(false)
        )

1. Build and run the application.

## Referencing Existing Instances

You can reference a hybrid Application instance by using the code from the following example. Once a reference is established, use the [hybrid Application client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/application#methods) to control its behavior.

    @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
    )
    <script>
        $(function() {
            // The casing is important.
            var application = kendo.mobile.application;
        });
    </script>

## See Also

* [Hybrid ApplicationBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileApplicationBuilder)
