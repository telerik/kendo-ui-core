---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI CheckBox HtmlHelper for {{ site.framework }}."
components: ["checkbox"]
slug: checkbox_appearance
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} CheckBox.

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

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance of the CheckBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/checkbox/appearance)
* [Server-Side API](/api/checkbox)
