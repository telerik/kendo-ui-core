---
title: Overview
page_title: Overview
description: "The Telerik UI TextBox component for {{ site.framework }} enables user input and its appearance matches the general Telerik theme of the page."
slug: htmlhelpers_overview_textbox
position: 0
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

* [Accessibility]({% slug accessibility_textbox_aspnetcore %})—The TextBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.1, and keyboard support.

## See Also

* [Basic Usage of the TextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/index)
{% if site.core %}
* [Basic Usage of the TextBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/textbox/tag-helper)
{% endif %}
* [Using the API of the TextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/api)
* [Server-Side API](/api/textbox)
