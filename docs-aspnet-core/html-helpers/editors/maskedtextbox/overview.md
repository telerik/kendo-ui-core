---
title: Overview
page_title: MaskedTextBox Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI MaskedTextBox for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/maskedtextbox
slug: htmlhelpers_maskedtextbox_aspnetcore
position: 1
---

# MaskedTextBox HtmlHelper Overview

The Telerik UI MaskedTextBox HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI MaskedTextBox widget.

The MaskedTextBox enables a controlled text input that is based on a specific format.

* [Demo page for the MaskedTextBox](https://demos.telerik.com/aspnet-core/maskedtextbox/index)

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

The MaskedTextBox provides options for [using predefined and custom masks rules and validate user input]({% slug validation_maskedtextbox_aspnetcore %}).

## Events

You can subscribe to all MaskedTextBox events. For a complete example on basic MaskedTextBox events, refer to the [demo on using the events of the MaskedTextBox](https://demos.telerik.com/aspnet-core/maskedtextbox/events).

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

## Referencing Existing Instances

To reference an existing Telerik UI MaskedTextBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [MaskedTextBox API](/api/maskedtextbox) to control its behavior.

The following example demonstrates how to access an existing MaskedTextBox instance.

      // Place the following after your Telerik UI MaskedTextBox for ASP.NET Core declaration.
      <script>
      $(function() {
          // The Name() of the MaskedTextBox is used to get its client-side instance.
          var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
      });
      </script>

## See Also

* [Basic Usage of the MaskedTextBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/maskedtextbox/index)
* [Using the API of the MaskedTextBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/maskedtextbox/api)
* [Server-Side API](/api/maskedtextbox)
