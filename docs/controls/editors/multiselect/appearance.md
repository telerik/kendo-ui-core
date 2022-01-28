---
title: MultiSelect Appearance
page_title: jQuery MultiSelect Documentation | MultiSelect Appearance
description: "Learn how to apply different styling options to the MultiSelect widget."
slug: appearance_kendoui_multiselect_widget
position: 9
---

# Appearance

> As of Kendo UI R1 2022, the jQuery MultiSelect widget has new rendering and styling options. 

In this article, you will find information about the rendering of the Kendo UI MultiSelect.

For additional information regarding the decision behind these changes, visit the [Rendering Components]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/appearance).

## Options

The Kendo UI MultiSelect supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius for the tags.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the `multiselect` looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/multiselect/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
</select>
<script>
    $("#multiselect").kendoMultiSelect({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-multiselect` wrapping element and to the `span.k-chip` elements:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-lg">
    ...
    <span class="k-chip k-chip-lg k-rounded-lg k-chip-solid k-chip-solid-base" aria-setsize="2"></span>
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the tags for the selected items in the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/multiselect/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius

The default value is `full` and it is applied to the `span.k-multiselect` wrapping element that contains the whole HTML through the `k-rounded-full` class. That class is also applied to the `span.k-chip` element which contains the HTML for the tags.

The example below shows a basic MultiSelect configuration and how to set `rounded` to "medium":

```dojo
<select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
</select>
<script>
    $("#multiselect").kendoMultiSelect({
      rounded: "medium"
    });
</script>
```
The changes are applied to the `span.k-multiselect` wrapping element and to the `span.k-chip` elements:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-solid k-input-lg k-rounded-md">
    ...
    <span class="k-chip k-chip-lg k-rounded-md k-chip-solid k-chip-solid-base" aria-setsize="2"></span>
</span>
```

### FillMode

The `fillMode` option controls how the color of the tags is applied. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/multiselect/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`

The default value is `solid` and it is applied to the `span.k-multiselect` wrapping element through the `k-input-solid` class and to the `span.k-chip` elements through the `.k-chip-outline .k-chip-outline-base` classes.

The example below shows a basic MultiSelect configuration and how to set `fillMode` to "outline":

```dojo
<select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
</select>
<script>
    $("#multiselect").kendoMultiSelect({
      fillMode: "outline"
    });
</script>
```
The changes are applied to the `span.k-multiselect` wrapping element and to the `span.k-chip` elements:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-outline k-input-lg k-rounded-md">
    ...
    <span class="k-chip k-chip-lg k-rounded-md k-chip-outline k-chip-outline-base" aria-setsize="2"></span>
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering. Some of the HTML elements rendered before are replaced with others in the new rendering.

Old Rendering:

```html
 <div class="k-widget k-multiselect k-multiselect-clearable" unselectable="on" title="" style="">
      <div class="k-multiselect-wrap k-floatwrap k-multiselect-wrap-arrow" unselectable="on" role="combobox"
          aria-expanded="false" aria-owns="multiselect_listbox" aria-controls="multiselect_listbox">
          <ul unselectable="on" class="k-reset" id="multiselect_taglist">
              <li class="k-button" unselectable="on" aria-setsize="1"><span unselectable="on">Item1</span><span
                      aria-hidden="true" unselectable="on" aria-label="delete" title="delete" class="k-select"><span
                          class="k-icon k-i-close"></span></span></li>
          </ul>
          <input class="k-input" style="width: 41px;" autocomplete="off" role="textbox" title=""
              aria-autocomplete="list" tabindex="0" aria-describedby="multiselect_taglist"
              aria-controls="multiselect_listbox" aria-disabled="false" aria-readonly="false" aria-busy="false">
          <span unselectable="on" class="k-select" title="select" role="button" tabindex="-1">
              <span class="k-icon k-i-arrow-60-down"></span>
          </span>
          <span unselectable="on" class="k-clear-value" title="clear" role="button" tabindex="-1"><span class="k-icon k-i-x"></span></span>
          <span class="k-icon k-i-loading k-hidden"></span>
      </div>
      <select id="multiselect" multiple="multiple" data-role="multiselect" style="display: none;">
          <option value="Item1">Item1</option>
          <option value="Item2">Item2</option>
      </select>
  </div>
```

New Rendering:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-{fillMode} k-input-{size} k-rounded-{rounded}" unselectable="on"
        role="combobox" title="" aria-expanded="false" aria-owns="multiselect_listbox" aria-controls="multiselect_listbox"
        style="">
        <select id="multiselect" multiple="multiple" data-role="multiselect" style="display: none;">
            <option value="Item1">Item1</option>
            <option value="Item2">Item2</option>
        </select>
        <div unselectable="on" class="k-input-values k-selection-multiple k-chip-list k-chip-list-{size}"
            id="multiselect_taglist">
            <span class="k-chip k-chip-{size} k-rounded-md k-chip-solid k-chip-solid-base"
                aria-setsize="1">
                <span unselectable="on" class="k-chip-content">Item1</span>
                <span class="k-chip-icon k-icon k-i-x" unselectable="on" aria-hidden="true" aria-label="delete"
                    title="delete">
                </span>
            </span>
            <input class="k-input-inner" autocomplete="off" role="textbox" title=""
                aria-autocomplete="list" tabindex="0" aria-describedby="multiselect_taglist"
                aria-controls="multiselect_listbox" aria-disabled="false" aria-readonly="false" aria-busy="false">
        </div>
        <span unselectable="on" class="k-clear-value" title="clear" role="button" tabindex="-1">
            <span class="k-icon k-i-x"></span>
        </span>
        <span class="k-icon k-i-loading k-hidden"></span>
        <button type="button" title="select"
            class="k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base k-multiselect-toggle-button"
            role="button" tabindex="-1"><span class="k-button-icon k-icon k-i-arrow-s"></span></button>
</span>
```

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

## See Also

* [Rendering Overview Article]({% slug components_rendering_overview %})
* [Styling Demo of the MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/styling)
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)