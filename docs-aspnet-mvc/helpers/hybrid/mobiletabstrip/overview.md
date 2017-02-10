---
title: Overview
page_title: Overview | Hybrid UI TabStrip HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI TabStrip widget for ASP.NET MVC."
previous_url: /helpers/mobiletabstrip/overview
slug: overview_hybridtabstrip_aspnetmvc
position: 1
---

# Hybrid TabStrip HtmlHelper Overview

The hybrid TabStrip HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI TabStrip](http://demos.telerik.com/kendo-ui/m/index#mobile-tabstrip/index) widget.

It allows you to configure the hybrid Kendo UI TabStrip from server-side code.

## Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI TabStrip for ASP.NET MVC.

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

1. Open `HomeController.cs` and modify the `Index` action method.

    ###### Example

            public ActionResult Index()
            {
                ViewBag.Message = "Welcome to ASP.NET MVC!";

                return View();
            }

1. Add a Kendo UI TabStrip to the `Index` view. Like most hybrid Kendo UI widgets, the TabStrip must be initialized within the hybrid View content.

    ###### Example

    ```tab-ASPX

            <% Html.Kendo().MobileView()
                    .Name("tabstrip-view")
                    .Title("Inbox")
                    .Footer(() =>
                    {
                        %>

                        <%: Html.Kendo().MobileTabStrip()
                                .Items(items =>
                                {
                                    items.Add().Icon("contacts").Text("Profile");
                                    items.Add().Icon("history").Text("Sales");
                                    items.Add().Icon("favorites").Text("Rating");
                                    items.Add().Icon("settings").Text("Settings");
                                })
                        %>
                        <%
                    })
                    .Render();
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().MobileView()
                .Name("tabstrip-view")
                .Title("Inbox")
                .Footer(
                    @<text>

                    @(Html.Kendo().MobileTabStrip()
                        .Items(items =>
                        {
                            items.Add().Icon("contacts").Text("Profile");
                            items.Add().Icon("history").Text("Sales");
                            items.Add().Icon("favorites").Text("Rating");
                            items.Add().Icon("settings").Text("Settings");
                        })
                    )

                </text>)
            )
    ```

1. Initialize the mobile application.

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

1. Build and run the application.

## Event Handling

You can subscribe to all hybrid TabStrip [events](../../../../kendo-ui/api/javascript/mobile/ui/tabstrip#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileTabStrip()
                .Name("tabstrip")
                .Items(items =>
                {
                    items.Add().Icon("contacts").Text("Profile");
                    items.Add().Icon("history").Text("Sales");
                    items.Add().Icon("favorites").Text("Rating");
                    items.Add().Icon("settings").Text("Settings");
                })
                .Events(events => events
                    .Select("onSelect")
                )

        %>

        <script>
        function onSelect() {
            //Handle the select event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobileTabStrip()
            .Name("tabstrip")
            .Items(items =>
            {
                items.Add().Icon("contacts").Text("Profile");
                items.Add().Icon("history").Text("Sales");
                items.Add().Icon("favorites").Text("Rating");
                items.Add().Icon("settings").Text("Settings");
            })
            .Events(events => events
                .Select("onSelect")
            )
        )

        <script>
        function onSelect() {
            //Handle the select event.
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid TabStrip instance by using the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified through the `Name()` method. Once a reference is established, use the [hybrid TabStrip API](../../../../kendo-ui/api/javascript/mobile/ui/tabstrip#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileTabStrip()
            .Name("tabstrip")
            .Items(items =>
            {
                items.Add().Icon("contacts").Text("Profile");
                items.Add().Icon("history").Text("Sales");
                items.Add().Icon("favorites").Text("Rating");
                items.Add().Icon("settings").Text("Settings");
            })
        )
        <script>
        $(function() {
            //Notice that the Name() of the TabStrip is used to get its client-side instance.
            var tabstrip = $("#tabstrip").data("kendoMobileTabStrip");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: TabStripBuilder](/api/Kendo.Mvc.UI.Fluent/MobileTabStripBuilder)
* [Overview of the Hybrid UI TabStrip Widget](http://docs.telerik.com/kendo-ui/controls/hybrid/tabstrip/tabstrip)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
