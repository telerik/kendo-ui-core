---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Learn about the accessibility support that the {{ site.product }} DateInput component provides through its keyboard navigation functionality."
slug: htmlhelpers_dateinput_aspnetcore_accessibility_keyboardnavigation
position: 2
---

# Keyboard Navigation

The keyboard navigation of the DateInput is always available.

To focus the widget, use the key combination of [Access key](https://en.wikipedia.org/wiki/Access_key) and the key specified through the `HtmlAttributes` method.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .HtmlAttributes(new { accesskey = "w" }) //Access key + "w" will focus the DateInput
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" accesskey="w">
    </kendo-dateinput>
```
{% endif %}

For a complete example, refer to the [demo on keyboard navigation of the DateInput](https://demos.telerik.com/{{ site.platform }}/dateinput/keyboard-navigation).

## See Also

* [Keyboard Navigation in the DateInput HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dateinput/keyboard-navigation)
* [Accessibility in the DateInput HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_dateinput_aspnetcore_accessibility %})
