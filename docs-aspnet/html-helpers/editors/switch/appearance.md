---
title: Appearance
page_title: "{{ site.framework }} Switch Documentation | Switch Appearance"
description: "Learn how to customize the appearance of the Telerik UI Switch HtmlHelper for {{ site.framework }}."
slug: switch_appearance
position: 2
---

# Switch Appearance

> As of the R1 2022 release, the Switch has new rendering and styling options.

In this article, you will find information about the new appearance of the {{ site.product }} Switch.

For additional information regarding the decision behind these changes, visit the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article.

For a complete example, visit the [Appearance Demo of the Switch](https://demos.telerik.com/{{ site.platform }}/switch/appearance).

## Options

The Switch HtmlHelper provides the following styling options:

- [`Size()`](#size)—configures the overall size of the component.
- [`TrackRounded()`](#trackrounded)—defines the radius of the track's border.
- [`ThumbRounded()`](#thumbrounded)—sets the radius of the thumb's border.

### Size

The `Size()` method allows you to adjust the size of the Switch. The default size is `Medium`.

```
@(Html.Kendo().Switch()
    .Name("switch")
    .Size(ComponentSize.Medium)
    .Messages(c => c.Checked("YES").Unchecked("NO"))
)
```

The option adds a class `k-switch-md` to the `span.k-switch` element:

```html
<span class="k-switch k-switch-on k-switch-md">
</span>
```

The following values are available for the `Size` option:

- `Small`
- `Medium`
- `Large`

### TrackRounded

You can control how much border radius is applied to the component's track by using the `TrackRounded()` method. The default value is `Full`.

The example below demonstrates how to set the `TrackRounded` option:

```
@(Html.Kendo().Switch()
    .Name("switch")
    .TrackRounded(Rounded.Full)
)
```

The option adds a class `k-rounded-full` to the `span.k-switch-track` element that wraps the On/Off labels:

```html
<span class="k-switch-track k-rounded-full">
</span>
```

Тhe `TrackRounded` option supports the following values:

- `Small`
- `Medium`
- `Large`
- `Full`


### ThumbRounded

The `ThumbRounded()` method controls how much border radius is applied to thumb of the Switch. 

```
@(Html.Kendo().Switch()
    .Name("switch")
    .ThumbRounded(Rounded.Full)
)
```

The option adds a class `k-rounded-full` to the `span.k-switch-thumb` element for the Switch handle:

```html
<span class="k-switch-thumb k-rounded-full">
</span>
```

Тhe `ThumbRounded` option supports the following values:

- `Small`
- `Medium`
- `Large`
- `Full`—the default value


## Old vs New Rendering

The old rendering of the component consisted of a `span` element with classes named `k-switch k-widget k-switch-on`. The `span` element contained the wrapper for the Switch labels and handle.

```html
 <span class="k-switch k-widget k-switch-on">
    <span class="k-switch-container">
        <span class="k-switch-label-on">On</span>
        <span class="k-switch-label-off">Off</span>
        <span class="k-switch-handle"></span>
    </span>
</span>
```

The new rendering of the component includes separate wrapping `span` elements for the labels and the handle.

- The labels are placed in a `span` element with classes `k-switch-track k-rounded-full`:

```html
<span class="k-switch-track k-rounded-full">
    <span class="k-switch-label-on">On</span>
    <span class="k-switch-label-off">Off</span>
</span>
```

- The handle is rendered in a `span` element with classes `k-switch-thumb-wrap`:

```html
<span class="k-switch-thumb-wrap">
    <span class="k-switch-thumb k-rounded-full"></span>
</span>

```

The full rendering of the component has the following HTML structure:

```html
<span class="k-switch k-switch-on k-switch-md k-rounded-full">
    <span class="k-switch-track k-rounded-full">
        <span class="k-switch-label-on">On</span>
        <span class="k-switch-label-off">Off</span>
    </span>
    <span class="k-switch-thumb-wrap">
        <span class="k-switch-thumb k-rounded-full"></span>
    </span>
</span>
```

## Visual Backwards Compatibility

To achieve the same look and feel as the old rendering, the references of the element must be updated. Visit the [CSS Classes Migration](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview#css-classes-migration) and [JQuery Selectors Migration](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview#jquery-selectors-migration) sections of the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article for additional information.

> The new styling and rendering supports only the [default options](#options) when a LESS theme is used.

## See Also

* [Appearance of the Switch HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch/appearance)
* [Switch Server-Side API](/api/switch)
* [Switch Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch)