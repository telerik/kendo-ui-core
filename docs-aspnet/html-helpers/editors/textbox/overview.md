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

* [Appearance]({% slug textbox_appearance %})—The TextBox comes with built-in styling options that allow you to customize the appearance of the component.
* [Labels]({% slug htmlhelpers_labels_textbox %})—You can associate the TextBox with a label.
* [Accessibility]({% slug accessibility_textbox_aspnetcore %})—The TextBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.
* [RTL support]({% slug rtl_textbox_aspnetcore %})—You can use the Right-to-left (RTL) support of the TextBox to render its content for right-to-left languages, such as Arabic, Hebrew, Chinese, or Japanese.
* [Events]({% slug events_textbox_aspnetcore %})—The TextBox emits multiple events that you can handle and control the behavior of the component.

>tip To learn more about the appearance, anatomy, and accessibility of the TextBox, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/textbox/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Next Steps

* [Getting Started with the TextBox]({% slug aspnetcore_textbox_getting_started %})
* [Basic Usage of the TextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/index)
{% if site.core %}
* [Basic Usage of the TextBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/textbox/tag-helper)
{% endif %}


## See Also

* [Using the API of the TextBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/api)
* [Knowledge Base Section](/knowledge-base)