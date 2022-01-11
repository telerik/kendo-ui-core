---
title: Styling
page_title: jQuery ColorPicker Documentation | Styling
description: "Learn how to apply different styling options to the ColorPicker widget."
slug: styling_kendoui_colorpicker_widget
position: 5 
---

# ColorPicker Styling

> As of Kendo UI R1 2022, the jQuery ColorPicker widget has new rendering and styling options.

In this article, you will find information about the rendering of the Kendo UI ColorPicker.

For additional information regarding the decision behind these changes, visit the [Styling Components]({% slug components_rendering_overview %}) article.

For a live example, visit the [Styling Demo of the ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/styling).

## Options

The Kendo UI ColorPicker supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius for the tags.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the ColorPicker component looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/colorpicker/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-picker-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="colorpicker" />
<script>
    $("#colorpicker").kendoColorPicker({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-colorpicker` wrapping element:

```html
<span class="k-colorpicker k-picker k-picker-lg">
    ...
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the tags for the selected items in the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/colorpicker/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius

The default value is `medium` and it is applied to the `span.k-colorpicker` wrapping element through the `k-rounded-md` class. 

The example below shows a basic ColorPicker configuration and how to set `rounded` to "full":

```dojo
<input id="colorpicker" />
<script>
    $("#colorpicker").kendoColorPicker({
      rounded: "full"
    });
</script>
```
The changes are applied to the `span.k-colorpicker` wrapping element:

```html
<span class="k-colorpicker k-picker k-rounded-full">
    ...    
</span>
```

### FillMode

The `fillMode` option controls how the color is applied. The structure of the class is `k-picker-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/colorpicker/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`

The default value is `solid` and it is applied to the `span.k-colorpicker` wrapping element through the `k-picker-solid` class.

The example below shows a basic ColorPicker configuration and how to set `fillMode` to "outline":

```dojo
<input id="colorpicker" />
<script>
    $("#colorpicker").kendoColorPicker({
      fillMode: "outline"
    });
</script>
```
The changes are applied to the `span.k-colorpicker` wrapping element:

```html
<span class="k-colorpicker k-input k-input-outline">
    ...    
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering. 

Old Rendering:

```html
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
```

New Rendering:

```html
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
    <button class="k-select k-button-rectangle k-input-button k-button k-button-{size} k-rounded-{rounded} k-button-{fillMode} k-button-{fillMode}-base k-icon-button" unselectable="on" aria-label="select" type="button">
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
```

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Styling Demo of the ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/styling)
* [JavaScript API Reference of the ColorPicker](/api/javascript/ui/colorpicker)
