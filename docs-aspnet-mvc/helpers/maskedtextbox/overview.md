---
title: Overview
page_title: MaskedTextBox | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI MaskedTextBox widget for ASP.NET MVC."
slug: overview_maskedtextboxhelper_aspnetmvc
position: 1
---

# MaskedTextBox HtmlHelper Overview

The MaskedTextBox HtmlHelper extension is a server-side wrapper for the [Kendo UI MaskedTextBox](https://demos.telerik.com/kendo-ui/maskedtextbox/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI MaskedTextBox.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Add a MaskedTextBox.

    ```ASPX
        <%: Html.Kendo().MaskedTextBox()
            .Name("maskedtextbox") //The name of the MaskedTextBox is mandatory. It specifies the "id" attribute of the widget.
            .Mask("(000) 000-0000") //Set the mask value of the MaskedTextBox.
            .Value("(123) 345-6789") //Set the value of the MaskedTextBox.
        %>
    ```
    ```Razor
        @(Html.Kendo().MaskedTextBox()
                .Name("maskedtextbox") //The name of the MaskedTextBox is mandatory. It specifies the "id" attribute of the widget.
                .Mask("(000) 000-0000") //Set the mask value of the MaskedTextBox.
                .Value("(123) 345-6789") //Set the value of the MaskedTextBox.
        )
    ```

### Define Mask Values

The MaskedTextBox has [a list of predefined mask rules](http://docs.telerik.com/kendo-ui/controls/editors/maskedtextbox/overview#configuration-Rules), which can be used to compose the mask of a widget.

The following example demonstrates how to set a `zip code` mask

```ASPX
    <%: Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Mask("00000-9999") //Set the zip code.
    %>
```
```Razor
    @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Mask("00000-9999") //Set the zip code.
    )
```

> **Important**
>
> If no mask is defined, the widget allows any input.

### Define Custom Mask Rules

The MaskedTextBox enables you to define custom mask rules if none of the predefined ones is suitable. To add a custom rule, use the `Rules` method.

The following example demonstrates how to define a custom rule for the `-` (minus) and `+` (plus) symbols.

```ASPX
    <%: Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Rules(rules => {
            rules.Add('~', "/[+-]/");
        })
        .Mask("~0000") //Set a mask with a custom rule.
    %>
```
```Razor
    @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Rules(rules => {
            rules.Add('~', "/[+-]/");
        })
        .Mask("~0000") //Set a mask with a custom rule.
    )
```

> **Important**
>
> Widgets supports [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) defined as a string or a JavaScript function.

## Event Handling

You can subscribe to all MaskedTextBox [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().MaskedTextBox()
            .Name("maskedtextbox")
            .Events(e => e
                .Change("maskedtextbox_change")
            )
    %>
    <script>
        function maskedtextbox_change() {
            //Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Events(e => e
            .Change("maskedtextbox_change")
        )
    )
    <script>
        function maskedtextbox_change() {
            //Handle the change event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

    @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Events(e => e
            .Change(@<text>
                function() {
                    //Handle the change event inline.
                }
            </text>)
        )
    )

## Reference

### Existing Instances

To reference an existing Kendo UI MaskedTextBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MaskedTextBox API](http://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI MaskedTextBox for ASP.NET MVC declaration.
    <script>
        $(function() {
            //Notice that the Name() of the MaskedTextBox is used to get its client-side instance.
            var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
        });
    </script>

## See Also

* [Telerik UI for ASP.NET MVC API Reference: MaskedTextBoxBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MaskedTextBoxBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI MaskedTextBox Widget](http://docs.telerik.com/kendo-ui/controls/editors/maskedtextbox/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
