---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI RadioButton HtmlHelper for {{ site.framework }}."
components: ["radiobutton"]
slug: radiobutton_appearance
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} RadioButton.

For a live example, check out the [Appearance Demo of the RadioButton](https://demos.telerik.com/{{ site.platform }}/radiobutton/appearance).

## Options

The `Size()` method controls how big or small the rendered radio input looks.

The example below demonstrates how to adjust the `Size` of the component:

```HtmlHelper
@(Html.Kendo().RadioButton()
    .Name("radioBtn")
    .Checked(true)
    .Size(ComponentSize.Small)
)
```
{% if site.core %}
```TagHelper
<kendo-radiobutton name="radioBtn" checked="true" size="small"></kendo-radiobutton>
```
{% endif %}

The following values are available for the `Size` option:

- `Small`
- `Medium`
- `Large`
- `None`

The default size value is `Medium` and it is added as a class `k-radio-md` to the input element.

```html
<!-- default rendering -->
<input type="radio" class="k-radio k-radio-md" id="radioButtonName"/>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance of the RadioButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiobutton/appearance)
* [RadioButton Server-Side API](/api/radiobutton)
