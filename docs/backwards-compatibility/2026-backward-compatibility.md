---
title: 2026 Releases
page_title: 2026 Releases - Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2026."
slug: breakingchanges2026_kendoui
components: ["general"]
position: 0
---

# 2026 Releases

This article lists the breaking or important changes in the 2026 releases of Kendo UI. For the complete list of changes in the UI components, see the [product release history](https://www.telerik.com/support/whats-new/kendo-ui/release-history).

## Kendo UI 2026 Q1

### Chat Suggestions Configuration Changes

Starting with the **2026 Q1** release, the Chat component has renamed the scrollable configuration options for suggested actions and suggestions to use a more descriptive layout mode approach.

#### Renamed Options

| Previous Option | New Option |
|-----------------|------------|
| `suggestedActionsScrollable` | `suggestedActionsLayoutMode` |
| `suggestionsScrollable` | `suggestionsLayoutMode` |

#### Value Changes

The boolean values have been replaced with the `SuggestionsLayoutMode` enum:

| Previous Value | New Value |
|----------------|-----------|
| `false/true` | `"wrap/scroll/scrollbuttons"` |

#### Migration Examples

**Before (2025 and earlier):**

```javascript
$("#chat").kendoChat({
    suggestedActionsScrollable: false,
    suggestionsScrollable: true
});
```

**After (2026 Q1 and later):**

```javascript
$("#chat").kendoChat({
    suggestedActionsLayoutMode: "wrap",
    suggestionsLayoutMode: "scroll"
});
```

#### Available Layout Modes

| Value | Description |
|-------|-------------|
| `"wrap"` | Suggestions wrap to multiple lines within the available space |
| `"scroll"` | Suggestions are displayed in a horizontally scrollable container |
| `"scrollbuttons"` | Suggestions are displayed in a horizontally scrollable container with scroll buttons on each side |

### TreeView Enhanced Rendering (HTML and CSS)

Starting with the **2026 Q1** release, the TreeView adopts enhanced rendering that updates the generated HTML and the CSS hooks used for styling.

#### Key HTML Structure Changes

**Wrapper class renamed**

Before: Position-based wrapper classes were used:
- `k-treeview-top`
- `k-treeview-mid`
- `k-treeview-bot`

After: A single unified wrapper class is used:
- `k-treeview-item-content`

If you have custom CSS or jQuery selectors, replace selectors that target the positional classes with `.k-treeview-item-content`.

**CSS variable for indentation level**

Each `.k-treeview-item` now renders a `--kendo-treeview-level` CSS custom property that the theme uses to calculate indentation via `padding-inline-start`.

Example:

```html
<li class="k-treeview-item" style="--kendo-treeview-level: 1;">
    ...
</li>
<li class="k-treeview-item" style="--kendo-treeview-level: 2;">
    ...
</li>
```

**State classes moved**

Before: State classes (`k-hover`, `k-focus`, `k-selected`, `k-disabled`) were applied to the `.k-treeview-leaf` element.

After: State classes are applied to the `.k-treeview-item-content` wrapper.

Update any custom selectors accordingly, for example:

```css
/* Before */
.k-treeview .k-treeview-leaf.k-selected { /* ... */ }

/* After */
.k-treeview .k-treeview-item-content.k-selected { /* ... */ }
```

### Component Appearance Defaults Removed

> Starting with the R1 2026 release, Kendo UI for jQuery components no longer render default appearance CSS classes. Previously, components automatically added `size`, `rounded`, `fillMode`, and `themeColor` classes to their DOM elements. Instead, these properties default to `undefined`, allowing the theme's CSS to control the component styling.

### What Changed

Previously, components had hardcoded defaults like:
- `size: "medium"`
- `rounded: "medium"`
- `fillMode: "solid"`
- `themeColor: "base"`

Now, these properties default to `undefined`. When `undefined`, no CSS modifier classes (like `k-button-md`, `k-rounded-md`, `k-button-solid`) are added to the component markup. The theme's base CSS selectors control the default appearance.


Components previously rendered with explicit styling classes like:

```html
<!-- Before -->
<button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Click Me</button>
```

Now render with minimal base classes:

```html
<!-- After -->
<button class="k-button">Click Me</button>
```

>tip The visual appearance remains the same because Kendo Themes v13+ apply default styles to base classes.

### Removed CSS Classes by Category

#### Size Classes (No Longer Rendered by Default)

| Class | Component Types |
|-------|-----------------|
| `k-button-sm` | Buttons |
| `k-button-md` | Buttons |
| `k-button-lg` | Buttons |
| `k-input-sm` | Input components |
| `k-input-md` | Input components |
| `k-input-lg` | Input components |
| `k-picker-sm` | Picker components |
| `k-picker-md` | Picker components |
| `k-picker-lg` | Picker components |
| `k-checkbox-sm` | CheckBox, TreeView |
| `k-checkbox-md` | CheckBox, TreeView |
| `k-checkbox-lg` | CheckBox |
| `k-chip-sm` | Chip, ChipList |
| `k-chip-md` | Chip, ChipList |
| `k-chip-lg` | Chip |
| `k-badge-sm` | Badge |
| `k-badge-md` | Badge |
| `k-badge-lg` | Badge |
| `k-avatar-sm` | Avatar |
| `k-avatar-md` | Avatar |
| `k-avatar-lg` | Avatar |
| `k-loader-sm` | Loader |
| `k-loader-md` | Loader |
| `k-loader-lg` | Loader |
| `k-calendar-md` | Calendar, MultiViewCalendar |
| `k-table-md` | Grid, TreeList, PivotGrid, and other table-based components |
| `k-toolbar-md` | Toolbar |
| `k-form-md` | Form |

#### Rounded Classes (No Longer Rendered by Default)

| Class | Description |
|-------|-------------|
| `k-rounded-sm` | Small border radius |
| `k-rounded-md` | Medium border radius |
| `k-rounded-lg` | Large border radius |
| `k-rounded-full` | Full/pill border radius |

#### FillMode Classes (No Longer Rendered by Default)

The combined fillMode-themeColor class pattern has been split into separate classes:

| Versions prior to 2026.1 | Versions 2026.1 and later |
|:--- |:--- |
| `k-button-solid-base` | `k-button-solid` |
| `k-button-solid-primary` | `k-button-solid k-button-primary` |
| `k-button-solid-secondary` | `k-button-solid k-button-secondary` |
| `k-button-flat-base` | `k-button-flat` |
| `k-button-flat-primary` | `k-button-flat k-button-primary` |
| `k-chip-solid-base` | `k-chip-solid` |
| `k-chip-solid-primary` | `k-chip-solid k-button-primary` |

Default fillMode classes (`k-button-solid`, `k-input-solid`, etc.) are no longer rendered when using theme defaults:

| Class | Component Types |
|-------|-----------------|
| `k-button-solid` | Buttons (removed when default) |
| `k-button-flat` | Flat buttons (rendered only when explicitly set) |
| `k-button-outline` | Outline buttons (rendered only when explicitly set) |
| `k-input-solid` | Input components (removed when default) |
| `k-input-flat` | Input components (rendered only when explicitly set) |
| `k-input-outline` | Input components (rendered only when explicitly set) |
| `k-picker-solid` | Picker components (removed when default) |
| `k-picker-flat` | Picker components (rendered only when explicitly set) |
| `k-picker-outline` | Picker components (rendered only when explicitly set) |
| `k-chip-solid` | Chip (removed when default) |
| `k-chip-outline` | Chip (rendered only when explicitly set) |
| `k-badge-solid` | Badge (removed when default) |
| `k-badge-outline` | Badge (rendered only when explicitly set) |
| `k-avatar-solid` | Avatar (removed when default) |
| `k-avatar-outline` | Avatar (rendered only when explicitly set) |

### Affected Components

The following components no longer render default appearance classes:

#### Input Components

| Component | fillMode | size | rounded | themeColor |
|-----------|----------|------|---------|------------|
| AutoComplete | Removed | Removed | Removed | - |
| ComboBox | Removed | Removed | Removed | - |
| DateInput | Removed | Removed | Removed | - |
| DatePicker | Removed | Removed | Removed | - |
| DateRangePicker | Removed | Removed | Removed | - |
| DateTimePicker | Removed | Removed | Removed | - |
| DropDownGrid | Removed | Removed | Removed | - |
| DropDownList | Removed | Removed | Removed | - |
| DropDownTree | Removed | Removed | Removed | - |
| MaskedTextBox | Removed | Removed | Removed | - |
| MultiSelect | Removed | Removed | Removed | - |
| MultiSelectTree | Removed | Removed | Removed | - |
| NumericTextBox | Removed | Removed | Removed | - |
| OTPInput | Removed | Removed | Removed | - |
| TextArea | Removed | Removed | Removed | - |
| TextBox | Removed | Removed | Removed | - |
| TimeDurationPicker | Removed | Removed | Removed | - |
| TimePicker | Removed | Removed | Removed | - |
| ColorPicker | Removed | Removed | Removed | - |
| ColorGradient | - | Removed | - | - |
| ColorPalette | - | Removed | - | - |
| Signature | Removed | Removed | Removed | - |

#### Button Components

| Component | fillMode | size | rounded | themeColor |
|-----------|----------|------|---------|------------|
| Button | Removed | Removed | Removed | Removed |
| ButtonGroup | Removed | - | - | - |
| SplitButton | Removed | Removed | Removed | Removed |
| DropDownButton | Removed | Removed | Removed | Removed |
| MenuButton | Removed | Removed | Removed | Removed |
| FloatingActionButton | Removed | Removed | Removed | Removed |

#### Chip Components

| Component | fillMode | size | rounded | themeColor |
|-----------|----------|------|---------|------------|
| Chip | Removed | Removed | Removed | Removed |
| ChipList | - | Removed | - | - |

#### Indicator Components

| Component | fillMode | size | rounded | themeColor |
|-----------|----------|------|---------|------------|
| Avatar | Removed | Removed | Removed | Removed |
| Badge | Removed | Removed | Removed | Removed |
| Loader | - | Removed | - | Removed |

 >tip Starting with the **2026 Q1** release, the Badge component renders with the `primary` appearance by default. Because appearance defaults are now theme-controlled, the `themeColor` option will be `undefined` when not set, but the theme applies the primary styling. To preserve the previous (secondary) look, explicitly set `themeColor: 'secondary'`.

#### Navigation Components

| Component | fillMode | size | rounded | themeColor |
|-----------|----------|------|---------|------------|
| BottomNavigation | Removed | - | - | Removed |
| Breadcrumb | - | Removed | - | - |
| TabStrip | - | Removed | - | - |

#### Selection Components

| Component | fillMode | size | rounded | themeColor |
|-----------|----------|------|---------|------------|
| CheckBox | - | Removed | Removed | - |
| RadioButton | - | Removed | - | - |
| Switch | - | Removed | Removed | - |

#### Data Components

| Component | fillMode | size | rounded | themeColor |
|-----------|----------|------|---------|------------|
| Grid | - | Removed | - | - |
| ListBox | - | Removed | - | - |
| Pager | - | Removed | - | - |
| TreeView | - | Removed | - | - |

#### Layout & Containers

| Component | fillMode | size | rounded | themeColor |
|-----------|----------|------|---------|------------|
| AppBar | - | - | - | Removed |
| Dialog | - | - | - | Removed |
| Window | - | - | - | Removed |
| ToolBar | Removed | Removed | - | - |
| Form | - | Removed | - | - |

#### Notification

 >tip Starting with **2026 Q1** version when no `type` parameter is passed the the [`show`](/api/javascript/ui/notification/methods/show) method, the Notification will be displayed with default colors. Previously, the default value of the `type` property was `info`. If you need to acheive the previous behavior you can use the approaches demonstrated below:

```
var notification = $("#notification").kendoNotification().data("kendoNotification");

notification.show("Some text", "info");

//or

notification.info("Some text");

```

#### Icons

| Component | fillMode | size | rounded | themeColor |
|-----------|----------|------|---------|------------|
| Icon | - | Removed | - | Removed |
| SVGIcon | - | Removed | - | Removed |

### Components with Internal Template Changes

The following components have internal buttons, inputs, checkboxes, or other elements that previously had hardcoded default appearance classes. These classes have been removed:

- Calendar, MultiViewCalendar
- ColumnMenu
- Dialog
- Editor
- FileBrowser
- FileManager
- Filter, FilterMenu
- Gantt
- Grid, TreeList, PivotGrid
- Map
- MediaPlayer
- Menu
- Pager
- PanelBar
- PDFViewer
- Scheduler
- Spreadsheet
- TabStrip
- TaskBoard
- Timeline
- TreeView
- Upload

### Migration Guide

#### If You Need Explicit Styling

If your application relies on the previous default classes, you can explicitly set the options:

```javascript
// Before (implicit defaults)
$("#button").kendoButton();
// Rendered: <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">

// After (explicit sizing)
$("#button").kendoButton({
    size: "medium",
    rounded: "medium",
    fillMode: "solid",
    themeColor: "base"
});
// Rendered: <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
```

#### If You Have Custom CSS Targeting Size Classes

Update your CSS selectors to target base classes or use explicit options:

```css
/* Before - targeting medium buttons */
.k-button.k-button-md {
    /* custom styles */
}

/* After - target base class (theme provides defaults) */
.k-button {
    /* custom styles */
}

/* Or set explicit size and target that */
.k-button.k-button-md {
    /* only applies when size: "medium" is explicitly set */
}
```

#### If You Use the `"none"` Value

The `"none"` value has been **removed** from size, fillMode, and rounded options. If you were using `"none"` to disable styling:

```javascript
// Before
$("#button").kendoButton({ size: "none" }); // No longer supported

// After - omit the option entirely
$("#button").kendoButton();
```

Learn how to restore previous default appearance values for Kendo UI for jQuery components in the [article linked here](slug:migrate-theme-controlled-appearance-defaults).

### Theme Version Update

The Kendo themes have been updated to version **13.0.0** (from 12.x). The new theme version provides default styling via CSS instead of requiring JavaScript to add explicit modifier classes.

### Benefits

1. **Cleaner DOM** - Components render fewer CSS classes
2. **Flexible Theming** - Easier to customize default appearance via CSS
3. **Smaller Markup** - Reduced HTML output size
4. **Centralized Defaults** - Styling defaults managed in CSS, not JavaScript

