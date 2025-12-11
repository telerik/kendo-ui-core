---
title: Adaptiveness
page_title: Adaptiveness
description: "Learn how to configure the adaptive behavior of the the Telerik UI NumericTextBox component for {{ site.framework }}."
components: ["numerictextbox"]
slug: adaptiveness_numerictextbox
position: 8
---

# Adaptiveness

The Telerik UI for {{ site.framework }} NumericTextBox does not require specific adaptive rendering but enables you to configure a suitable input-specific keyboard that appears on touchscreen devices upon interaction.

## On-Screen Keyboard

To enhance the user experience of your application on mobile devices, you can configure the type of the on-screen keyboard for the NumericTextBox component.

To display an on-screen keyboard when the user focuses the NumericTextBox, set the `InputMode()` property to any of the supported <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode#values" target="_blank">`inputmode`</a> HTML attribute values. Based on the defined value, the browser displays the respective virtual keyboard on the screen.

The following example demonstrates how to configure the most appropriate on-screen keyboard for the NumericTextBox.

```HtmlHelper
  @(Html.Kendo().NumericTextBox()
    .Name("numericTextBox")
    .InputMode("numeric")
  )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-numerictextbox name="numericTextBox" input-mode="numeric">
    </kendo-numerictextbox>
```
{% endif %}

## See Also

* [Adaptive Rendering of the Components]({% slug adaptive_rendering%})
* [Server-Side API of the NumericTextBox HtmlHelper](/api/numerictextbox)
{% if site.core %}
* [Server-Side API of the NumericTextBox TagHelper](/api/taghelpers/numerictextbox)
{% endif %}