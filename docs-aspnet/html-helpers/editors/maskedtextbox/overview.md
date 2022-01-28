---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI MaskedTextBox for {{ site.framework }}."
previous_url: /helpers/html-helpers/maskedtextbox, /helpers/editors/maskedtextbox/overview
slug: htmlhelpers_maskedtextbox_aspnetcore
position: 1
---

# MaskedTextBox HtmlHelper Overview

The Telerik UI MaskedTextBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI MaskedTextBox widget.

The MaskedTextBox enables a controlled text input that is based on a specific format. The helper enables you to define its value and mask value, and set custom mask rules, prompt characters, and culture names. Each mask can contain mask rules and mask literals. The mask literals are automatically entered for the user and cannot be removed. You can also use the MaskedTextBox predefined rules which specify the required or optional digit, letter, or character input.

* [Demo page for the MaskedTextBox](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/index)

## Basic Configuration

The following example demonstrates the basic configuration for the MaskedTextBox.

```
	@(Html.Kendo().MaskedTextBox()
		.Name("maskedtextbox") // The name of the MaskedTextBox is mandatory. It specifies the "id" attribute of the MaskedTextBox.
		.Mask("(000) 000-0000") // Set the mask value of the MaskedTextBox.
		.Value("(123) 345-6789") // Set the value of the MaskedTextBox.
	)
```

## Functionality and Features

* [Mask rules]({% slug validation_maskedtextbox_aspnetcore %})
* [Globalization]({% slug globalization_maskedtextbox_aspnetcore %})
* [Accessibility]({% slug accessibility_maskedtextbox_aspnetcore %})

## Events

You can subscribe to all MaskedTextBox events. For a complete example on basic MaskedTextBox events, refer to the [demo on using the events of the MaskedTextBox](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/events).

The following example demonstrates how to subscribe to events by a handler name.

```
  @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Events(e => e
            .Change("maskedtextbox_change")
        )
  )
  <script>
  function maskedtextbox_change() {
      // Handle the change event.
  }
  </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Events(e => e
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Telerik UI MaskedTextBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [MaskedTextBox client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox#methods) to control its behavior.

The following example demonstrates how to access an existing MaskedTextBox instance.

      // Place the following after your Telerik UI MaskedTextBox for {{ site.framework }} declaration.
      <script>
      $(function() {
          // The Name() of the MaskedTextBox is used to get its client-side instance.
          var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
      });
      </script>

## See Also

* [Basic Usage of the MaskedTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/index)
* [Using the API of the MaskedTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/api)
* [Server-Side API](/api/maskedtextbox)
