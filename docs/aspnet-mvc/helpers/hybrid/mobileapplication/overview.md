---
title: Overview
page_title: Overview | Hybrid UI Application HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI Application widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobileapplication/overview
slug: overview_hybridapplication_aspnetmvc
position: 1
---

# Hybrid Application HtmlHelper Overview

The hybrid Application HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI Application](http://demos.telerik.com/kendo-ui/m/index#application/loadingpopup) widget. It allows you to configure the hybrid Kendo UI Application from server-side code.

## Getting Started

### The Basics

The Hybrid UI Application for ASP.NET MVC provides the necessary tools for building native-looking web-based mobile applications. When initialized, the mobile Application modifies the behavior of the hybrid Kendo UI widgets, so that they navigate between the mobile views when the user taps them.

There are two ways of navigation:

* Server navigation.
* Ajax navigation.

### Server Navigation

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add an action method for the `detail` view.

        public ActionResult Details()
        {
            return View();
        }

**Step 4** Add the default Hybrid UI View for ASP.NET MVC. The mobile application expects that the immediate child of the application element is a `MobileView`.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileView()
                .Name("Index")
                .Title("Index")
                .Content(() =>
                {
                    %>
                        View Content Template
                        <!--Add button that will `server navigate` the application-->
                        <%: Html.Kendo().MobileButton()
                                .Text("Navigate to Details")
                                .Url("Details", "Home")
                        %>
                    <%
                })
                .Render();
        %>
```
```tab-Razor

        @(Html.Kendo().MobileView()
            .Name("Index")
            .Title("Index")
            .Content(
                @<text>
                    View Content Template

                    <!--Add button that will `server navigate` the application-->
                    @(Html.Kendo().MobileButton()
                        .Text("Navigate to Details")
                        .Url("Details", "Home")
                    )

                </text>
            )
        )
```

**Step 5** Create a new `Details` ASP.NET MVC View file under the `/Views/Home/` folder.

###### Example

```tab-ASPX

        <%Html.Kendo().MobileView()
            .Title("Details")
            .Name("Details")
            .Content(() =>
            {
                %>
                View Details Template
                <!--Add back button that will `server navigate` the application to `Index`-->
                <%: Html.Kendo().MobileButton()
                        .Text("Go Back")
                        .Url("./")
                %>
                <%
            })
        %>
```
```tab-Razor

        @(Html.Kendo().MobileView()
            .Title("Details")
            .Name("Details")
            .Content(
                @<text>
                View Details Template
                <!--Add back button that will `server navigate` the application to `Index`-->
                @(Html.Kendo().MobileButton()
                    .Text("Go Back")
                    .Url("./")
                )
                </text>
            )
        )
```

**Step 6** Initialize the Application inside the `Master/Layout` page and enable the server navigation.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileApplication()
                .ServerNavigation(true)
        %>
```
```tab-Razor

            @(Html.Kendo().MobileApplication()
                .ServerNavigation(true)
            )
```

**Step 7** Build and run the Application.

### Ajax Navigation

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add an action method for the `detail` view.

        public ActionResult Details()
        {
            return PartialView();
        }

> **Important**
>
> Notice that the view is returned as partial.

**Step 4** Add the default Hybrid UI View for ASP.NET MVC. The mobile application expects that the immediate child of the application element is a `MobileView`.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileView()
                .Name("Index")
                .Title("Index")
                .Content(() =>
                {
                    %>
                        View Content Template
                        <!--Add button that will `server navigate` the application-->
                        <%: Html.Kendo().MobileButton()
                                .Text("Navigate to Details")
                                .Url("Details", "Home")
                        %>
                    <%
                })
                .Render();
        %>
```
```tab-Razor

        @(Html.Kendo().MobileView()
            .Name("Index")
            .Title("Index")
            .Content(
                @<text>
                    View Content Template

                    <!--Add button that will `server navigate` the application-->
                    @(Html.Kendo().MobileButton()
                        .Text("Navigate to Details")
                        .Url("Details", "Home")
                    )

                </text>
            )
        )
```

**Step 5** Create a new `Details` ASP.NET MVC View file under the `/Views/Home/` folder.

###### Example

```tab-ASPX

        <%Html.Kendo().MobileView()
            .Title("Details")
            .Name("Details")
            .Content(() =>
            {
                %>
                View Details Template
                <!--Add back button that will `server navigate` the application to `Index`-->
                <%: Html.Kendo().MobileButton()
                        .Text("Go Back")
                        .Url("#:back")
                %>
                <%
            })
        %>
```
```tab-Razor

        @(Html.Kendo().MobileView()
            .Title("Details")
            .Name("Details")
            .Content(
                @<text>
                View Details Template
                <!--Add back button that will `server navigate` the application to `Index`-->
                @(Html.Kendo().MobileButton()
                    .Text("Go Back")
                    .Url("#:back")
                )
                </text>
            )
        )
```

**Step 6** Initialize the mobile application inside the `Master/Layout` page.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileApplication()
                .PushState(true)
                .ServerNavigation(false)
        %>
```
```tab-Razor

        @(Html.Kendo().MobileApplication()
            .PushState(true)
            .ServerNavigation(false)
        )
```

**Step 7** Build and run the application.

## Reference

### Instances

You can reference a hybrid Application instance by using the code from the example below. Once a reference is established, use the [hybrid Application API](/api/javascript/mobile/application#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileApplication()
                .ServerNavigation(true)
        )
        <script>
        $(function() {
            //Notice that the casing is important.
            var application = kendo.mobile.application;
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Application:

* [ASP.NET MVC API Reference: ApplicationBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileApplicationBuilder)
* [Overview of the Hybrid UI Application Widget]({% slug overview_hybridapplication %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
