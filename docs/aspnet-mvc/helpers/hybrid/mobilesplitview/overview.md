---
title: Overview
page_title: Overview | Hybrid UI SplitView HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI SplitView widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobilesplitview/overview
slug: overview_hybridsplitview_aspnetmvc
position: 1
---

# Hybrid SplitView HtmlHelper Overview

The hybrid SplitView HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI SplitView](http://demos.telerik.com/kendo-ui/m/index#splitview/index) widget. It allows you to configure the hybrid Kendo UI SplitView from server-side code.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI SplitView for ASP.NET MVC.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a Kendo UI SplitView to the `Index` view.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileSplitView()
                .Name("MobileSplitView") //SplitView `id`
                .Panes(panes =>
                {
                    //Add the side pane.
                    panes.Add().Content(() =>
                        {
                            %>
                            <% Html.Kendo().MobileView()
                                    .Title("Side View")
                                    .Content("Side View Content")
                                    .Render();
                            %>
                            <%
                        }
                    );
                    //Add the main pane.
                    panes.Add().Content(() =>
                        {
                            %>
                            <% Html.Kendo().MobileView()
                                    .Title("Main View")
                                    .Content("Main View Content")
                                    .Render();
                            %>
                            <%
                        }
                    );
                })
                .Render();
        %>
```
```tab-Razor

        @(Html.Kendo().MobileSplitView()
                .Name("MobileSplitView") //SplitView `id`
                .Panes(panes =>
                {
                    //Add the side pane.
                    panes.Add().Content(
                        @<text>
                            @(Html.Kendo().MobileView()
                                    .Title("Side View")
                                    .Content("Side View Content")
                            )
                        </text>
                    );
                    //Add the main pane.
                    panes.Add().Content(
                        @<text>
                            @(Html.Kendo().MobileView()
                                    .Title("Main View")
                                    .Content("Main View Content")
                            )
                        </text>
                    );
                })
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

You can subscribe to all hybrid SplitView [events](/api/javascript/mobile/ui/splitview#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileSplitView()
                .Name("MobileSplitView")
                .Panes(panes =>
                {
                    panes.Add().Content(() =>
                        {
                            %>
                            <% Html.Kendo().MobileView()
                                    .Title("Side View")
                                    .Content("Side View Content")
                                    .Render();
                            %>
                            <%
                        }
                    );
                })
                .Events(events => events
                    .Init("onInit")
                )
                .Render();
        %>

        <script>
        function onInit() {
            //Handle the init event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobileSplitView()
                .Name("MobileSplitView")
                .Panes(panes =>
                {
                    panes.Add().Content(
                        @<text>
                            @(Html.Kendo().MobileView()
                                    .Title("Side View")
                                    .Content("Side View Content")
                            )
                        </text>
                    );
                })
                .Events(events => events
                    .Init("onInit")
                )
        )

        <script>
        function onInit() {
            //Handle the init event.
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid SplitView instance by using the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method. Once a reference is established, use the [hybrid SplitView API](/api/javascript/mobile/ui/splitview#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileSplitView()
                .Name("MobileSplitView") //SplitView `id`
                .Panes(panes =>
                {
                    panes.Add().Content(
                        @<text>
                            @(Html.Kendo().MobileView()
                                    .Title("Side View")
                                    .Content("Side View Content")
                            )
                        </text>
                    );
                })
        )
        <script>
        $(function() {
            //Notice that the Name() of the SplitView is used to get its client-side instance.
            var splitview = $("#MobileSplitView").data("kendoMobileSplitView");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the SplitView:

* [ASP.NET MVC API Reference: SplitViewBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileSplitViewBuilder)
* [Overview of the Hybrid UI SplitView Widget]({% slug overview_hybridsplitview %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
