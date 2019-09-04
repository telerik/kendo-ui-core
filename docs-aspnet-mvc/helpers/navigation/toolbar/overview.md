---
title: Overview
page_title: ToolBar Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI ToolBar HtmlHelper for ASP.NET MVC."
slug: overview_toolbarhelper_aspnetmvc
position: 1
---

# ToolBar HtmlHelper Overview

The Telerik UI ToolBar HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI ToolBar widget.

The ToolBar is designed to hold different types of controls such as buttons, button groups, toggle buttons, split buttons, and other customized elements.

* [Demo page for the ToolBar](https://demos.telerik.com/aspnet-mvc/toolbar)

## Initializing the ToolBar

The following example demonstrates how to define the ToolBar by using the ToolBar HtmlHelper.

    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items => {

            // A regular button.
            items.Add().Type(CommandType.Button).Text("Button").Icon("note");

            // A toggle button.
            items.Add().Type(CommandType.Button).Text("Toggle Button").Togglable(true).Selected(true);

            // The Split button.
            items.Add().Type(CommandType.SplitButton).Text("Split Button").MenuButtons(menuButtons =>
            {
                menuButtons.Add().Text("Option 1").Id("option1");
                menuButtons.Add().Text("Option 2").Id("option2");
                menuButtons.Add().Text("Option 3").Id("option3");
            });

            // The ButtonGroup.
            items.Add().Type(CommandType.ButtonGroup).Buttons(buttons =>
            {
                buttons.Add().Text("Left").Togglable(true).Group("text-align").SpriteCssClass("k-tool-icon k-justifyLeft");
                buttons.Add().Text("Center").Togglable(true).Group("text-align").SpriteCssClass("k-tool-icon k-justifyCenter");
                buttons.Add().Text("Right").Togglable(true).Group("text-align").SpriteCssClass("k-tool-icon k-justifyRight");
            });

            // The separator.
            items.Add().Type(CommandType.Separator);

            // A custom template.
            items.Add().Template("<input id='dropdown' style='width: 150px;' />").Overflow(ShowInOverflowPopup.Never);
        })
    )

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a ToolBar.

    ```ASPX
        <%: Html.Kendo().ToolBar()
            .Resizable(true)   // Enable or disable the resizing feature.

            .Items(items => {  // Define the commands of the helper.
                items.Add().Type(CommandType.Button).Text("Button");
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().ToolBar()
            .Resizable(true)   // Enable or disable the resizing feature.

            .Items(items => {  // Define the commands of the helper.
                items.Add().Type(CommandType.Button).Text("Button");
            })
        )
    ```

## Functionality and Features

The ToolBar provides an option for implementing the [spacer command type]({% slug spacer_toolbarhelper_aspnetmvc %}).

## Events

You can subscribe to all ToolBar [events](/api/toolbar). For a complete example on basic ToolBar events, refer to the [demo on using the events of the ToolBar](https://demos.telerik.com/aspnet-mvc/toolbar/events).

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().ToolBar()
        .Items(items => {  // Define the commands of the ToolBar.
            items.Add().Type(CommandType.Button).Text("Button");
        })
        .Events(e => e
            .Click("onClick")
            .Toggle("onToggle")
            .Open("onOpen")
            .Close("onClose")
            .OverflowOpen("onOverflowOpen")
            .OverflowClose("onOverflowClose")
        )
    %>
    <script>
        function onClick(e) {
            // Handle the click event.
        }

        // ...
    </script>
```
```Razor
    @(Html.Kendo().ToolBar()
        .Items(items => {  // Define the commands of the ToolBar.
            items.Add().Type(CommandType.Button).Text("Button");
        })
        .Events(e => e
            .Click("onClick")
            .Toggle("onToggle")
            .Open("onOpen")
            .Close("onClose")
            .OverflowOpen("onOverflowOpen")
            .OverflowClose("onOverflowClose")
        )
    )
    <script>
        function onClick(e) {
            // Handle the click event.
        }

        // ...
    </script>
```

## Referencing Existing Instances

To reference an existing ToolBar instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ToolBar client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar#methods) to control its behavior.

    // Place the following after the ToolBar for ASP.NET MVC declaration.
    <script>
        $(function() {
            var toolbar = $("#container").data("kendoToolBar");
        });
    </script>

## See Also

* [Basic Usage of the ToolBar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/toolbar)
* [Using the API of the ToolBar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/toolbar/api)
* [ToolBarBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ToolBarBuilder)
* [ToolBar Server-Side API](/api/toolbar)
* [ToolBar Client-Side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar)
