---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI MultiSelect for {{ site.framework }}."
components: ["multiselect"]
slug: appearance_multiselect
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} MultiSelect.

For a live example, visit the [Appearance Demo of the MultiSelect](https://demos.telerik.com/{{ site.platform }}/multiselect/appearance).

## Options

The MultiSelect supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the MultiSelect. The `k-input-{size}` class, which is applied to the wrapping span element of the MultiSelect, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the MultiSelect:
```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DownArrow()
        .Placeholder("Select...")
        .Size(ComponentSize.Large)
        .BindTo(new List<SelectListItem>()
        {
            new SelectListItem() {
            Text = "Item1", Value ="1"
            },
            new SelectListItem() {
            Text = "Item2", Value ="2"
            },
            new SelectListItem() {
            Text = "Item3", Value ="3"
            }
        })
    )
```
{% if site.core %}
```TagHelper
    @{
        var multiSelect_data = new List<SelectListItem>()
        {
            new SelectListItem() {Text = "Item1", Value ="1"},
            new SelectListItem() {Text = "Item2", Value ="2"},
            new SelectListItem() {Text = "Item3", Value ="3"}
        };
    }

    <kendo-multiselect name="multiselect"
                       down-arrow="true"
                       placeholder="Select..."
                       size="ComponentSize.Large"
                       bind-to="multiSelect_data">
    </kendo-multiselect>
```
{% endif %}

> When not explicitly set, the applied theme controls the default size.

Below is the HTML of the MultiSelect that is affected from the `Size` configuration. The changes are applied to the `span.k-multiselect` wrapping element and to the `span.k-chip` elements:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-lg">
    ...
    <span class="k-chip k-chip-lg k-rounded-lg k-chip-solid k-chip-base" aria-setsize="2"></span>
</span>
```

### Rounded

The `Rounded` option controls the border radius of the MultiSelect. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest (ellipse-like) border radius (applies the `k-rounded-full` class to the wrapping span element)

> When not explicitly set, the applied theme controls the default border radius.

> The `None` value is deprecated. Use custom CSS instead.

The following example demonstrates how to set `Rounded` in the declaration of the MultiSelect:
```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DownArrow()
        .Placeholder("Select...")
        .Rounded(Rounded.Medium)
        .BindTo(new List<SelectListItem>()
        {
            new SelectListItem() {
            Text = "Item1", Value ="1"
            },
            new SelectListItem() {
            Text = "Item2", Value ="2"
            },
            new SelectListItem() {
            Text = "Item3", Value ="3"
            }
        })
    )
```
{% if site.core %}
```TagHelper
    @{
        var multiSelect_data = new List<SelectListItem>()
        {
            new SelectListItem() {Text = "Item1", Value ="1"},
            new SelectListItem() {Text = "Item2", Value ="2"},
            new SelectListItem() {Text = "Item3", Value ="3"}
        };
    }

    <kendo-multiselect name="multiselect"
                       down-arrow="true"
                       placeholder="Select..."
                       rounded="Rounded.Medium"
                       bind-to="multiSelect_data">
    </kendo-multiselect>
```
{% endif %}

The default rounded value is `Full`. It applies the `k-rounded-full` class to the `span.k-multiselect` wrapping element that contains the HTML of the component. The class is also applied to the `span.k-chip` element which contains the HTML of the tags.

The rendering of the MultiSelect with `Rounded.Medium` set:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-solid k-input-lg k-rounded-md">
    ...
    <span class="k-chip k-chip-lg k-rounded-md k-chip-solid k-chip-base" aria-setsize="2"></span>
</span>
```

### FillMode

The `FillMode` option controls how the color of the tags is applied. The structure of the class is `k-input-{fillMode}`.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element

> When not explicitly set, the applied theme controls the default fill mode.

> The `None` value is deprecated. Use custom CSS instead.

The following example demonstrates how to set `FillMode` in the declaration of the MultiSelect:
```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DownArrow()
        .Placeholder("Select...")
        .FillMode(FillMode.Outline)
        .BindTo(new List<SelectListItem>()
        {
            new SelectListItem() {
            Text = "Item1", Value ="1"
            },
            new SelectListItem() {
            Text = "Item2", Value ="2"
            },
            new SelectListItem() {
            Text = "Item3", Value ="3"
            }
        })
    )
```
{% if site.core %}
```TagHelper
    @{
        var multiSelect_data = new List<SelectListItem>()
        {
            new SelectListItem() {Text = "Item1", Value ="1"},
            new SelectListItem() {Text = "Item2", Value ="2"},
            new SelectListItem() {Text = "Item3", Value ="3"}
        };
    }

    <kendo-multiselect name="multiselect"
                       down-arrow="true"
                       placeholder="Select..."
                       fill-mode="FillMode.Outline"
                       bind-to="multiSelect_data">
    </kendo-multiselect>
```
{% endif %}

The `FillMode.Outline` value is reflected through the respective classes applied to the `span.k-multiselect` wrapping element and to the `span.k-chip` elements:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-outline k-input-lg k-rounded-md">
    ...
    <span class="k-chip k-chip-lg k-rounded-md k-chip-outline k-chip-base" aria-setsize="2"></span>
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the MultiSelect](https://demos.telerik.com/{{ site.platform }}/multiselect/appearance)
