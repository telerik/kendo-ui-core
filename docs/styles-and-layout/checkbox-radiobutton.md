---
title: Checkboxes and RadioButtons
page_title: CheckBoxes and RadioButtons | Kendo UI Styles and Appearance
description: "Learn how to use the Kendo UI Checkbox and RadioButton."
slug: checkbox_radiobutton_styling
position: 9
---

# Checkboxes and RadioButtons

The Kendo UI Checkbox and Kendo UI RadioButton are a set of classes that add styling to input elements of type `checkbox` and `radio`.

> As of Kendo UI R1 2022, the set of classes for the Checkbox and the RadioButton are updated to provide brand new rendering. 

## CheckBox Old vs New Rendering

With the old rendering, the `k-checkbox` class held all the styling information related to the CheckBox styling. Applying the class to an HTML element was enough to style a native element.

Old Rendering:

```html
    <input type="checkbox" class="k-checkbox" />
```
Currently, the styles are split in multiple class names.

New Rendering

```html
    <input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" />
```

## RadioButton Old vs New Rendering

With the old rendering, the `k-radio` class held all the styling information related to the RadioButton styling. Applying the class to an HTML element was enough to style a native element.

Old Rendering:

```html
    <input type="radio" class="k-radio" />
```

New Rendering

```html
    <input type="radio" class="k-radio  k-radio-md" />
```

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Checkbox demo](https://demos.telerik.com/kendo-ui/checkbox/index)
* [RadioButton demo](https://demos.telerik.com/kendo-ui/radiobutton/index)
* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [Sass ThemeBuilder Overview]({% slug sassbasedthemes_kendoui %}#sass-theme-builder)
* [Less ThemeBuilder Overview]({% slug themesandappearnce_kendoui_desktopwidgets %}#less-theme-builder)
