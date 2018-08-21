---
title: Overview
page_title: MaskedTextBox | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI MaskedTextBox for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/maskedtextbox
slug: htmlhelpers_maskedtextbox_aspnetcore
position: 1
---

# MaskedTextBox HtmlHelper Overview

The MaskedTextBox HtmlHelper extension is a server-side wrapper for the [Kendo UI MaskedTextBox](https://demos.telerik.com/kendo-ui/maskedtextbox/index) widget.

For more information on the HtmlHelper, refer to the article on the [MaskedTextBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/maskedtextbox/overview).

## Configuration

The following example demonstrates the basic configuration for the MaskedTextBox.

###### Example

```
	@(Html.Kendo().MaskedTextBox()
		.Name("maskedtextbox") //The name of the MaskedTextBox is mandatory. It specifies the "id" attribute of the widget.
		.Mask("(000) 000-0000") //Set the mask value of the MaskedTextBox.
		.Value("(123) 345-6789") //Set the value of the MaskedTextBox.
	)
```

### Define Mask Values

> **Important**
>
> If no mask is defined, the widget allows any input.

The MaskedTextBox has [a list of predefined mask rules](http://docs.telerik.com/kendo-ui/controls/editors/maskedtextbox/overview#configuration-Rules), which can be used to compose the mask of a widget.

The following example demonstrates how to set a `zip code` mask

###### Example

```
    @(Html.Kendo().MaskedTextBox()
          .Name("maskedtextbox")
          .Mask("00000-9999") //Set the zip code.
    )
```

### Define Custom Mask Rules

The MaskedTextBox enables you to define custom mask rules if none of the predefined ones is suitable. To add a custom rule, use the `Rules` method.

> **Important**
>
> The widget supports [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) defined as a string or a JavaScript function.

The following example demonstrates how to define a custom rule for the `-` (minus) and `+` (plus) symbols.

###### Example

```
  @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Rules(rules => {
            rules.Add('~', "/[+-]/");
        })
        .Mask("~0000") //Set a mask with a custom rule.
   )
```

## Event Handling

You can subscribe to all MaskedTextBox [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox#events).

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```
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

## Reference

### Existing Instances

To reference an existing Kendo UI MaskedTextBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [MaskedTextBox API](http://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox#methods) to control its behavior.

The following example demonstrates how to access an existing MaskedTextBox instance.

###### Example

      //Put this after your Kendo UI MaskedTextBox for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the MaskedTextBox is used to get its client-side instance.
          var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
      });
      </script>

## See Also

* [Overview of the Kendo UI MaskedTextBox Widget](http://docs.telerik.com/kendo-ui/controls/editors/maskedtextbox/overview)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
