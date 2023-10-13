---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DateInput component for {{ site.framework }}."
previous_url: /helpers/html-helpers/dateinput, /helpers/editors/dateinput/overview
slug: htmlhelpers_dateinput_aspnetcore
position: 0
---

# {{ site.framework }} DateInput Overview

{% if site.core %}
The Telerik UI DateInput TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI DateInput widget.
{% else %}
The Telerik UI DateInput HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DateInput widget.
{% endif %}

The DateInput represents an input field that recognizes and formats scheduling values such as dates. It provides separate sections for days, months, years, hours, and minutes, and also supports the customization of date and time formats.

* [Demo page for the DateInput HtmlHelper](https://demos.telerik.com/{{ site.platform }}/dateinput/index)
{% if site.core %}
* [Demo page for the DateInput TagHelper](https://demos.telerik.com/aspnet-core/dateinput/tag-helper)
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration for the DateInput.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput") // The name of the DateInput is mandatory. It specifies the "id" attribute of the widget.
        .Value(DateTime.Today) // Set the value of the DateInput.
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" value="DateTime.Today">
    </kendo-dateinput>
```
{% endif %}

## Functionality and Features

* [Appearance](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/dateinput/appearance)&mdash;You are able to customize the appearance of the DateInput by configuring its size, fill mode, and border radius.
* [Floating Label](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/dateinput/floating-label)&mdash;You can configure a floating label placeholder text for the DateInput. This label will float above that field and remain visible once the user starts interacting with that input.
* [Globalization](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/dateinput/globalization/localization)&mdash;You can employ globalization which adjusts the date formats (localization) and adapts the component to specific cultures (internationalization and right-to-left support).
* [Accessibility](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/dateinput/accessibility/overview)&mdash;The DateInput is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

## Next Steps

* [Getting Started with the DateInput]({% slug dateinput_getting_started %})
* [Basic Usage of the DateInput HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dateinput/index)
{% if site.core %}
* [Basic Usage of the DateInput TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dateinput/tag-helper)
{% endif %}

## See Also

* [Using the API of the DateInput HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dateinput/api)
* [Client-Side API of the DateInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput)
* [Server-Side API](/api/dateinput)
* [Knowledge Base Section](/knowledge-base)
