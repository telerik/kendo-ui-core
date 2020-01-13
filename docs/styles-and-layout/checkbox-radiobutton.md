---
title: Checkboxes and RadioButtons
page_title: CheckBoxes and RadioButtons | Kendo UI Styles and Appearance
description: "Learn how to use the Kendo UI Checkbox and RadioButton."
slug: checkbox_radiobutton_styling
position: 9
---

# Checkboxes and RadioButtons

The Kendo UI Checkbox and Kendo UI RadioButton are a set of classes that add styling to input elements of type `checkbox` and `radio`.

Modern browsers support the [appearance](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance) property. This enables customizing the look of checkboxes and radios by removing the platform-native styling.

## Getting Started

To show a checkbox, utilize the `.k-checkbox` class which will apply the Kendo styles on the input element.

```html
<input type="checkbox" class="k-checkbox">
```

Similarly, to show a styled radiobutton use the `.k-radio` class.

```html
<input type="radio" name="engine" class="k-radio">
```

## Showing with a label

Following good practices it is recommended to have text related to the input. There are different ways to achieve that:

Add a label element with `for` attribute that matches the id of the checkbox:

```html
<input type="checkbox" id="check1" class="k-checkbox" checked="checked">
<label for="check1">I like apples</label>
```

And for the radiobutton:

```html
<input type="radio" name="engine" id="radio1" class="k-radio">
<label for="radio1">Oranges</label>
```

Another option is to wrap the input in a `label` element and have the text in a span:

Checkbox: 

```html
<label>
    <input type="checkbox" id="check1" class="k-checkbox" checked="checked">
    <span>I like apples</span>
</label>
```

RadioButton:

```html
<label>
    <input type="radio" name="engine" id="radio1" class="k-radio">
    <span>Oranges</span>
</label>
```


## See Also

* [Checkbox demo](https://demos.telerik.com/kendo-ui/checkbox/index)
* [RadioButon demo](https://demos.telerik.com/kendo-ui/radiobutton/index)
* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [Sass ThemeBuilder Overview]({% slug sassbasedthemes_kendoui %}#sass-theme-builder)
* [Less ThemeBuilder Overview]({% slug themesandappearnce_kendoui_desktopwidgets %}#less-theme-builder)
