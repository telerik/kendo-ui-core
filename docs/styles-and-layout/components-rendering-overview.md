---
title: Overview
page_title: Overview - Styles and Appearance
description: "Learn about the rendering of the Kendo UI components and how to change their default options."
slug: components_rendering_overview
position: 0
---

# Overview

> * R1 2023 is the last official release of Kendo jQuery, where Less Themes are supported and shipped with the product.
> * With the upcoming R3 2023 release, the fonts will no longer be delivered with the Telerik and Kendo UI themes. To continue using the font icons, you must add a separate CDN reference to the font icons stylesheet.

Kendo UI R1 2022 introduces new rendering for several components. As the new rendering implementation is an ongoing effort, there may be slight changes and touch-ups after the release. 

The new rendering will cover the entire list of the Kendo UI web components.

> Larger visual updates like these can have implications in the form of visual regressions which can appear when upgrading from a version prior to R1 2022. 
>
> The team have caught and resolved many visual regression issues while getting ready for R1 2022. However, it is possible that some additional post-release problems occur. The team will address all issues as quickly as possible and will continue to push out updates with fixes to the themes and components after the R1 2022 release.

- [What Is the Reason behind These Changes?](#what-is-the-reason-behind-these-changes)
- [Styling Options](#styling-options)
- [Overriding Default Widget Options](#overriding-default-widget-options)
- [State Classes](#state-classes)
- [List of Updated Components](#updated-components)
- [Migrating from Less Themes](#less-themes-migration)


## What Is the Reason behind These Changes?

The new rendering provides developers with the ability to change a particular styling option of a component. This helps to avoid the need of manually overriding the CSS styles of a component.

One of the main reasons behind these changes is the feedback provided by the customers. Many of the users of Kendo UI express that currently the themes are difficult to customize and take more effort than they should.

The emergence of design languages over the past few years is also an important factor. Many of our customers prefer to customize the default themes to better suit their business requirements, instead of using them straight out-of-the-box.

Ultimately, the new rendering aims to ease the customization of components and allow developers to implement any design requirements with less work.

## Styling Options

The styling options under the hood represent a set of CSS classes applied in the rendering to change the appearance of a component. Each different component may or may not support a particular option. For example a `textarea` element can have a configurable `overflow`, however this option doesn't make sense in the context of a `button` element. 

Check the **Appearance** documentation articles in the [Updated Components](#updated-components) section to learn about the available styling options for each component.

## Overriding Default Widget Options

The new rendering implementations also enable you to globally change the default styling options of the widgets.

The following example showcases how to overwrite the default size of the Button widget. Note that if the code is placed at the root of the project right after the `kendo.all.min.js` script, all Kendo UI Button widgets will have a `large` size by default. If the code is placed at the beginning of a particular page, all Kendo UI Button widgets on that page will have a `large` size by default.

```html
<script>
    kendo.ui['Button'].fn.options['size'] = "large";
</script>
```

The overriding mechanism follows the `kendo.ui[WidgetName].fn.options[OptionName] = [value];` structure.

The following example showcases a full implementation of the override:

```dojo
<script>
    kendo.ui['Button'].fn.options['size'] = "large";
    kendo.ui['Button'].fn.options['rounded'] = "full";
</script>

<button id="button1">Button 1</button>
<button id="button2">Button 2</button>
<button id="button3">Button 3</button>
<button id="button4">Button 4</button>

<script>
    $("#button1").kendoButton({
        themeColor: "primary"
    });

    $("#button2").kendoButton({
        themeColor: "warning"
    });

    $("#button3").kendoButton({
        shape: "secondary"
    });

    $("#button4").kendoButton({
        themeColor: "dark"
    });
</script>
```

## State Classes

Apart from the new styling options, the state classes have also been changed. The `k-state-default` class has been completely removed from the entire Kendo suite, except for the PivotGrid, where logic relies on it.

The following table showcases the old and updated versions of the Kendo state classes:

| Old Class          | New Class    |
|:-------------------|:-------------|
| `k-state-default`  | N/A          |
| `k-state-active`   | `k-active`   |
| `k-state-selected` | `k-selected` |
| `k-state-disabled` | `k-disabled` |
| `k-state-focus`    | `k-focus`    |
| `k-state-hover`    | `k-hover`    |

## Updated Components

| Component              | Appearance Documentation                                                                                 |
|:-----------------------|:---------------------------------------------------------------------------------------------------------|
| `AutoComplete`         | [AutoComplete Appearance Documentation]({% slug sizedimensions_kendoui_autocomplete %})                  |
| `Avatar`               | [Avatar Appearance Documentation]({% slug appearance_kendoui_avatar_widget %})                  |
| `Button`               | [Button Appearance Documentation]({% slug button_styling_widget %})                                      |
| `ColorPicker`          | [ColorPicker Appearance Documentation]({% slug appearance_kendoui_colorpicker_widget %})                 |
| `ComboBox`             | [ComboBox Appearance Documentation]({% slug appearance_kendoui_combobox %})                              |
| `DateInput`            | [DateInput Appearance Documentation]({% slug appearance_kendoui_dateinput_widget %})                     |
| `DatePicker`           | [DatePicker Appearance Documentation]({% slug appearance_kendoui_datepicker_widget %})                   |
| `DateRangePicker`      | [DateRangePicker Appearance Documentation]({% slug appearance_kendoui_daterangepicker_widget %})         |
| `DateTimePicker`       | [DateTimePicker Appearance Documentation]({% slug appearance_kendoui_datetimepicker_widget %})           |
| `DropDownList`         | [DropDownList Appearance Documentation]({% slug appearance_kendoui_dropdownlist_widget %})               |
| `DropDownTree`         | [DropDownTree Appearance Documentation]({% slug appearance_kendoui_dropdowntree %})                      |
| `FloatingActionButton` | [FloatingActionButton Appearance Documentation]({% slug appearance_floatingactionbutton_widget %})       |
| `MaskedTextBox`        | [MaskedTextBox Appearance Documentation]({% slug maskedtextbox_appearance %})                            |
| `Menu`                 | [Menu Appearance Documentation]({% slug appearance_kendoui_menu %})                                      |
| `MultiColumnComboBox`  | [MultiColumnComboBox Appearance Documentation]({% slug appearance_kendoui_multicolumncombobox_widget %}) |
| `MultiSelect`          | [MultiSelect Appearance Documentation]({% slug appearance_kendoui_multiselect_widget %})                 |
| `NumericTextBox`       | [NumericTextBox Appearance Documentation]({% slug appearance_kendoui_numerictextbox_widget %})           |
| `Slider`               | [Slider Appearance Documentation]({% slug appearance_kendoui_slider_widget %})                           |
| `Switch`               | [Switch Appearance Documentation]({% slug appearance_kendoui_switch_widget %})                           |
| `TextArea`             | [TextArea Appearance Documentation]({% slug textarea_appearance %})                                      |
| `TextBox`              | [TextBox Appearance Documentation]({% slug appearance_kendoui_textbox_widget %})                         |
| `TimePicker`           | [TimePicker Appearance Documentation]({% slug appearance_kendoui_timepicker_widget %})                   |
| `TreeView`             | [TreeView Appearance Documentation]({% slug appearance_kendoui_treeview_widget %})                       |

## Less Themes Migration

> R1 2023 is the last official release of Kendo jQuery, where Less Themes are supported and shipped with the product.

For additional information about the required steps for migrating to a Sass theme, visit the [Less Migration]({% slug less_themes_migration %}) help article.