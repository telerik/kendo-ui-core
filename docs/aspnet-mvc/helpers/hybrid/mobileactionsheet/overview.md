---
title: Overview
page_title: Overview | Hybrid UI ActionSheet HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI ActionSheet widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobileactionsheet/overview
slug: overview_hybridactionsheet_aspnetmvc
position: 1
---

# Hybrid ActionSheet HtmlHelper Overview

The hybrid ActionSheet HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI ActionSheet](http://demos.telerik.com/kendo-ui/m/index#actionsheet/index) widget. It allows you to configure the hybrid Kendo UI ActionSheet from server-side code.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI ActionSheet for ASP.NET MVC.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a hybrid Kendo UI ActionSheet to the `Index` view. Like most hybrid Kendo UI widgets, the ActionSheet must be initialized within the hybrid View content.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileView()
                .Name("actionsheet-view")
                .Title("Inbox")
                .Content(() =>
                {
                    %>
                    <!-- Add button to open the actionsheet widget -->
                    <%: Html.Kendo().MobileButton()
                            .Name("button")
                            .Rel(MobileButtonRel.ActionSheet)
                            .Text("Reply")
                            .Url("#inboxActions")
                    %>

                    <% Html.Kendo().MobileActionSheet()
                        .Name("inboxActions")
                        .Popup(popup => popup.Direction(MobilePopupDirection.Left))
                        .Title("Monday Meeting:")
                        .Items(items => {
                            items.Add().Text("Reply");
                            items.Add().Text("Reply All");
                            items.Add().Text("Archive");
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
            .Name("actionsheet-view")
            .Title("Inbox")
            .Content(
                @<text>
                <!-- Add button to open the actionsheet widget -->
                @(Html.Kendo().MobileButton()
                    .Name("button")
                    .Rel(MobileButtonRel.ActionSheet)
                    .Text("Reply")
                    .Url("#inboxActions")
                )

                @(Html.Kendo().MobileActionSheet()
                    .Name("inboxActions")
                    .Popup(popup => popup.Direction(MobilePopupDirection.Left))
                    .Title("Monday Meeting:")
                    .Items(items => {
                        items.Add().Text("Reply");
                        items.Add().Text("Reply All");
                        items.Add().Text("Archive");
                    }))

            </text>)
        )
```

**Step 3** Initialize the mobile application.

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

**Step 4** Build and run the application.

## Event Handling

You can subscribe to all hybrid ActionSheet [events](/api/javascript/mobile/ui/actionsheet#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileActionSheet()
                .Name("MobileActionSheet")
                .Items(items => {
                    items.Add().Text("Reply").Action("replay");
                }))
                .Events(events => events
                    .Open("onOpen")
                )
        %>

        <script>
        function onOpen() {
            //Handle the open event.
        }

        function replay() {
            //Will execute when item with `Reply` title is clicked.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobileActionSheet()
                .Name("MobileActionSheet")
                .Items(items => {
                    items.Add().Text("Reply").Action("replay");
                }))
                .Events(events => events
                    .Open("onOpen")
                )
        )

        <script>
        function onOpen() {
            //Handle the open event.
        }

        function replay() {
            //Will execute when item with `Reply` title is clicked.
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid ActionSheet instance by using the code from the example below. Once a reference is established, use the [hybrid ActionSheet API](/api/javascript/mobile/ui/actionsheet#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileActionSheet()
            .Name("inboxActions")
            .Popup(popup => popup.Direction(MobilePopupDirection.Left))
            .Title("Monday Meeting:")
            .Items(items => {
                items.Add().Text("Reply");
                items.Add().Text("Reply All");
                items.Add().Text("Archive");
            }))
        <script>
        $(function() {
            //Notice that the Name() of the ActionSheet is used to get its client-side instance.
            var actionsheet = $("#inboxActions").data("kendoMobileActionSheet");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ActionSheet:

* [ASP.NET MVC API Reference: ActionSheetBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileActionSheetBuilder)
* [Overview of the Hybrid UI ActionSheet Widget]({% slug overview_hybridactionsheet %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
