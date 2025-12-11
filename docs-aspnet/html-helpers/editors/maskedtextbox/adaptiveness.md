---
title: Adaptiveness
page_title: Adaptiveness
description: "Learn how to configure the adaptive behavior of the the Telerik UI MaskedTextBox component for {{ site.framework }}."
components: ["maskedtextbox"]
slug: adaptiveness_maskedtextbox
position: 6
---

# Adaptiveness

The Telerik UI for {{ site.framework }} MaskedTextBox does not require specific adaptive rendering but enables you to configure a suitable input-specific keyboard that appears on touchscreen devices upon interaction.

## On-Screen Keyboard

To enhance the user experience of your application on mobile devices, you can configure the type of the on-screen keyboard for the MaskedTextBox component.

To display an on-screen keyboard when the user focuses the MaskedTextBox, set the `InputMode()` property to any of the supported <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode#values" target="_blank">`inputmode`</a> HTML attribute values. Based on the defined value, the browser displays the respective virtual keyboard on the screen.

The following example demonstrates how to configure the most appropriate on-screen keyboard for the MaskedTextBox.

```HtmlHelper
  @(Html.Kendo().MaskedTextBox()
    .Name("maskedtextbox")
    .Mask("(999) 000-0000")
    .InputMode("tel")
  )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-maskedtextbox name="maskedtextbox" 
        mask="(999) 000-0000" 
        input-mode="tel">
    </kendo-maskedtextbox>
```
{% endif %}

## See Also

* [Adaptive Rendering of the Components]({% slug adaptive_rendering%})
* [Server-Side API of the MaskedTextBox HtmlHelper](/api/maskedtextbox)
{% if site.core %}
* [Server-Side API of the MaskedTextBox TagHelper](/api/taghelpers/maskedtextbox)
{% endif %}