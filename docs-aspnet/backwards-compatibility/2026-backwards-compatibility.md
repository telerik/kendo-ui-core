---
title: 2026 Releases
page_title: 2026 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2026."
components: ["general"]
slug: breakingchanges_2026
position: 2
---

# 2026 Releases

This article lists the breaking or important changes in the 2026 releases of {{ site.product }}.

## {{ site.product }} 2026 Q1

### Chat Suggestions Configuration Changes

Starting with the **2026 Q1** release, the Chat component has renamed the scrollable configuration options for suggested actions and suggestions to use a more descriptive layout mode approach.

#### Renamed Options

| Previous Option              | New Option                   |
| ---------------------------- | ---------------------------- |
| `SuggestedActionsScrollable` | `SuggestedActionsLayoutMode` |
| `SuggestionsScrollable`      | `SuggestionsLayoutMode`      |

#### Value Changes

The boolean values have been replaced with the `SuggestionsLayoutMode` enum:

| Previous Value | New Value                     |
| -------------- | ----------------------------- |
| `False/True`   | `"Wrap/Scroll/ScrollButtons"` |

#### Migration Examples

**Before (2025 and earlier):**

```HtmlHelper
    @(Html.Kendo().Chat()
        .Name("chat")
        .SuggestedActionsScrollable(false)
        .SuggestionsScrollable(true)
    )
```

{% if site.core %}

```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chat name="chat"
        suggested-actions-scrollable="false"
        suggestions-scrollable="true">
    </kendo-chat>
```

{% endif %}

**After (2026 Q1 and later):**

```HtmlHelper
    @(Html.Kendo().Chat()
        .Name("chat")
        .SuggestedActionsLayoutMode(SuggestionsLayoutMode.Wrap)
        .SuggestionsLayoutMode(SuggestionsLayoutMode.Scroll)
    )
```

{% if site.core %}

```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chat name="chat"
        suggested-actions-layout-mode="SuggestionsLayoutMode.Wrap"
        suggestions-layout-mode="SuggestionsLayoutMode.Scroll">
    </kendo-chat>
```

{% endif %}

#### Available Layout Modes

| Value             | Description                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| `"Wrap"`          | Suggestions wrap to multiple lines within the available space                                     |
| `"Scroll"`        | Suggestions are displayed in a horizontally scrollable container                                  |
| `"ScrollButtons"` | Suggestions are displayed in a horizontally scrollable container with scroll buttons on each side |

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
<li class="k-treeview-item" style="--kendo-treeview-level: 1;">...</li>
<li class="k-treeview-item" style="--kendo-treeview-level: 2;">...</li>
```

**State classes moved**

Before: State classes (`k-hover`, `k-focus`, `k-selected`, `k-disabled`) were applied to the `.k-treeview-leaf` element.

After: State classes are applied to the `.k-treeview-item-content` wrapper.

Update any custom selectors accordingly, for example:

```css
/* Before */
.k-treeview .k-treeview-leaf.k-selected {
    /* ... */
}

/* After */
.k-treeview .k-treeview-item-content.k-selected {
    /* ... */
}
```

### Appearance Defaults Removed

> Starting with the 2026 Q1 release, {{ site.product }} components no longer render default appearance CSS classes. Previously, components automatically added `size`, `rounded`, `fillMode`, and `themeColor` classes to their HTML output. Instead, these properties now default to `null`, allowing the theme's CSS to control the component styling.

#### What Changed

Previously, components had hardcoded defaults like:

- `Size = ComponentSize.Medium`
- `Rounded = Rounded.Medium`
- `FillMode = ButtonFillMode.Solid`
- `ThemeColor = ThemeColor.Base`

Now, these properties default to `null`. When `null`, no CSS modifier classes (like `k-button-md`, `k-rounded-md`, `k-button-solid`) are added to the component markup. The theme's base CSS selectors control the default appearance.

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

The visual appearance remains the same because Kendo Themes v13+ apply default styles to base classes.

### API Changes

1. **`None` enum value removed** from appearance enums
2. **Builder methods now accept nullable types** for appearance properties

#### Removed Enum Values

The following `None` values have been **removed** from appearance enums:

| Enum             | Removed Value |
| ---------------- | ------------- |
| `ComponentSize`  | `None`        |
| `FillMode`       | `None`        |
| `ButtonFillMode` | `None`        |
| `ChipFillMode`   | `None`        |

**Migration for `None` Value Usage**

```csharp
// Before - using None to disable styling (NO LONGER VALID)
@(Html.Kendo().Button()
    .Name("btn")
    .Size(ComponentSize.None)  // Compile error!
)

// After - omit the call entirely
@(Html.Kendo().Button()
    .Name("btn")
)
```

### Removed CSS Classes by Category

#### Size Classes (No Longer Rendered by Default)

| Class           | Component Types    |
| --------------- | ------------------ |
| `k-button-sm`   | Buttons            |
| `k-button-md`   | Buttons            |
| `k-button-lg`   | Buttons            |
| `k-input-sm`    | Input components   |
| `k-input-md`    | Input components   |
| `k-input-lg`    | Input components   |
| `k-picker-sm`   | Picker components  |
| `k-picker-md`   | Picker components  |
| `k-picker-lg`   | Picker components  |
| `k-checkbox-sm` | CheckBox, TreeView |
| `k-checkbox-md` | CheckBox, TreeView |
| `k-checkbox-lg` | CheckBox           |
| `k-chip-sm`     | Chip, ChipList     |
| `k-chip-md`     | Chip, ChipList     |
| `k-chip-lg`     | Chip               |
| `k-badge-sm`    | Badge              |
| `k-badge-md`    | Badge              |
| `k-badge-lg`    | Badge              |
| `k-avatar-sm`   | Avatar             |
| `k-avatar-md`   | Avatar             |
| `k-avatar-lg`   | Avatar             |
| `k-loader-sm`   | Loader             |
| `k-loader-md`   | Loader             |
| `k-loader-lg`   | Loader             |

#### Rounded Classes (No Longer Rendered by Default)

| Class            | Description             |
| ---------------- | ----------------------- |
| `k-rounded-sm`   | Small border radius     |
| `k-rounded-md`   | Medium border radius    |
| `k-rounded-lg`   | Large border radius     |
| `k-rounded-full` | Full/pill border radius |

#### FillMode Classes (No Longer Rendered by Default)

| Class                    | Component Types                       |
| ------------------------ | ------------------------------------- |
| `k-button-solid`         | Buttons                               |
| `k-button-solid-base`    | Buttons with base theme color         |
| `k-button-solid-primary` | Buttons with primary theme color      |
| `k-button-flat`          | Flat buttons                          |
| `k-button-flat-base`     | Flat buttons with base theme color    |
| `k-button-flat-primary`  | Flat buttons with primary theme color |
| `k-button-outline`       | Outline buttons                       |
| `k-input-solid`          | Input components                      |
| `k-input-flat`           | Input components                      |
| `k-input-outline`        | Input components                      |
| `k-picker-solid`         | Picker components                     |
| `k-picker-flat`          | Picker components                     |
| `k-picker-outline`       | Picker components                     |
| `k-chip-solid`           | Chip                                  |
| `k-chip-solid-base`      | Chip with base theme color            |
| `k-chip-outline`         | Chip                                  |
| `k-badge-solid`          | Badge                                 |
| `k-badge-outline`        | Badge                                 |
| `k-avatar-solid`         | Avatar                                |
| `k-avatar-outline`       | Avatar                                |

#### ThemeColor Classes (No Longer Rendered by Default)

| Class Pattern            | Examples                                                                    |
| ------------------------ | --------------------------------------------------------------------------- |
| `k-button-solid-{color}` | `k-button-solid-base`, `k-button-solid-primary`, `k-button-solid-secondary` |
| `k-button-flat-{color}`  | `k-button-flat-base`, `k-button-flat-primary`                               |
| `k-chip-solid-{color}`   | `k-chip-solid-base`, `k-chip-solid-primary`                                 |
| `k-badge-solid-{color}`  | `k-badge-solid-primary`, `k-badge-solid-secondary`                          |

### Default Appearance Changes - Affected Components

The following components no longer render default appearance classes:

#### Input Components

| Component          | fillMode | size    | rounded | themeColor |
| ------------------ | -------- | ------- | ------- | ---------- |
| AutoComplete       | Removed  | Removed | Removed | -          |
| ComboBox           | Removed  | Removed | Removed | -          |
| DateInput          | Removed  | Removed | Removed | -          |
| DatePicker         | Removed  | Removed | Removed | -          |
| DateRangePicker    | Removed  | Removed | Removed | -          |
| DateTimePicker     | Removed  | Removed | Removed | -          |
| DropDownList       | Removed  | Removed | Removed | -          |
| DropDownTree       | Removed  | Removed | Removed | -          |
| MaskedTextBox      | Removed  | Removed | Removed | -          |
| MultiSelect        | Removed  | Removed | Removed | -          |
| NumericTextBox     | Removed  | Removed | Removed | -          |
| OTPInput           | Removed  | Removed | Removed | -          |
| TextArea           | Removed  | Removed | Removed | -          |
| TextBox            | Removed  | Removed | Removed | -          |
| TimeDurationPicker | Removed  | Removed | Removed | -          |
| TimePicker         | Removed  | Removed | Removed | -          |
| ColorPicker        | Removed  | Removed | Removed | -          |
| ColorGradient      | -        | Removed | -       | -          |
| ColorPalette       | -        | Removed | -       | -          |
| Signature          | Removed  | Removed | Removed | -          |

#### Button Components

| Component            | fillMode | size    | rounded | themeColor |
| -------------------- | -------- | ------- | ------- | ---------- |
| Button               | Removed  | Removed | Removed | Removed    |
| ButtonGroup          | Removed  | -       | -       | -          |
| SplitButton          | Removed  | Removed | Removed | Removed    |
| DropDownButton       | Removed  | Removed | Removed | Removed    |
| FloatingActionButton | Removed  | Removed | Removed | Removed    |

#### Chip Components

| Component | fillMode | size    | rounded | themeColor |
| --------- | -------- | ------- | ------- | ---------- |
| Chip      | Removed  | Removed | Removed | Removed    |
| ChipList  | -        | Removed | -       | -          |

#### Indicator Components

| Component | fillMode | size    | rounded | themeColor |
| --------- | -------- | ------- | ------- | ---------- |
| Avatar    | Removed  | Removed | Removed | Removed    |
| Badge     | Removed  | Removed | Removed | Removed    |
| Loader    | -        | Removed | -       | Removed    |

> tip The default `themeColor` of the `Badge` component is now `primary`.

#### Navigation Components

| Component        | fillMode | size    | rounded | themeColor |
| ---------------- | -------- | ------- | ------- | ---------- |
| BottomNavigation | Removed  | -       | -       | Removed    |
| Breadcrumb       | -        | Removed | -       | -          |
| TabStrip         | -        | Removed | -       | -          |

#### Selection Components

| Component   | fillMode | size    | rounded | themeColor |
| ----------- | -------- | ------- | ------- | ---------- |
| CheckBox    | -        | Removed | Removed | -          |
| RadioButton | -        | Removed | -       | -          |
| Switch      | -        | Removed | Removed | -          |

#### Data Components

| Component | fillMode | size    | rounded | themeColor |
| --------- | -------- | ------- | ------- | ---------- |
| Grid      | -        | Removed | -       | -          |
| ListBox   | -        | Removed | -       | -          |
| Pager     | -        | Removed | -       | -          |
| TreeView  | -        | Removed | -       | -          |

#### Layout & Containers

| Component | fillMode | size    | rounded | themeColor |
| --------- | -------- | ------- | ------- | ---------- |
| AppBar    | -        | -       | -       | Removed    |
| Dialog    | -        | -       | -       | Removed    |
| Window    | -        | -       | -       | Removed    |
| ToolBar   | Removed  | Removed | -       | -          |
| Form      | -        | Removed | -       | -          |

#### Notification

> tip Starting with **2026 Q1** version when no `type` parameter is passed the the [`show`](/api/javascript/ui/notification/methods/show) method, the Notification will be displayed with default colors. Previously, the default value of the `type` property was `info`. If you need to acheive the previous behavior you can use the approaches demonstrated below:

```
var notification = $("#notification").data("kendoNotification");

notification.show("Some text", "info");

//or

notification.info("Some text");

```

#### Icons

| Component | fillMode | size    | rounded | themeColor |
| --------- | -------- | ------- | ------- | ---------- |
| Icon      | -        | Removed | -       | Removed    |
| SVGIcon   | -        | Removed | -       | Removed    |

### Migration Guide

#### For HTML Helper (MVC)

If you need explicit styling, set the options:

```csharp
// Before (implicit defaults)
@(Html.Kendo().Button()
    .Name("myButton")
    .Content("Click Me")
)
// Rendered: <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">

// After (explicit sizing)
@(Html.Kendo().Button()
    .Name("myButton")
    .Content("Click Me")
    .Size(ComponentSize.Medium)
    .Rounded(Rounded.Medium)
    .FillMode(ButtonFillMode.Solid)
    .ThemeColor(ThemeColor.Base)
)
// Rendered: <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
```

{% if site.core %}

#### For Tag Helpers (Core)

```html
<!-- Before (implicit defaults) -->
<kendo-button name="myButton">Click Me</kendo-button>

<!-- After (explicit sizing) -->
<kendo-button name="myButton" size="ComponentSize.Medium" rounded="Rounded.Medium" fill-mode="ButtonFillMode.Solid" theme-color="ThemeColor.Base"> Click Me </kendo-button>
```

{% endif %}

#### Grid Component Changes

The Grid's internal elements (toolbar, pager, buttons) also no longer render default classes:

```csharp
// Before
@(Html.Kendo().Grid<Product>()
    .Name("grid")
    // Size defaulted to Medium
)

// After - Grid Size is null by default
// Set explicitly if needed:
@(Html.Kendo().Grid<Product>()
    .Name("grid")
    .Size(ComponentSize.Medium)
)
```

#### Dialog Actions

```csharp
// Before
.Actions(actions =>
{
    actions.Add().Text("OK").FillMode(ButtonFillMode.None); // No longer valid
})

// After
.Actions(actions =>
{
    actions.Add().Text("OK"); // Omit FillMode for default styling
})
```

#### Custom CSS Updates

If you have custom CSS targeting size classes:

```css
/* Before - targeting medium buttons */
.k-button.k-button-md {
    /* custom styles */
}

/* After - target base class (theme provides defaults) */
.k-button {
    /* custom styles */
}

/* Or explicitly set size in code and target that class */
```

### Theme Version Requirement

This change requires **Kendo Themes v13.0.0 or later**. Update your theme package references:

```xml
<!-- NuGet packages -->
<PackageReference Include="Telerik.UI.for.AspNet.Core" Version="2026.1.xxx" />
```

Or CDN references:

```html
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/13.0.0/default/default-main.css" />
```

### Benefits

1. **Cleaner DOM** - Components render fewer CSS classes
2. **Flexible Theming** - Easier to customize default appearance via CSS
3. **Smaller Markup** - Reduced HTML output size
4. **Centralized Defaults** - Styling defaults managed in CSS, not server-side code

### Diagram

For the fluent wrappers `DashTypes` were a **string** and are now **enums**.

{% if site.core %}
**HtmlHelpers**

- `DiagramConnectionContentBorderSettingsBuilder`
- `DiagramConnectionDefaultsContentBorderSettingsBuilder`
- `DiagramConnectionDefaultsEndCapStrokeSettingsBuilder`
- `DiagramConnectionDefaultsStartCapStrokeSettingsBuilder`
- `DiagramConnectionEndCapStrokeSettingsBuilder`
- `DiagramConnectionStartCapStrokeSettingsBuilder`
- `DiagramEditableResizeHandlesHoverStrokeSettingsBuilder`
- `DiagramEditableResizeHandlesStrokeSettingsBuilder`
- `DiagramSelectableStrokeSettingsBuilder`
- `DiagramShapeConnectorDefaultsHoverStrokeSettingsBuilder`
- `DiagramShapeConnectorDefaultsStrokeSettingsBuilder`
- `DiagramShapeConnectorHoverStrokeSettingsBuilder`
- `DiagramShapeConnectorStrokeSettingsBuilder`
- `DiagramShapeDefaultsConnectorDefaultsHoverStrokeSettingsBuilder`
- `DiagramShapeDefaultsConnectorDefaultsStrokeSettingsBuilder`
- `DiagramShapeDefaultsConnectorHoverStrokeSettingsBuilder`
- `DiagramShapeDefaultsConnectorStrokeSettingsBuilder`
- `DiagramShapeDefaultsStrokeSettingsBuilder`
- `DiagramShapeStrokeSettingsBuilder`

**TagHelpers**

- `DiagramConnectionContentBorderSettingsTagHelper`
- `DiagramConnectionDefaultsContentBorderSettingsTagHelper`
- `DiagramConnectionDefaultsEndCapStrokeSettingsTagHelper`
- `DiagramConnectionDefaultsStartCapStrokeSettingsTagHelper`
- `DiagramConnectionEndCapStrokeSettingsTagHelper`
- `DiagramConnectionStartCapStrokeSettingsTagHelper`
- `DiagramEditableResizeHandlesHoverStrokeSettingsTagHelper`
- `DiagramEditableResizeHandlesStrokeSettingsTagHelper`
- `DiagramSelectableStrokeSettingsTagHelper`
- `DiagramShapeConnectorDefaultsHoverStrokeSettingsTagHelper`
- `DiagramShapeConnectorDefaultsStrokeSettingsTagHelper`
- `DiagramShapeConnectorHoverStrokeSettingsTagHelper`
- `DiagramShapeConnectorStrokeSettingsTagHelper`
- `DiagramShapeDefaultsConnectorDefaultsHoverStrokeSettingsTagHelper`
- `DiagramShapeDefaultsConnectorDefaultsStrokeSettingsTagHelper`
- `DiagramShapeDefaultsConnectorHoverStrokeSettingsTagHelper`
- `DiagramShapeDefaultsConnectorStrokeSettingsTagHelper`
- `DiagramShapeDefaultsStrokeSettingsTagHelper`
- `DiagramShapeStrokeSettingsTagHelper`

{% endif %}

{% if site.mvc %}

- `DiagramConnectionContentBorderSettingsBuilder`
- `DiagramConnectionDefaultsContentBorderSettingsBuilder`
- `DiagramConnectionDefaultsEndCapStrokeSettingsBuilder`
- `DiagramConnectionDefaultsStartCapStrokeSettingsBuilder`
- `DiagramConnectionEndCapStrokeSettingsBuilder`
- `DiagramConnectionStartCapStrokeSettingsBuilder`
- `DiagramEditableResizeHandlesHoverStrokeSettingsBuilder`
- `DiagramEditableResizeHandlesStrokeSettingsBuilder`
- `DiagramEditableSelectStrokeSettingsBuilder`
- `DiagramSelectableStrokeSettingsBuilder`
- `DiagramShapeDefaultsStrokeSettingsBuilder`
- `DiagramShapeStrokeSettingsBuilder`
- `DiagramStrokeSettingsBuilder`
  {% endif %}
