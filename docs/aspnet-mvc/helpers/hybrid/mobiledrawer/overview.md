---
title: Overview
page_title: Overview | Hybrid UI Drawer HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI Drawer widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobiledrawer/overview
slug: overview_hybriddrawer_aspnetmvc
position: 1
---

# Hybrid Drawer HtmlHelper Overview

The hybrid Drawer HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI Drawer](http://demos.telerik.com/kendo-ui/m/index#drawer/index) widget. It allows you to configure the hybrid Kendo UI Drawer from server-side code.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI Drawer for ASP.NET MVC.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add the default application view. By default, the Drawer is revealed at the left side when swiping from left to right.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileView()
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
        %>
```
```tab-Razor

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
```

**Step 4** Add a hybrid Drawer to the `Index` view.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileDrawer()
                .Name("my-drawer")
                .HtmlAttributes(new { style = "width: 270px" })
                .Views("drawer-view") //A list of the view ids on which the drawer will appear
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
        %>
```
```tab-Razor

        @(Html.Kendo().MobileDrawer()
                .Name("my-drawer")
                .HtmlAttributes(new { style = "width: 270px" })
                .Views("drawer-home") //A list of the view ids on which the drawer will appear
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

You can subscribe to all hybrid Drawer [events](/api/javascript/mobile/ui/drawer#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileDrawer()
                .Name("MobileDrawer")
                .Events(events => events
                    .BeforeShow("onBeforeShow")
                )
        %>

        <script>
        function onBeforeShow() {
            //Handle the show event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobileDrawer()
                .Name("MobileDrawer")
                .Events(events => events
                    .BeforeShow("onBeforeShow")
                )
        )

        <script>
        function onBeforeShow() {
            //Handle the show event.
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid Drawer instance by using the code from the example below. Once a reference is established, use the [hybrid Drawer API](/api/javascript/mobile/ui/drawer#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileDrawer()
                .Name("MobileDrawer")
        )
        <script>
        $(function() {
            //Notice that the Name() of the Drawer is used to get its client-side instance.
            var drawer = $("#Mobiledrawer").data("kendoMobileDrawer");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Drawer:

* [ASP.NET MVC API Reference: DrawerBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileDrawerBuilder)
* [Overview of the Hybrid UI Drawer Widget]({% slug overview_hybriddrawer %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
