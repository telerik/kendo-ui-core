---
title: ModalView
page_title: ModalView Overview
description: "Learn the basics when working with the hybrid Telerik UI ModalView HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobilemodalview/overview, /helpers/hybrid/mobilemodalview
slug: overview_hybridmodalview_aspnetmvc
---

# Hybrid ModalView HtmlHelper Overview

The hybrid Telerik UI ModalView HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI ModalView widget.

The ModalView presents a self-contained functionality in the context of the current task.

* [Demo page for the ModalView](https://demos.telerik.com/kendo-ui/m/index#modalview/index)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

1. Add a hybrid Telerik UI Button to open the ModalView.

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

1. Add a Telerik UI ModalView to the `Index` view.

        @(Html.Kendo().MobileModalView()
            .Name("ModalView")
            .HtmlAttributes(new { style = "width: 95%; height: 18em;"  })
            .Content(
                @<text>
                    ModalView Content
                </text>
            )
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid ModalView [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/view#events).

The following example demonstrates how to subscribe to events by a handler name.

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
            // Handle the close event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid ModalView instance by using the code from the following example. Once a reference is established, use the [hybrid ModalView client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/view#methods) to control its behavior.

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
            // The Name() of the ModalView is used to get its client-side instance.
            var modalview = $("#ModalView").data("kendoMobileModalView");
        });
    </script>

## See Also

* [Hybrid ModalViewBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileModalViewBuilder)
