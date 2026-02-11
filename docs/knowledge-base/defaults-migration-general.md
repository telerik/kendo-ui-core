---
title: Migrating to Theme-Controlled Appearance Defaults
description: Learn how to restore previous default appearance values for Kendo UI components after upgrading to R1 2026.
page_title: Migrating to Theme-Controlled Appearance Defaults - Kendo UI
slug: migrate-theme-controlled-appearance-defaults
tags: appearance, defaults, size, rounded, fillmode, themecolor, migration, kendo, ui, jquery, mvc, core
res_type: kb
components: ["general"]
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2026.1.0 and later</td>
		</tr>
	</tbody>
</table>

## Description

Starting with the [R1 2026](slug:breakingchanges2026_kendoui) release, Kendo UI components no longer apply hardcoded default values for appearance properties (`size`, `rounded`, `fillMode`, `themeColor`). Instead, these properties default to `undefined` (for jQuery) or `null` (for ASP.NET wrappers), allowing the theme's CSS to control the component styling.

This article provides solutions for restoring the previous default behavior if your application relies on the explicit default classes that were previously rendered.

## What Changed

Previously, components had hardcoded defaults like:
- `size: "medium"`
- `rounded: "medium"`
- `fillMode: "solid"`
- `themeColor: "base"`

Now, these properties default to `undefined`. When `undefined`, no CSS modifier classes (like `k-button-md`, `k-rounded-md`, `k-button-solid`) are added to the component markup. The theme's base CSS selectors control the default appearance.

**Before:**
```html
<button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Click Me</button>
```

**After:**
```html
<button class="k-button">Click Me</button>
```

## Benefits

- **Theme consistency**: Components automatically inherit the theme's intended default styling
- **Smaller markup**: No unnecessary CSS modifier classes when using theme defaults
- **Easier customization**: Themes can define their own default appearances without conflicts

## Solution

If you need to restore the previous behavior where components use explicit `medium`/`solid`/`base` defaults, use one of the following options:

### Option 1: Restore Defaults for All Components

Add this script **after** loading Kendo UI but **before** initializing any components:

```javascript
(function(kendo) {
    // Define the previous default values
    var appearanceDefaults = {
        size: "medium",
        rounded: "medium",
        fillMode: "solid",
        themeColor: "base"
    };

    // List of components that support appearance options
    var componentsWithAppearance = [
        // Buttons
        "Button", "DropDownButton", "SplitButton", "ButtonGroup", "ToggleButton",
        "FloatingActionButton", "ToolBar",

        // Editors
        "AutoComplete", "ComboBox", "DropDownList", "DropDownTree", "MultiSelect",
        "MultiColumnComboBox", "TextBox", "TextArea", "NumericTextBox", "MaskedTextBox",
        "ColorPicker", "FlatColorPicker", "ColorGradient", "ColorPalette",
        "DatePicker", "TimePicker", "DateTimePicker", "DateInput", "DateRangePicker",
        "TimeDurationPicker", "Signature", "Rating", "Slider", "RangeSlider",
        "Switch", "RadioGroup", "CheckBoxGroup", "OTPInput",

        // Data Management
        "Grid", "TreeList", "ListView", "Pager", "Filter",

        // Navigation
        "Menu", "ContextMenu", "PanelBar", "TabStrip", "TreeView", "Stepper",
        "Breadcrumb", "BottomNavigation",

        // Layout
        "Window", "Dialog", "Notification", "Popover", "Tooltip",

        // Indicators
        "Badge", "Avatar", "Chip", "ChipList", "Loader",

        // Scheduling
        "Scheduler", "Gantt", "Calendar", "MultiViewCalendar"
    ];

    // Extend each component's default options
    componentsWithAppearance.forEach(function(widgetName) {
        var widget = kendo.ui[widgetName];
        if (widget && widget.fn && widget.fn.options) {
            var options = widget.fn.options;

            // Only set defaults for properties that exist in the widget
            if ("size" in options) {
                options.size = options.size || appearanceDefaults.size;
            }
            if ("rounded" in options) {
                options.rounded = options.rounded || appearanceDefaults.rounded;
            }
            if ("fillMode" in options) {
                options.fillMode = options.fillMode || appearanceDefaults.fillMode;
            }
            if ("themeColor" in options) {
                options.themeColor = options.themeColor || appearanceDefaults.themeColor;
            }
        }
    });
})(window.kendo);
```

### Option 2: Restore Defaults for Specific Components

If you only need to restore defaults for specific components:

```javascript
(function(kendo) {
    // Restore Button defaults
    if (kendo.ui.Button) {
        kendo.ui.Button.fn.options.size = "medium";
        kendo.ui.Button.fn.options.rounded = "medium";
        kendo.ui.Button.fn.options.fillMode = "solid";
        kendo.ui.Button.fn.options.themeColor = "base";
    }

    // Restore TextBox defaults
    if (kendo.ui.TextBox) {
        kendo.ui.TextBox.fn.options.size = "medium";
        kendo.ui.TextBox.fn.options.rounded = "medium";
        kendo.ui.TextBox.fn.options.fillMode = "solid";
    }

    // Restore DropDownList defaults
    if (kendo.ui.DropDownList) {
        kendo.ui.DropDownList.fn.options.size = "medium";
        kendo.ui.DropDownList.fn.options.rounded = "medium";
        kendo.ui.DropDownList.fn.options.fillMode = "solid";
    }

    // Add more components as needed...
})(window.kendo);
```

### Option 3: Set Defaults Per Instance

You can also set appearance options when initializing individual components:

```javascript
// jQuery initialization
$("#button").kendoButton({
    size: "medium",
    rounded: "medium",
    fillMode: "solid",
    themeColor: "base"
});

// Or use a shared configuration object
var defaultAppearance = {
    size: "medium",
    rounded: "medium",
    fillMode: "solid",
    themeColor: "base"
};

$("#button1").kendoButton($.extend({}, defaultAppearance, { content: "Button 1" }));
$("#button2").kendoButton($.extend({}, defaultAppearance, { content: "Button 2" }));
```


### Theme Version Requirement

This change works with Kendo Themes v13.0.0 or later. Ensure your theme references are updated:

```html
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/13.0.0/default/default-main.css" />
```

## See Also

* [Kendo UI Styling Documentation](https://docs.telerik.com/kendo-ui/styles-and-layout/components-rendering-overview)
* [Kendo UI 2026 Backwards Compatibility]({% slug breakingchanges2026_kendoui %})