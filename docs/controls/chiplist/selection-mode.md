---
title: Selection Mode
page_title: jQuery ChipList Documentation - ChipList Selection Mode
description: "Learn how to set different selection modes for the Kendo UI for jQuery ChipList component."
slug: selection_mode_kendoui_chiplist_widget
position: 3
---

# Selection Mode

The ChipList provides options for setting its selection mode:

* [`none`](#none-selection) (default)
* [`single`](#single-selection)
* [`multiple`](#multiple-selection)

## None Selection

The following example demonstrates the `none` selection mode.

```dojo
    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            selectable: 'none',
            items: [
                { label: 'One' },
                { label: 'Two' },
                { label: 'Three' }
            ]
        });
    </
```

## Single Selection

The following example demonstrates the `single` selection mode.

```dojo
    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            selectable: 'single',
            items: [
                { label: 'One' },
                { label: 'Two' },
                { label: 'Three' }
            ]
        });
    </script>
```

## Multiple Selection

The following example demonstrates the `multiple` selection mode.

```dojo
    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            selectable: 'multiple',
            items: [
                { label: 'One' },
                { label: 'Two' },
                { label: 'Three' }
            ]
        });
    </script>
```

## See Also

* [Binding the ChipList over MVVM (Demo)](https://demos.telerik.com/kendo-ui/chiplist/mvvm)
* [Applying the ChipList API (Demo)](https://demos.telerik.com/kendo-ui/chiplist/api)
* [JavaScript API Reference of the ChipList](/api/javascript/ui/chiplist)
