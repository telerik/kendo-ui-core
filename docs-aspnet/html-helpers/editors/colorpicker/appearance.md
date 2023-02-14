---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI ColorPicker for {{ site.framework }}."
slug: appearance_colorpicker_aspnetcore
position: 2
---

# ColorPicker Appearance

As of the R1 2022 release, the ColorPicker component uses a new rendering. To learn more about the reasons for this decision, see the [Components Appearance]({% slug components_rendering_overview %}) article.

For a live example of the ColorPicker styling options, visit the [ColorPicker Appearance Demo](https://demos.telerik.com/{{ site.platform }}/colorpicker/appearance).

## Options

The ColorPicker supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the ColorPicker. The `k-input-{size}` class, which is applied to the wrapping span element of the ColorPicker, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element).
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element).
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the ColorPicker:

```HtmlHelper
        @(Html.Kendo().ColorPicker()
            .Name("picker")
            .Size(ComponentSize.Medium)
            .Value("#ff0000")
            .Format(ColorPickerFormat.Rgb)
            .Formats(new string[] { "rgb", "hex" })
        )
```
{% if site.core %}
```TagHelper
@{
    string[] formats = new string[] { "rgb", "hex" };
}

        <kendo-colorpicker name="picker" value="#ff0000" size="ComponentSize.Medium"
         format="ColorPickerFormat.Rgb"         formats="formats">
        </kendo-colorpicker>
```
{% endif %}

The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-colorpicker k-picker k-picker-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the ColorPicker. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element).
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element).
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element).
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the ColorPicker:

```HtmlHelper
        @(Html.Kendo().ColorPicker()
            .Name("picker")
            .Rounded(Rounded.Medium)
            .Value("#ff0000")
            .Format(ColorPickerFormat.Rgb)
            .Formats(new string[] { "rgb", "hex" })
        )
```
{% if site.core %}
```TagHelper
@{
    string[] formats = new string[] { "rgb", "hex" };
}

        <kendo-colorpicker name="picker" value="#ff0000" rounded="Rounded.Medium"
         format="ColorPickerFormat.Rgb"         formats="formats">
        </kendo-colorpicker>
```
{% endif %}

The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-colorpicker k-picker k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered ColorPicker. The `k-picker-{fillMode}` class, which is applied to the wrapping span element of the ColorPicker, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element.
- `Flat`—applies the `k-input-flat` class to the wrapping span element.
- `Outline`—applies the `k-input-outline` class to the wrapping span element.
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the ColorPicker:

  ```HtmlHelper
        @(Html.Kendo().ColorPicker()
            .Name("picker")
            .FillMode(FillMode.Solid)
            .Value("#ff0000")
            .Format(ColorPickerFormat.Rgb)
            .Formats(new string[] { "rgb", "hex" })
        )
```
{% if site.core %}
```TagHelper
@{
    string[] formats = new string[] { "rgb", "hex" };
}

        <kendo-colorpicker name="picker" value="#ff0000" fillmode="FillMode.Solid"
         format="ColorPickerFormat.Rgb"         formats="formats">
        </kendo-colorpicker>
```
{% endif %}      

The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-colorpicker k-input k-input-solid">
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering.

Old Rendering:

<div role="textbox" aria-haspopup="true" class="k-colorpicker" aria-disabled="false" tabindex="0" aria-label="Current selected color is ">
    <!-- no tool icon -->
    <span class="k-picker-wrap">
        <span class="k-selected-color k-no-color" style="background-color: rgb(255, 255, 255);"></span>
		<!-- k-no-color is added when value is null -->
        <span role="button" class="k-select" unselectable="on" aria-label="select">
            <span class="k-icon k-i-arrow-s"></span>
        </span>
    </span>

    <!-- with tool icon -->
    <span class="k-picker-wrap">
        <span class="k-icon k-tool-icon k-i-gear">
            <span class="k-selected-color" style="background-color: rgb(255, 255, 255);"></span>
        </span>
        <span role="button" class="k-select" unselectable="on" aria-label="select">
            <span class="k-icon k-i-arrow-s"></span>
        </span>
    </span>

    <input id="colorpicker" data-role="colorpicker" style="display: none;">
</div>

<!-- Old Popup Rendering-->

<div class="k-flatcolorpicker k-coloreditor">
    ...
    <div class="k-coloreditor-preview k-vstack">
        <!-- k-no-color is added when value is null -->
        <span class="k-coloreditor-preview-color k-color-preview k-no-color" style="background-color: rgba(0,0,0, 0.5)">
        </span>
        <span class="k-coloreditor-current-color k-color-preview k-no-color" style="background-color: rgba(0,0,0, 0.5)">
        </span>
     </div>
    ...
</div>
New Rendering:

<span role="textbox" aria-haspopup="true" class="k-colorpicker k-picker k-icon-picker k-picker-{fillMode} k-picker-{size} k-rounded-{rounded}" aria-disabled="false" tabindex="0" aria-label="Current selected color is ">
    <span class="k-input-inner">

        <!-- no tool icon -->
        <span class="k-value-icon k-color-preview  k-no-color">
            <!-- k-no-color is added when value is null -->
            <span class="k-color-preview-mask" style="background-color: rgb(255, 255, 255);"></span>
        </span>


        <!-- with tool icon -->
         <span class="k-value-icon k-color-preview k-icon-color-preview k-no-color">
             <!-- k-no-color is added when value is null -->
             <span class="k-color-preview-icon k-icon k-i-edit-tools {toolIcon}"></span>
             <span class="k-color-preview-mask" style="background-color: rgb(255, 255, 255);"></span>
         </span>
    </span>
    <button class="k-select k-input-button k-button k-button-{size} k-rounded-{rounded} k-button-{fillMode} k-button-{fillMode}-base k-icon-button" unselectable="on" aria-label="select" type="button">
        <span class="k-icon k-i-arrow-s k-button-icon"></span>
    </button>
    <input id="colorpicker" data-role="colorpicker" style="display: none;">
</span>

<!-- New Popup Rendering -->
<!-- All Buttons and inputs get the size option from the ColorPicker options -->

<div class="k-flatcolorpicker k-coloreditor">
    ...
    <div class="k-coloreditor-preview k-vstack">
        <!-- k-no-color is added when value is null -->
        <span class="k-coloreditor-preview-color k-color-preview k-no-color">
            <span class="k-color-preview-mask" style="background-color: rgba(0,0,0, 0.5)"></span>
        </span>
        <span class="k-coloreditor-current-color k-color-preview k-no-color">
            <span class="k-color-preview-mask" style="background-color: #FF6358;"></span>
        </span>
     </div>
 ...
</div>

The following example demonstrates how to configure the appearance of the component through configuration:

        @(Html.Kendo().ColorPicker()
            .Name("picker")
            .Size(ComponentSize.Medium)
            .Rounded(Rounded.Medium)
            .FillMode(FillMode.Solid)
            .Value("#ff0000")
            .Format(ColorPickerFormat.Rgb)
            .Formats(new string[] { "rgb", "hex" })
        )

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering support only the [default options](#options) when you use a LESS theme.

If you use custom CSS, to override default ColorPicker styles, you will need to update the classes used in the selectors of your custom CSS rules. The following example shows how to achieve the same customization in the ColorPicker, depending on whether you are using an old product version or a new one. 

The first set of CSS rules relies on the classes available in the old rendering.

```
<style>
/*  Old rendering (versions prior to R1 2022)*/      

/* Apply lightblue background color to the ColorPicker's dropdown button */
.k-colorpicker .k-select{ 
  background-color: lightblue;
}

/* Apply green background color to the ColorPicker's Apply button */
.k-flatcolorpicker .apply {
  background-color: green;
  border-color: green;
}

/* Apply red background color and border to the ColorPicker's Cancel button */
.k-flatcolorpicker .cancel {
  background-color: red;
  border-color: red;
}
</style>
```

The second set of CSS rules relies on the classes available in the new rendering.

```
<style>
/*  New Rendering (versions after R1 2022) */

/* Apply lightblue background color to the ColorPicker's dropdown button */
.k-colorpicker .k-input-button { 
  background-color: lightblue;
}

/* Apply green background color to the ColorPicker's Apply button */
.k-flatcolorpicker .k-coloreditor-apply {
  background-color: green;
  border-color: green;
}

/* Apply red background color and border to the ColorPicker's Cancel button */
.k-flatcolorpicker .k-coloreditor-cancel {
  background-color: red;
  border-color: red;
}
</style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the ColorPicker](https://demos.telerik.com/aspnet-mvc/colorpicker/appearance)
