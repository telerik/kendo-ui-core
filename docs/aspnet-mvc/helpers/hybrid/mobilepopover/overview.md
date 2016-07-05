---
title: Overview
page_title: Overview | Hybrid UI PopOver HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI PopOver widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobilepopover/overview
slug: overview_hybridpopover_aspnetmvc
position: 1
---

# Hybrid PopOver HtmlHelper Overview

The hybrid PopOver HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI PopOver](http://demos.telerik.com/kendo-ui/m/index#popover/index) widget. It allows you to configure the hybrid Kendo UI PopOver from server-side code.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI PopOver for ASP.NET MVC.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

**Step 3** Add a Kendo UI PopOver to the `Index` view. Like most hybrid Kendo UI widgets, the PopOver must be initialized within the hybrid View content.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileView()
                .Name("popover-view")
                .Title("Inbox")
                .Header(() =>
                {
                    %>
                    <%: Html.Kendo().MobileButton()
                        .Align(MobileButtonAlign.Right)
                        .Url("#popover") //the id of the popover
                        .Text("Select location")
                        .Rel(MobileButtonRel.PopOver) //rel must be set to open the popover
                    %>
                    <%
                })
                .Content(() =>
                {
                    %>

                    <% Html.Kendo().MobilePopOver()
                        .Name("popover")
                           .Popup(popup => popup.Width("20em").Height("10.6em"))
                           .Content(() =>
                            {
                                %>
                                PopOver content
                                <%
                            })
                           .Render();
                    %>
                    <%
                })
                .Render();
        %>
```
```tab-Razor

        @(Html.Kendo().MobileView()
                .Name("popover-view")
                .Title("Inbox")
                .Header(obj =>
                    Html.Kendo().MobileButton()
                        .Align(MobileButtonAlign.Right)
                        .Url("#popover") //the id of the popover
                        .Text("Select location")
                        .Rel(MobileButtonRel.PopOver) //rel must be set to open the popover
                )
                .Content(obj =>
                    Html.Kendo().MobilePopOver()
                        .Name("popover")
                        .Popup(popup => popup.Width("20em").Height("10.6em"))
                        .Content(
                            @<text>
                                PopOver content
                            </text>)
                )
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

You can subscribe to all hybrid PopOver [events](/api/javascript/mobile/ui/popover#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <% Html.Kendo().MobilePopOver()
                .Name("popOver")
                .Content(() =>
                {
                    %>
                    PopOver content
                    <%
                })
                .Events(events => events
                    .Close("onClose")
                )
                .Render();
        %>

        <script>
        function onClose() {
            //Handle the close event
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobilePopOver()
            .Name("popOver")
            .Content(
                @<text>
                    PopOver content
                </text>)
                .Events(events => events
                    .Close("onClose")
                )
        )

        <script>
        function onClose() {
            //Handle the close event
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid PopOver instance by using the code from the example below. Once a reference is established, use the [hybrid PopOver API](/api/javascript/mobile/ui/popover#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobilePopOver()
                .Name("popOver")
                .Content(
                @<text>
                    PopOver content
                </text>)
        )
        <script>
        $(function() {
            // Notice that the Name() of the popover is used to get its client-side instance
            var popover = $("#popOver").data("kendoMobilePopOver");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the PopOver:

* [ASP.NET MVC API Reference: PopOverBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobilePopOverBuilder)
* [Overview of the Hybrid UI PopOver Widget]({% slug overview_hybridpopover %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
