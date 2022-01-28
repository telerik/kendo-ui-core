---
title: Overview
page_title: Overview
description: "How to use the TextArea component for {{ site.framework }}."
slug: htmlhelpers_overview_textarea
position: 1
---

# TextArea HtmlHelper Overview

The Telerik UI TextArea HtmlHelper for {{ site.framework }} is a server-side wrapper for the [Kendo UI TextArea](https://demos.telerik.com/kendo-ui/textarea/index) widget.

The TextArea provides a set of [default API configuration options](/api/textarea) that can be set during its initialization such as value, placeholder, and so on.

* [Demo page for the TextArea](https://demos.telerik.com/{{ site.platform }}/textarea/index)

## Basic Configuration

The following example demonstrates the basic configuration for the TextArea.

```
	@(Html.Kendo().TextArea()
		.Name("textarea") // The name of the TextArea is mandatory. It specifies the "id" attribute of the TextArea.
		.Value("John Doe") // Set the value of the TextArea.
        .Rows(5) // Sets the number of rows
	)
```

## Functionality and Features

* [Labels]({% slug htmlhelpers_textarea_labels %})
* [RTL Support]({% slug rtl_textarea_aspnetcore %})

## Events

Here is a [demo on using some basic events of the TextArea](https://demos.telerik.com/{{ site.platform }}/textarea/events). For a full list, refer to the TextArea events documentation in the API section.

The following example demonstrates how to subscribe to events by a handler name.

```
  @(Html.Kendo().TextArea()
        .Name("textarea")
        .Events(e => e
            .Change("textarea_change")
        )
  )
  <script>
  function textarea_change() {
      // Handle the change event.
  }
  </script>
```

## Referencing Existing Instances

To reference an existing Telerik UI TextArea instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [TextArea client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/textarea#methods) to control its behavior.

The following example demonstrates how to access an existing TextArea instance.

      // Place the following after your Telerik UI TextArea for {{ site.framework }} declaration.
      <script>
      $(function() {
          // The Name() of the TextArea is used to get its client-side instance.
          var textarea = $("#textarea").data("kendoTextArea");
      });
      </script>

## See Also

* [Basic Usage of the TextArea HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/index)
* [Using the API of the TextArea HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/api)
* [Server-Side API](/api/textarea)
