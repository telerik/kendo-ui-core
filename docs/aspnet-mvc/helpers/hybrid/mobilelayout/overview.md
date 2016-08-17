---
title: Overview
page_title: Overview | Hybrid UI Layout HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI Layout widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobilelayout/overview
slug: overview_hybridlayout_aspnetmvc
position: 1
---

# Hybrid Layout HtmlHelper Overview

The hybrid Layout HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI Layout](/api/javascript/mobile/ui/layout) widget. It allows you to configure the hybrid Kendo UI Layout from server-side code.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI Layout for ASP.NET MVC.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a Kendo UI Layout to the `Index` view.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileLayout()
                .Name("layout") //Layout `id`
                .Platform("ios")
                .Header(() =>
                {
                    //Layout header template
                    Html.Kendo().MobileNavBar()
                        .Content(navbar =>
                        {
                            %>
                            <%: Html.Kendo().MobileBackButton()
                                    .Align(MobileButtonAlign.Left)
                                    .HtmlAttributes(new { @class = "nav-button" })
                                    .Text("Back")
                            %>
                            <%: navbar.ViewTitle("iOS Platform")%>
                            <%
                        })
                        .Render();
                })
                .Footer(() =>
                {
                    //Layout footer template
                    Html.Kendo().MobileTabStrip()
                        .Items(items => {
                            items.Add().Icon("contacts").Text("Profile");
                            items.Add().Icon("settings").Text("Settings");
                        })
                        .Render();
                })
               .Render();
        %>
```
```tab-Razor

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
```

**Step 4** Add the View that will use the Layout.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileView()
                .Name("layoutView")
                .Layout("layout") // the `Name` of the layout
                .Content(() =>
                {
                    %>
                    <p>
                        This examples shows the platform specific layouts.
                        Change the OS to see how the header and footer changes.
                    </p>
                    <%
                })
                .Render();
        %>
```
```tab-Razor

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
```

**Step 5** Initialize the mobile application.

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

**Step 6** Build and run the application.

## Event Handling

You can subscribe to all hybrid Layout [events](/api/javascript/mobile/ui/layout#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileLayout()
                .Name("MobileLayout")
                .Events(events => events
                    .Show("onShow")
                )
        %>

        <script>
        function onShow() {
            //Handle the show event
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobileLayout()
                .Name("MobileLayout")
                .Events(events => events
                    .Show("onShow")
                )
        )

        <script>
        function onShow() {
            //Handle the show event
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid Layout instance by using the code from the example below. Once a reference is established, use the [hybrid Layout API](/api/javascript/mobile/ui/layout#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileLayout()
                .Name("MobileLayout")
        )
        <script>
        $(function() {
            // Notice that the Name() of the layout is used to get its client-side instance
            var layout = $("#MobileLayout").data("kendoMobileLayout");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Layout:

* [ASP.NET MVC API Reference: LayoutBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileLayoutBuilder)
* [Overview of the Hybrid UI Layout Widget]({% slug layout_hybridkendoui %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
