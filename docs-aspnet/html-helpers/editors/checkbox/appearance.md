---
title: Appearance
page_title: "{{ site.framework }} CheckBox Documentation - CheckBox Appearance"
description: "Learn how to customize the appearance of the Telerik UI CheckBox HtmlHelper for {{ site.framework }}."
slug: checkbox_appearance
position: 2
---

# CheckBox Appearance

> As of the R1 2022 release, the CheckBox uses a brand new rendering.

In this article, you will find information about the new appearance of the {{ site.product }} CheckBox.

For additional information regarding the decision behind these changes, visit the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article.

For a live example, refer to the [Appearance Demo of the CheckBox](https://demos.telerik.com/{{ site.platform }}/checkbox/appearance).

## Options

- [`Size()`](#size)—configures the overall size of the component.
- [`Rounded()`](#rounded)—configures the border radius of the component.

### Size

The `Size()` method allows you to change the size of the CheckBox.

```HtmlHelper
@(Html.Kendo().CheckBox()
    .Name("checkBoxBtn")
    .Checked(true)
    .Size(ComponentSize.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-checkbox name="checkBoxBtn"
                checked="true"
                size="ComponentSize.Medium">
</kendo-checkbox>
```
{% endif %}

The following values are available for the `Size` option:

- `Small`
- `Medium`
- `Large`
- `None`

The default size value is `Medium` and it is added as a class `k-checkbox-md` to the input element.

```html
<!-- default rendering -->
<input type="checkbox" class="k-checkbox k-checkbox-md" id="checkBoxName"/>
```

### Rounded

The border radius of the CheckBox can be customized through the `Rounded()` method.

{% if site.core %}
```HtmlHelper
@(Html.Kendo().CheckBox()
    .Name("checkBoxBtn")
    .Checked(true)
    .Rounded(BasicRounded.Medium)
)
```
```TagHelper
<kendo-checkbox name="checkBoxBtn"
                checked="true"
                rounded="Rounded.Medium">
</kendo-checkbox>
```
{% endif %}
{% if site.mvc %}
```
@(Html.Kendo().CheckBox()
    .Name("checkBoxBtn")
    .Checked(true)
    .Rounded(Rounded.Medium)
)
```
{% endif %}

The following values are available for the `Rounded` option:

- `Small`
- `Medium`
- `Large`
- `None`

The default value is `Medium` and it is added as a class `k-roundend-md` to the input element.

```html
<!-- default rendering -->
<input type="checkbox" class="k-checkbox k-roundend-md" id="checkBoxName"/>
```

## See Also

* [Appearance of the CheckBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/checkbox/appearance)
* [Server-Side API](/api/checkbox)
