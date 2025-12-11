---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI MultiColumnComboBox for {{ site.framework }}."
components: ["multicolumncombobox"]
slug: appearance_multicolumncombobox
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} MultiColumnComboBox.

For a live example, visit the [Appearance Demo of the MultiColumnComboBox](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/appearance).

## Options

The MultiColumnComboBox supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the MultiColumnComboBox. The `k-input-{size}` class, which is applied to the wrapping span element of the MultiColumnComboBox, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The default size value is `Medium`.

The example below shows a basic configuration and how to set `size` to "large":

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("movies")
        .DataTextField("Text")
        .DataValueField("Value")
        .Size(ComponentSize.Large)
        .Columns(columns =>
        {
            columns.Add().Field("Text").Title("Text").Width("300px");
            columns.Add().Field("Value").Title("Value").Width("100px");
        })
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
        var movies_data = new List<SelectListItem>()
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
        };
    }

    <kendo-multicolumncombobox datatextfield="Text" datavaluefield="Value" name="movies"
    size="ComponentSize.Large"
    bind-to="movies_data">
        <multicolumncombobox-columns>
            <column field="Text" title="Text" width="400px">
            </column>
            <column field="Value" title="Value" width="100px">
            </column>
        </multicolumncombobox-columns>
    </kendo-multicolumncombobox>
```
{% endif %}

Below is the HTML of the MultiColumnComboBox that is affected from the `Size` configuration. The `ComponentSize.Large` value is reflected through the `k-input-lg` class applied to the `span.k-dropdowngrid` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-solid k-input-lg k-rounded-full">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the MultiColumnComboBox. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest (ellipse-like) border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The default value is `Full`.

The following example demonstrates how to set `Rounded` in the declaration of the MultiColumnComboBox:

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("movies")
        .DataTextField("Text")
        .DataValueField("Value")
        .Rounded(Rounded.Medium)
        .Columns(columns =>
        {
            columns.Add().Field("Text").Title("Text").Width("300px");
            columns.Add().Field("Value").Title("Value").Width("100px");
        })
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
        var movies_data = new List<SelectListItem>()
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
        };
    }

    <kendo-multicolumncombobox datatextfield="Text" datavaluefield="Value" name="movies"
    rounded="Rounded.Medium"
    bind-to="movies_data">
        <multicolumncombobox-columns>
            <column field="Text" title="Text" width="400px">
            </column>
            <column field="Value" title="Value" width="100px">
            </column>
        </multicolumncombobox-columns>
    </kendo-multicolumncombobox>
```
{% endif %}

The `Rounded.Medium` value is reflected through the `k-rounded-md` class applied to the `span.k-dropdowngrid` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-solid k-input-lg k-rounded-md">
    ...
</span>
```

### FillMode

The `FillMode` option controls how color is applied to the component. The structure of the class is `k-input-{fillMode}`.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The default value is `Solid` and it is applied to the `span.k-dropdowngrid` wrapping element through the `k-input-solid` class.

The following example demonstrates how to set `FillMode` in the declaration of the MultiColumnComboBox:

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("movies")
        .DataTextField("Text")
        .DataValueField("Value")
        .FillMode(FillMode.Outline)
        .Columns(columns =>
        {
            columns.Add().Field("Text").Title("Text").Width("300px");
            columns.Add().Field("Value").Title("Value").Width("100px");
        })
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
        var movies_data = new List<SelectListItem>()
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
        };
    }

    <kendo-multicolumncombobox datatextfield="Text" datavaluefield="Value" name="movies"
    fill-mode="FillMode.Outline"
    bind-to="movies_data">
        <multicolumncombobox-columns>
            <column field="Text" title="Text" width="400px">
            </column>
            <column field="Value" title="Value" width="100px">
            </column>
        </multicolumncombobox-columns>
    </kendo-multicolumncombobox>
```
{% endif %}

The `FillMode.Outline` value is reflected through the `k-input-outline` class applied to the `span.k-dropdowngrid` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-outline k-input-md k-rounded-full">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the MultiColumnComboBox](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/appearance)
