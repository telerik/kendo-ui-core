---
title: ScrollView
page_title: ScrollView Overview
description: "Learn the basics when working with the hybrid Telerik UI ScrollView HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobilescrollview/overview, /helpers/hybrid/mobilescrollview
slug: overview_hybridscrollview_aspnetmvc
---

#  Hybrid ScrollView HtmlHelper Overview

The hybrid Telerik UI ScrollView HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI ScrollView widget.

The ScrollView enables the user to scroll the content that is wider than the screen of the device.

* [Demo page for the ScrollView](https://demos.telerik.com/kendo-ui/m/index#scrollview/mobile)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

1. Add a hybrid Telerik UI ScrollView to the `Index` view. Like most hybrid controls, the PopOver must be initialized within the hybrid View content.

        @(Html.Kendo().MobileView()
            .Name("scrollview-home")
            .Title("Photo Gallery")
            .Content(
                @<text>
                <div id="scrollview-container">
                @(Html.Kendo().MobileScrollView()
                    .Page(2)
                    .Items(items =>
                    {
                        items.Add().HtmlAttributes(new { @class = "photo photo1" });
                        items.Add().HtmlAttributes(new { @class = "photo photo2" });
                        items.Add().HtmlAttributes(new { @class = "photo photo3" });
                        items.Add().HtmlAttributes(new { @class = "photo photo4" });
                        items.Add().HtmlAttributes(new { @class = "photo photo5" });
                        items.Add().HtmlAttributes(new { @class = "photo photo6" });
                        items.Add().HtmlAttributes(new { @class = "photo photo7" });
                        items.Add().HtmlAttributes(new { @class = "photo photo8" });
                        items.Add().HtmlAttributes(new { @class = "photo photo9" });
                        items.Add().HtmlAttributes(new { @class = "photo photo10" });
                    })
                    .FitItemPerPage(true))
                </div>
            </text>)
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid ScrollView [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/scrollview#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobileScrollView()
        .Name("scrollView")
        .Items(items =>
        {
            items.Add().HtmlAttributes(new { @class = "photo photo1" });
            items.Add().HtmlAttributes(new { @class = "photo photo2" });
        })
        .Events(events => events
            .Change("onChange")
        )
        .FitItemPerPage(true))

    <script>
        function onChange() {
            // Handle the change event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid ScrollView instance by using the code from the following example. Once a reference is established, use the [hybrid ScrollView client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/scrollview#methods) to control its behavior.

    @(Html.Kendo().MobileScrollView()
            .Name("scrollView")
            .Items(items =>
            {
                items.Add().HtmlAttributes(new { @class = "photo photo1" });
                items.Add().HtmlAttributes(new { @class = "photo photo2" });
            })
            .FitItemPerPage(true))
    <script>
        $(function() {
            // The Name() of the ScrollView is used to get its client-side instance.
            var scrollview = $("#scrollView").data("kendoMobileScrollView");
        });
    </script>

## See Also

* [Hybrid ScrollViewBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileScrollViewBuilder)
