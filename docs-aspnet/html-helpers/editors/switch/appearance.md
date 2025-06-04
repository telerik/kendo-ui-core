---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI Switch HtmlHelper for {{ site.framework }}."
slug: switch_appearance
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} Switch.

For a complete example, visit the [Appearance Demo of the Switch](https://demos.telerik.com/{{ site.platform }}/switch/appearance).

## Options

The Switch HtmlHelper provides the following styling options:

- [`Size()`](#size)—configures the overall size of the component.
- [`TrackRounded()`](#trackrounded)—defines the radius of the track's border.
- [`ThumbRounded()`](#thumbrounded)—sets the radius of the thumb's border.

### Size

The `Size()` method allows you to adjust the size of the Switch. The default size is `Medium`.

```HtmlHelper
@(Html.Kendo().Switch()
    .Name("switch")
    .Size(ComponentSize.Medium)
    .Messages(c => c.Checked("YES").Unchecked("NO"))
)
```
{% if site.core %}
```TagHelper
<kendo-switch name="switch" size="ComponentSize.Medium">
    <messages checked="YES" unchecked="NO"/>
</kendo-switch>
```
{% endif %}

The option adds a class `k-switch-md` to the `span.k-switch` element:

```html
<span class="k-switch k-switch-on k-switch-md">
</span>
```

The following values are available for the `Size` option:

- `Small`
- `Medium`
- `Large`
- `None`

### TrackRounded

You can control how much border radius is applied to the component's track by using the `TrackRounded()` method. The default value is `Full`.

The example below demonstrates how to set the `TrackRounded` option:

```HtmlHelper
@(Html.Kendo().Switch()
    .Name("switch")
    .TrackRounded(Rounded.Full)
)
```
{% if site.core %}
```TagHelper
<kendo-switch name="switch" track-rounded="Rounded.Full"></kendo-switch>
```
{% endif %}

The option adds a class `k-rounded-full` to the `span.k-switch-track` element that wraps the On/Off labels:

```html
<span class="k-switch-track k-rounded-full">
</span>
```

The `TrackRounded` option supports the following values:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`


### ThumbRounded

The `ThumbRounded()` method controls how much border radius is applied to thumb of the Switch.

```HtmlHelper
@(Html.Kendo().Switch()
    .Name("switch")
    .ThumbRounded(Rounded.Full)
)
```
{% if site.core %}
```TagHelper
<kendo-switch name="switch" thumb-rounded="Rounded.Full"></kendo-switch>
```
{% endif %}

The option adds a class `k-rounded-full` to the `span.k-switch-thumb` element for the Switch handle:

```html
<span class="k-switch-thumb k-rounded-full">
</span>
```

The `ThumbRounded` option supports the following values:

- `Small`
- `Medium`
- `Large`
- `Full`—the default value
- `None`

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## Custom Layout

You can implement a custom layout for the Switch by using the available [Sass variables](https://www.telerik.com/design-system/docs/components/switch/styles/).

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance of the Switch HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch/appearance)
* [Switch Server-Side API](/api/switch)
* [Switch Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch)