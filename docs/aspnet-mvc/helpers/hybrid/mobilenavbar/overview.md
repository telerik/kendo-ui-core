---
title: Overview
page_title: Overview | Hybrid UI NavBar HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI NavBar widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobilelanavbar/overview
position: 1
---

# Hybrid NavBar HtmlHelper Overview

The hybrid NavBar HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI NavBar](http://demos.telerik.com/kendo-ui/m/index#navbar/index) widget. It allows you to configure the hybrid Kendo UI NavBar from server-side code.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI NavBar for ASP.NET MVC.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

       public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a hybrid NavBar to the `Index` view. Like most hybrid Kendo UI widgets, the NavBar must be initialized within the hybrid View content.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileView()
                .Name("navbar-home")
                .Title("Index")
                .Header(() =>
                {
                    %>
                    <% Html.Kendo().MobileNavBar()
                           .Content(navbar =>
                            {
                                %>
                                <%: Html.Kendo().MobileBackButton()
                                        .Align(MobileButtonAlign.Left)
                                        .Text("Back")
                                %>
                                <%: navbar.ViewTitle("") %>
                                <%
                            })
                           .Render();
                    %>
                    <%
                })
                .Content(() =>
                {
                    %>
                    View Content
                    <%
                })
                .Render();
        %>
```
```tab-Razor

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
```

**Step 4** Initialize the mobile application.

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

**Step 5** Build and run the application.

## Reference

### Instances

You can reference a hybrid NavBar instance by using the code from the example below. Once a reference is established, use the [hybrid NavBar API](/api/javascript/mobile/ui/navbar#methods) to control its behavior.

###### Example

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
            //Notice that the Name() of the NavBar is used to get its client-side instance.
            var navbar = $("#MobileNavBar").data("kendoMobileNavBar");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the NavBar:

* [ASP.NET MVC API Reference: NavBarBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileNavBarBuilder)
* [Overview of the Hybrid UI NavBar Widget]({% slug overview_hybridnavbar %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
