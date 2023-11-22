---
title: Appearance
page_title: jQuery ColorPicker Documentation - Appearance
description: "Learn how to apply different styling options to the ColorPicker component."
slug: appearance_kendoui_colorpicker_widget
position: 6
---

# Appearance

> As of Kendo UI R1 2022, the jQuery ColorPicker component has new rendering and styling options.

In this article, you will find information about the rendering of the Kendo UI ColorPicker.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/appearance).

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
- `none`—unset

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

The `rounded` option controls how much border radius is applied to the tags for the selected items in the component. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/colorpicker/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

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
- `none`

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

The old rendering of the component consisted of several wrapping elements:

- The outer `div` wrapper with the `k-colorpicker` class.

```html
  <div class="k-colorpicker">
  </div>
```

- The inner `span` wrapper with the `k-picker-wrap` class.

  ```html
  <span class="k-picker-wrap">
  </span>
  ```

- The `span` element containing infromation about the selected color in the ColorPicker. This element is a child of the `k-picker-wrap` span.
```html
  <!-- no tool icon -->
  <span class="k-selected-color" ></span>

  <!-- with tool icon -->
  <span class="k-icon k-tool-icon k-i-foreground-color">
	<span class="k-selected-color"></span>
  </span>
```


- The button `span` element with `k-select` class. This element is a child of the `k-picker-wrap` span and renders the button which expands the color editor popup on click.

  ```html
  <span unselectable="on" class="k-select" role="button">
  </span>
  ```

- The icon `span` element with the `k-icon` class. This element is a child of the `k-select` span and renders the colorpicker dropdown icon icon.

  ```html
  <span class="k-icon k-i-arrow-s">
  ```

The following example demonstrates the full version of the old rendering:

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

The new rendering of the component consists of a single wrapping `span` element that contains the child `input` and `button` elements:

- The `span` element controls the overall appearance of the component and has the following class structure:

  ```html
  <span class="k-colorpicker k-picker k-icon-picker k-picker-solid k-picker-md k-rounded-md">
  </span>
  ```

- The inner span element with the `k-input-inner` class renders the color preview of the ColorPicker

  ```html
  <span class="k-input-inner" ></span>
  ```

- The `button` element controls the appearance of the button that expands the color popup editor and has the following class structure:

  ```html
  <button type="button" class="k-select k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base">
  </button>
  ```


The following example demonstrates the new rendering:

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
    <button class="k-input-button k-button k-button-{size} k-rounded-{rounded} k-button-{fillMode} k-button-{fillMode}-base k-icon-button" unselectable="on" aria-label="select" type="button">
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

To achieve the same look and feel as the old rendering, you must update the element references. 

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

Previously, a reference to the button element was obtainable through the `k-select` class.

```javascript
$(".k-select") // Returns a reference to the ColorPicker dropdown button element in the old rendering.
```

With the new rendering, you can also obtain a reference to the button element through the `k-button` and `k-input-button` classes.

```javascript
$(".k-button") // Returns a reference to the ColorPicker dropdown button element in the new rendering.
$(".k-input-button") // Returns a reference to the ColorPicker dropdown button element in the new rendering.
```

Previously, the element holding the color preview was obtainable either through the `k-selected-color` class or through the `k-tool-icon` class when a `toolIcon` is configured.

```javascript
$(".k-selected-color") // In the old rendering returns a reference to the ColorPicker color preview element when a toolIcon is not configured.

$(".k-tool-icon") // In the old rendering returns a reference to the ColorPicker color preview element when a toolIcon is configured.
```

With the new rendering, you can obtain a reference to the `span` element containing the color preview through the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the ColorPicker color preview element in the new rendering.
```

With the new rendering, you can obtain a reference to the `span` element containing the selected color through the `k-color-preview-mask` class.

```javascript
$(".k-color-preview-mask") // Returns a reference to span element containing the selected color in the new rendering.```
```

The following example showcases how to customize the styles of the **ColorPicker** in both the new, and the old rendering:
```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <input id="colorpicker" />
    <script>
      $("#colorpicker").kendoColorPicker({
        value: 'white'
      })
    </script>

    <style>
      /*  NEW RENDERING */
      /*  The style below will works with versions R1 2022 and later */ 
      .k-colorpicker .k-input-inner, .k-input .k-input-inner{ 
        background-color: #50C878; /* Applies green background to the color input element in the popup */
      }    


      .k-colorpicker .k-input-button{ 
        background-color: lime !important; /* Applies lime background ColorPicker dropdown button element */
      }

      .k-colorpicker .k-color-preview-mask{ /* Applies green border to the color preview element */
        border: 2px solid green !important;
      }


      /*  OLD RENDERING */      
      /*  The style below will works with versions prior to R1 2022 */ 
      
      .k-colorpicker .k-select{ 
        background-color: lightblue; /* Applies light blue background to the ColorPicker dropdown button element */
      }

      .k-colorpicker .k-selected-color{ /* applies blue border to the ColorPicker preview element in the old rendering */
        border: 2px solid #1589FF !important;
      }      
 
      .k-colorpicker-popup .k-textbox>.k-input{ /* Applies blue border to ColorPicker input element in the popup in the old rendering*/
        border: 2px solid blue !important;
      }

    </style>
```


## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/appearance)
* [JavaScript API Reference of the ColorPicker](/api/javascript/ui/colorpicker)
