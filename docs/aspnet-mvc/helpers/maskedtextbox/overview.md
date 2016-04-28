---
title: Overview
page_title: Overview | Kendo UI MaskedTextBox HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI MaskedTextBox widget for ASP.NET MVC."
slug: overview_maskedtextboxhelper_aspnetmvc
position: 1
---

# MaskedTextBox HtmlHelper Overview

The MaskedTextBox HtmlHelper extension is a server-side wrapper for the [Kendo UI MaskedTextBox](https://demos.telerik.com/kendo-ui/maskedtextbox/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI MaskedTextBox.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a MaskedTextBox.

###### Example

```tab-ASPX

        <%: Html.Kendo().MaskedTextBox()
                .Name("maskedtextbox") //The name of the MaskedTextBox is mandatory. It specifies the "id" attribute of the widget.
                .Mask("(000) 000-0000") //Set the mask value of the MaskedTextBox.
                .Value("(123) 345-6789") //Set the value of the MaskedTextBox.
        %>
```
```tab-Razor

        @(Html.Kendo().MaskedTextBox()
              .Name("maskedtextbox") //The name of the MaskedTextBox is mandatory. It specifies the "id" attribute of the widget.
              .Mask("(000) 000-0000") //Set the mask value of the MaskedTextBox.
              .Value("(123) 345-6789") //Set the value of the MaskedTextBox.
        )
```

### Define Mask Values

The MaskedTextBox has [a list of predefined mask rules]({% slug overview_kendoui_maskedtextbox_widget%}#configuration-Rules), which can be used to compose the mask of a widget.

The example below demonstrates how to set a `zip code` mask

###### Example

```tab-ASPX

        <%: Html.Kendo().MaskedTextBox()
                .Name("maskedtextbox")
                .Mask("00000-9999") //Set the zip code.
        %>
```
```tab-Razor

        @(Html.Kendo().MaskedTextBox()
              .Name("maskedtextbox")
              .Mask("00000-9999") //Set the zip code.
        )
```

> **Important**
>
> If no mask is defined, the widget allows for any input.

### Define Custom Mask Rules

The MaskedTextBox enables you to define custom mask rules if none of the predefined ones is sufficient. To add a custom rule, use the `Rules` method.

The example below demonstrates how to define a custom rule for the `-` (minus) and `+` (plus) symbols.

###### Example

```tab-ASPX

      <%: Html.Kendo().MaskedTextBox()
              .Name("maskedtextbox")
              .Rules(rules => {
                  rules.Add('~', "/[+-]/");
              })
              .Mask("~0000") //Set a mask with a custom rule.
      %>
```
```tab-Razor

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

You can subscribe to all MaskedTextBox [events](/api/javascript/ui/maskedtextbox#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

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
```tab-Razor

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

```tab-Razor

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
```

## Reference

### Existing Instances

You can reference an existing Kendo UI MaskedTextBox instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [MaskedTextBox API](/api/javascript/ui/maskedtextbox#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI MaskedTextBox for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the MaskedTextBox is used to get its client-side instance.
          var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the MaskedTextBox:

* [ASP.NET MVC API Reference: MaskedTextBoxBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MaskedTextBoxBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI MaskedTextBox Widget]({% slug overview_kendoui_maskedtextbox_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
