---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TextBox for {{ site.framework }}."
slug: htmlhelpers_overview_textbox
position: 1
---

# {{ site.framework }} TextBox Overview

{% if site.core %}
The Telerik UI TextBox TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TextBox widget.
{% else %}
The Telerik UI TextBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TextBox widget.
{% endif %}

The TextBox provides a set of [default API configuration options](/api/textbox) that can be set during its initialization such as value, placeholder, and so on.

* [Demo page for the TextBox HtmlHelper](https://demos.telerik.com/{{ site.platform }}/textbox/index)
{% if site.core %}
* [Demo page for the TextBox TagHelper](https://demos.telerik.com/aspnet-core/textbox/tag-helper)
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration for the TextBox.

```HtmlHelper
	@(Html.Kendo().TextBox()
		.Name("textbox") // The name of the TextBox is mandatory. It specifies the "id" attribute of the TextBox.
		.Value("John Doe") // Set the value of the TextBox.
	)
```
{% if site.core %}
```TagHelper
    <kendo-textbox name="textbox"
               value="John Doe">
    </kendo-textbox>
```
{% endif %}

## Functionality and Features

* [Accessibility]({% slug accessibility_textbox_aspnetcore %})

## Events

You can subscribe to the TextBox events. For a complete example on basic TextBox events, refer to the [demo on using the events of the TextBox](https://demos.telerik.com/{{ site.platform }}/textbox/events).

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
  @(Html.Kendo().TextBox()
        .Name("textbox")
        .Events(e => e
            .Change("textbox_change")
        )
  )
```
{% if site.core %}
```TagHelper
<kendo-textbox name="textbox"
               on-change="textbox_change">
</kendo-textbox>
```
{% endif %}
```script.js
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
{% if site.core %}
* [Basic Usage of the TextBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/textbox/tag-helper)
{% endif %}
* [Using the API of the TextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/api)
* [Server-Side API](/api/textbox)
