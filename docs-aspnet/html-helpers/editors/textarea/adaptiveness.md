---
title: Adaptiveness
page_title: Adaptiveness
description: "Learn how to configure the adaptive behavior of the the Telerik UI TextArea component for {{ site.framework }}."
slug: adaptiveness_textarea
position: 4
---

# Adaptiveness

The Telerik UI for {{ site.framework }} TextArea does not require specific adaptive rendering but enables you to configure a suitable input-specific keyboard that appears on touchscreen devices upon interaction.

## On-Screen Keyboard

To enhance the user experience of your application on mobile devices, you can configure the type of the on-screen keyboard for the TextArea component.

To display an on-screen keyboard when the user focuses the TextArea, set the `InputMode()` property to any of the supported <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode#values" target="_blank">`inputmode`</a> HTML attribute values. Based on the defined value, the browser displays the respective virtual keyboard on the screen.

The following example demonstrates how to configure the most appropriate on-screen keyboard for the TextArea.

```HtmlHelper
  @(Html.Kendo().TextArea()
    .Name("textArea")
    .InputMode("text")
  )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-textarea name="textArea" input-mode="text">
    </kendo-textarea>
```
{% endif %}

## See Also

* [Adaptive Rendering of the Components]({% slug adaptive_rendering%})
* [Server-Side API of the TextArea HtmlHelper](/api/textarea)
{% if site.core %}
* [Server-Side API of the TextArea TagHelper](/api/taghelpers/textarea)
{% endif %}