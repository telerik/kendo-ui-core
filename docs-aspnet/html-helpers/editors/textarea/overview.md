---
title: Overview
page_title: Overview
description: "How to use the TextArea component for {{ site.framework }}."
slug: htmlhelpers_overview_textarea
position: 1
---

# {{ site.framework }} TextArea Overview

{% if site.core %}
The Telerik UI TextArea TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TextArea widget.
{% else %}
The Telerik UI TextArea HtmlHelper for {{ site.framework }} is a server-side wrapper for the [Kendo UI TextArea](https://demos.telerik.com/kendo-ui/textarea/index) widget.
{% endif %}

The TextArea provides a set of [default API configuration options](/api/textarea) that can be set during its initialization such as value, placeholder, and so on.

* [Demo page for the TextArea HtmlHelper](https://demos.telerik.com/{{ site.platform }}/textarea/index)
{% if site.core %}
* [Demo page for the TextArea TagHelper](https://demos.telerik.com/aspnet-core/textarea/tag-helper)
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration for the TextArea.

```HtmlHelper
	@(Html.Kendo().TextArea()
		.Name("textarea") // The name of the TextArea is mandatory. It specifies the "id" attribute of the TextArea.
		.Value("John Doe") // Set the value of the TextArea.
        .Rows(5) // Sets the number of rows
	)
```
{% if site.core %}
```TagHelper
    <kendo-textarea name="textarea"
               value="John Doe"
                rows="5">
    </kendo-textarea>
```
{% endif %}
## Functionality and Features

* [Labels]({% slug htmlhelpers_textarea_labels %})
* [RTL Support]({% slug rtl_textarea_aspnetcore %})

## Events

Here is a [demo on using some basic events of the TextArea](https://demos.telerik.com/{{ site.platform }}/textarea/events). For a full list, refer to the TextArea events documentation in the API section.

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
  @(Html.Kendo().TextArea()
        .Name("textarea")
        .Events(e => e
            .Change("textarea_change")
        )
  )
```
{% if site.core %}
```TagHelper
<kendo-textarea name="textarea"
                on-change="textarea-change">
</kendo-textarea>
```
{% endif %}
```script
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
{% if site.core %}
* [Basic Usage of the TextArea TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/textarea/tag-helper)
{% endif %}
* [Using the API of the TextArea HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/api)
* [Server-Side API](/api/textarea)
