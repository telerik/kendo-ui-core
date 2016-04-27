---
title: Overview
page_title: Overview | Hybrid UI ButtonGroup HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI ButtonGroup widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobilebuttongroup/overview
slug: overview_hybridbuttongroup_aspnetmvc
position: 1
---

# Hybrid ButtonGroup HtmlHelper Overview

The hybrid ButtonGroup HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI ButtonGroup](http://demos.telerik.com/kendo-ui/m/index#buttongroup/mobile) widget. It allows you to configure the hybrid Kendo UI Button from server-side code.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI ButtonGroup for ASP.NET MVC.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

**Step 3** Add a hybrid Kendo UI ButtonGroup to the `Index` view. Like most hybrid Kendo UI widgets, the ButtonGroup must be initialized within the hybrid View content.

###### Example

```tab-ASPX

       <% Html.Kendo().MobileView()
                .Name("buttongroup-view")
                .Title("Inbox")
                .Content(() =>
                {
                    %>

                    <%: Html.Kendo().MobileButtonGroup()
                            .Name("select-period")
                            .Items(items =>
                            {
                                items.Add().Text("Month");
                                items.Add().Text("Quarter");
                                items.Add().Text("Year");
                            })
                            .Index(0)
                    %>
                    <%
                })
                .Render();
        %>
```
```tab-Razor

        @(Html.Kendo().MobileView()
            .Name("buttongroup-view")
            .Title("Inbox")
            .Content(
                @<text>

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

## Event Handling

You can subscribe to all hybrid ButtonGroup [events](/api/javascript/mobile/ui/buttongroup#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileButtonGroup()
                .Name("select-period")
                .Items(items =>
                {
                    items.Add().Text("Month");
                    items.Add().Text("Quarter");
                    items.Add().Text("Year");
                })
                .Index(0)
                .Events(events => events.Select("onSelect"))
        %>

        <script>
        function onSelect() {
            //Handle the select event
        }
        </script>
```
```tab-Razor

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
            //Handle the select event
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid ButtonGroup instance by using the code from the example below. Once a reference is established, use the [hybrid ButtonGroup API](/api/javascript/mobile/ui/buttongroup#methods) to control its behavior.

###### Example

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
            // Notice that the Name() of the buttongroup is used to get its client-side instance
            var buttongroup = $("#select-period").data("kendoMobileButtonGroup");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ButtonGroup:

* [ASP.NET MVC API Reference: Hybrid UI ButtonGroupBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileButtonGroupBuilder)
* [Overview of the Hybrid UI ButtonGroup Widget]({% slug overview_hybridbuttongroup %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
