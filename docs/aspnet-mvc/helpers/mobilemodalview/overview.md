---
title: Overview
page_title: How to use the Kendo UI MobileModalView HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile ModalView widget
description: Learn how to initialize Kendo UI MobileModalView for ASP.NET MVC, handle Kendo UI MobileModalView Events, access an existing modalview with MobileModalView HtmlHelper extension documentation.
---

# MobileModalView

The MobileModalView HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile ModalView](/api/mobile/modalview) widget. It allows you to configure the Kendo UI Mobile ModalView
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileModalView for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }
1. Add a Kendo UI MobileButton that will open the modalview.
    - Index.aspx (ASPX)

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

    - Index.cshtml (Razor)

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

1. Add a Kendo UI MobileModalView to the Index view.
    - Index.aspx (ASPX)

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

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileModalView()
                    .Name("ModalView")
                    .HtmlAttributes(new { style = "width: 95%; height: 18em;"  })
                    .Content(
                        @<text>
                            ModalView Content
                        </text>
                    )
            )

1. Initialize the mobile application
    - Index.aspx (ASPX)

            <%: Html.Kendo().MobileApplication()
                    .ServerNavigation(true)
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileApplication()
                .ServerNavigation(true)
            )

1. Build and run the application

## Getting reference to the Kendo UI MobileModalView widget

To get a reference to a modalview instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/modalview#methods) of the modalview.

### Example - get reference to a Kendo UI MobileModalView instance

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
        // Notice that the Name() of the modalview is used to get its client-side instance
        var modalview = $("#ModalView").data("kendoMobileModalView");
    });
    </script>


## Handling Kendo UI MobileModalView events

You can subscribe to all [events](/api/mobile/modalview#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

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
        //Handle the close event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

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
        //Handle the close event
    }
    </script>
