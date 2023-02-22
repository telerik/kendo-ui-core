---
title: Overview
page_title: Overview
description: "How to use the TextArea component for {{ site.framework }}."
slug: htmlhelpers_overview_textarea
position: 0
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

* [Labels]({% slug htmlhelpers_textarea_labels %})&mdash;You can integrate a label HTML element within the boundaries of the TextArea.
* [RTL Support]({% slug rtl_textarea_aspnetcore %})&mdash;The TextArea enables you to render its content content in a right-to-left direction for right-to-left languages.
* [Events]({% slug events_textarea %})&mdash;The TextArea allows you to handle its events and implement custom functionality.


## Next Steps

* [Getting Started with the TextArea ]({% slug aspnetcore_textarea_getting_started %})
* [Basic Usage of the TextArea HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/index)
{% if site.core %}
* [Basic Usage of the TextArea TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/textarea/tag-helper)
{% endif %}

## See Also

* [Using the API of the TextArea HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/api)
* [Knowledge Base Section](/knowledge-base)
