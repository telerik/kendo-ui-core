---
title: Overview
page_title: Overview | Hybrid UI ModalView HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI ModalView widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobilemodalview/overview
slug: overview_hybridmodalview_aspnetmvc
position: 1
---

# ModalView HtmlHelper Overview

The hybrid ModalView HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI ModalView](http://demos.telerik.com/kendo-ui/m/index#modalview/index) widget. It allows you to configure the hybrid Kendo UI ModalView from server-side code.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the hybrid Kendo UI ModalView for ASP.NET MVC.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

**Step 3** Add a hybrid Kendo UI Button to open the ModalView.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileView()
                .Name("modalview-view")
                .Content(() =>
                {
                    %>
                    <%: Html.Kendo().MobileButton()
                            .Text("Open")
                            .Rel(MobileButtonRel.ModalView)
                            .Url("#ModalView")
                    %>
                    <%
                })
                .Render();
        %>
```
```tab-Razor

        @(Html.Kendo().MobileView()
            .Name("modalview-view")
            .Content(
                @<text>
                    @(Html.Kendo().MobileButton()
                        .Text("Open")
                        .Rel(MobileButtonRel.ModalView)
                        .Url("#ModalView")
                    )
                </text>)
        )
```

**Step 4** Add a Kendo UI ModalView to the `Index` view.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileModalView()
                .Name("ModalView")
                .HtmlAttributes(new { style = "width: 95%; height: 18em;"  })
                .Content(() =>
                {
                    %>
                    ModalView Content
                    <%
                })
                .Render();
        %>
```
```tab-Razor

        @(Html.Kendo().MobileModalView()
                .Name("ModalView")
                .HtmlAttributes(new { style = "width: 95%; height: 18em;"  })
                .Content(
                    @<text>
                        ModalView Content
                    </text>
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

You can subscribe to all hybrid ModalView [events](/api/javascript/mobile/ui/modalview#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileModalView()
                .Name("ModalView")
                .HtmlAttributes(new { style = "width: 95%; height: 18em;"  })
                .Content(() =>
                {
                    %>
                    ModalView Content
                    <%
                })
                .Events(events => events
                    .Close("onClose")
                )
                .Render();
        %>

        <script>
        function onClose() {
            //Handle the close event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobileModalView()
                .Name("ModalView")
                .HtmlAttributes(new { style = "width: 95%; height: 18em;"  })
                .Content(
                    @<text>
                        ModalView Content
                    </text>
                )
                .Events(events => events
                    .Close("onClose")
                )
        )

        <script>
        function onClose() {
            //Handle the close event.
        }
        </script>
```

## Reference

### Instances

You can reference a hybrid ModalView instance by using the code from the example below. Once a reference is established, use the [hybrid ModalView API](/api/javascript/mobile/ui/modalview#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileModalView()
                .Name("ModalView")
                .HtmlAttributes(new { style = "width: 95%; height: 18em;"  })
                .Content(
                    @<text>
                        ModalView Content
                    </text>
                )
        )
        <script>
        $(function() {
            //Notice that the Name() of the ModalView is used to get its client-side instance.
            var modalview = $("#ModalView").data("kendoMobileModalView");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ModalView:

* [ASP.NET MVC API Reference: ModalViewBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileModalViewBuilder)
* [Overview of the Hybrid UI ModalView Widget]({% slug overview_hybridmodalview %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
