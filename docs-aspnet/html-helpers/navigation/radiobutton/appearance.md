---
title: Appearance
page_title: "{{ site.framework }} RadioButton Documentation - RadioButton Appearance"
description: "Learn how to customize the appearance of the Telerik UI RadioButton HtmlHelper for {{ site.framework }}."
slug: radiobutton_appearance
position: 2
---

# RadioButton Appearance

> As of the R1 2022 release, the RadioButton uses a brand new rendering.

In this article, you will learn more about the new appearance of the {{ site.product }} RadioButton.

For additional information regarding the decision behind these changes, visit the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article.

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

## See Also

* [Appearance of the RadioButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiobutton/appearance)
* [RadioButton Server-Side API](/api/radiobutton)
