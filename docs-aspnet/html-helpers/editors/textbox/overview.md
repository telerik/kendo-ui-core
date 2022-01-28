---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TextBox for {{ site.framework }}."
slug: htmlhelpers_overview_textbox
position: 1
---

# TextBox HtmlHelper Overview

The Telerik UI TextBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TextBox widget.

The TextBox provides a set of [default API configuration options](/api/textbox) that can be set during its initialization such as value, placeholder, and so on.

* [Demo page for the TextBox](https://demos.telerik.com/{{ site.platform }}/textbox/index)

## Basic Configuration

The following example demonstrates the basic configuration for the TextBox.

```
	@(Html.Kendo().TextBox()
		.Name("textbox") // The name of the TextBox is mandatory. It specifies the "id" attribute of the TextBox.
		.Value("John Doe") // Set the value of the TextBox.
	)
```

## Functionality and Features

* [Accessibility]({% slug accessibility_textbox_aspnetcore %})

## Events

You can subscribe to the TextBox events. For a complete example on basic TextBox events, refer to the [demo on using the events of the TextBox](https://demos.telerik.com/{{ site.platform }}/textbox/events).

The following example demonstrates how to subscribe to events by a handler name.

```
  @(Html.Kendo().TextBox()
        .Name("textbox")
        .Events(e => e
            .Change("textbox_change")
        )
  )
  <script>
  function textbox_change() {
      // Handle the change event.
  }
  </script>
```

## Referencing Existing Instances

To reference an existing Telerik UI TextBox instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [TextBox client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/textbox#methods) to control its behavior.

The following example demonstrates how to access an existing TextBox instance.

      // Place the following after your Telerik UI TextBox for {{ site.framework }} declaration.
      <script>
      $(function() {
          // The Name() of the TextBox is used to get its client-side instance.
          var textbox = $("#textbox").data("kendoTextBox");
      });
      </script>

## See Also

* [Basic Usage of the TextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/index)
* [Using the API of the TextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/api)
* [Server-Side API](/api/textbox)
