---
title: Overview
page_title: Overview
description: "Discover the Telerik UI NumericTextBox component for {{ site.framework }} that allows the user to select numeric values through direct input or by using spinner buttons"
previous_url: /helpers/html-helpers/numerictextbox, /helpers/editors/numerictextbox/overview
slug: htmlhelpers_numerictextbox_aspnetcore
position: 0
---

# NumericTextBox Overview

{% if site.core %}
The Telerik UI NumericTextBox TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI NumericTextBox widget.
{% else %}
The Telerik UI NumericTextBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI NumericTextBox widget.
{% endif %}

The NumericTextBox allows the user to select numeric values through direct input or by using spinner buttons.

* [Demo page for the NumericTextBox HtmlHelper](https://demos.telerik.com/{{ site.platform }}/numerictextbox/index)
{% if site.core %}
* [Demo page for the NumericTextBox TagHelper](https://demos.telerik.com/aspnet-core/numerictextbox/tag-helper)
{% endif %}

## Initializing the NumericTextBox

The following example demonstrates the basic configuration for the NumericTextBox.

```HtmlHelper
    @(Html.Kendo().NumericTextBox()
          .Name("numerictextbox") // The name of the NumericTextBox is mandatory. It specifies the "id" attribute of the widget.
          .Min(-100) // Set the min value of the NumericTextBox.
          .Max(100) // Set the min value of the NumericTextBox.
          .Value(10) // Set the value of the NumericTextBox.
    )
```
{% if site.core %}
```TagHelper
    <kendo-numerictextbox name="numerictextbox"
                      min="-100"
                      max="100"
                      value="10">
    </kendo-numerictextbox>
```
{% endif %}

{% if site.core %}
## Basic Configuration

The NumericTextBox configuration options are passed as attributes.

```HtmlHelper

        @(Html.Kendo().NumericTextBox<decimal>()
            .Name("currency")
            .Format("c")
            .Min(0)
            .Enable(true)
            .Max(100)
            .Value(30)
        )
```
```TagHelper

        <kendo-numerictextbox name="currency" format="c" min="0"
            enable="true" max="100" value="30">
        </kendo-numerictextbox>
```
{% endif %}

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Formats]({% slug formats_numerictextbox_aspnetcore %})|The format property of the NumericTextBox allows you to convert a number object to a human-readable string by using the culture-specific settings.|
| [Labels]({% slug htmlhelpers_labels_numerictextbox %})|The `Label()` method enables you to associate the label HTML element with the NumericTextBox.|
| [Globalization]({% slug globalization_numerictextbox_aspnetcore %})|The NumericTextBox comes with globalization support that allows you to use the component in apps all over the world.|
| [Accessibility]({% slug accessibility_numerictextbox_aspnetcore %})|The NumericTextBox is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_numerictextbox_aspnetcore %}) for faster navigation.|
| [Input Restrictions]({% slug input_restrictions_numerictextbox_aspnetcore %})|You can restrict the accepted value to a specific range and also control its precision.|
| [Events]({% slug events_numerictextbox_aspnetcore %})|The NumericTextBox exposes the `Change()` and `Spin()` events that allow you to control its behavior.|

## Next Steps

* [Getting Started with the NumericTextBox]({% slug aspnetcore_numerictextbox_getting_started %})
* [Basic Usage of the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/index)
{% if site.core %}
* [Basic Usage of the NumericTextBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/tag-helper)
{% endif %}
## See Also

* [Using the API of the NumericTextBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/api)
* [Known Limitations of the NumericTextBox for {{ site.framework }}]({% slug limitations_numerictextbox_aspnetcore %})
* [Knowledge Base Section](/knowledge-base)
