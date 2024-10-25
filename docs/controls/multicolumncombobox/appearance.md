---
title: Appearance
page_title: jQuery MultiColumnComboBox Documentation - MultiColumnComboBox Appearance
description: "Learn how to apply different styling options to the MultiColumnComboBox widget."
slug: appearance_kendoui_multicolumncombobox_widget
position: 10
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI MultiColumnComboBox.

For a live example, visit the [Appearance Demo of the MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/appearance).

## Options

The Kendo UI MultiColumnComboBox supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the MultiColumnComboBox looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/multicolumncombobox/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="multicolumncombobox" />
<script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      size: "large",
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
            { field: "name" },
            { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-outline k-input-lg k-rounded-full">
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/multicolumncombobox/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `full` and it is applied to the `span.k-combobox` wrapping element that contains the whole HTML through the `k-rounded-full` class.

The example below shows a basic MultiColumnComboBox configuration and how to set `rounded` to "medium":

```dojo
<input id="multicolumncombobox" />
<script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      rounded: "medium",
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
            { field: "name" },
            { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
</script>
```

The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-outline k-input-lg k-rounded-md">
    ...
</span>
```

### FillMode

The `fillMode` option controls how the color is applied. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/multicolumncombobox/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-combobox` wrapping element through the `k-input-solid` class.

The example below shows a basic MultiColumnComboBox configuration and how to set `fillMode` to "outline":

```dojo
<input id="multicolumncombobox" />
<script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      fillMode: "outline",
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
            { field: "name" },
            { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
</script>
```
The changes are applied to the `span.k-combobox` wrapping element:

```html
<span class="k-input k-combobox k-widget k-dropdowngrid k-combobox-clearable k-input-outline k-input-medium k-rounded-full">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/appearance)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
