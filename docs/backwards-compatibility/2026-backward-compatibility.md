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

## Kendo UI 2026 Q3

### New summarizeAfter behavior for MultiSelect

Starting with the **2026 Q3** release, the default value of the MultiSelect `summarizeAfter` configuration is `10`. When users select more than 10 items, the first 10 tags are displayed and the remaining selections are summarized in an overflow tag.

To retain the previous behavior and render every selected item as an individual tag, set `summarizeAfter` to `null`.

```javascript
$("#multiselect").kendoMultiSelect({
    summarizeAfter: null
});
```

### Document Processing and Spreadsheet Package Changes for ASP.NET Integrations

The following package versions apply to these server-side integration scenarios:

| Package | Version | Notes |
|---------|---------|-------|
| [Telerik.Spreadsheet.Web](https://www.nuget.org/packages/Telerik.Spreadsheet.Web) | `1.2.0` | Spreadsheet server-side processing package |
| [Telerik.Pdf.Web](https://www.nuget.org/packages/Telerik.Pdf.Web) | `1.2.0` | Required for ASP.NET Core and ASP.NET MVC PDFViewer integration when using Document Processing-based PDF support |
| [Telerik.Export.Core](https://www.nuget.org/packages/Telerik.Export.Core) | `1.2.0` | Enables exporting `IEnumerable` data sources to Excel, CSV, PDF, DOCX, RTF, and TXT |

#### Spreadsheet Assembly Renamed

The Spreadsheet dependency assembly has been renamed from `Telerik.Web.Spreadsheet` to `Telerik.Spreadsheet.Web`.

#### PDF Processing Package Renamed

The PDF processing dependency package has been renamed from `Telerik.Web.PDF` to `Telerik.Pdf.Web`.

#### Server-Side Export Package Renamed

The server-side export dependency package has been renamed from `Telerik.Core.Export` to `Telerik.Export.Core`.

If your Kendo UI application relies on these ASP.NET server-side features, update project references accordingly and add the [Telerik.Spreadsheet.Web](https://www.nuget.org/packages/Telerik.Spreadsheet.Web) package explicitly. Likewise, replace `Telerik.Web.PDF` with [Telerik.Pdf.Web](https://www.nuget.org/packages/Telerik.Pdf.Web) and `Telerik.Core.Export` with [Telerik.Export.Core](https://www.nuget.org/packages/Telerik.Export.Core) where applicable.

This change affects server-side processing and packaging only. It does not change the client-side Kendo UI for jQuery Spreadsheet API.

### Accessibility Package Adoption Rendering Changes

Starting with the **2026 Q3** release, several components adopt the new accessibility package. As a result, their rendered HTML structure and CSS class hooks change to align with the updated accessibility implementation.

If your application uses custom CSS, DOM queries, snapshot tests, or automation that target the previous markup, review the following changes and update those integrations accordingly.

#### Removed CSS Classes

The following CSS classes are removed as part of the accessibility package adoption:

| Component | Removed classes | Notes |
|---------|---------|---------|
| Avatar | `k-widget` | Removed from the Avatar wrapper. |
| ActionSheet | `k-popup`, `k-text-center`, `k-hbox` | `k-popup` is removed from the ActionSheet root element. `k-text-center` and `k-hbox` are removed from the titlebar markup. |
| FileManager | `k-widget` | Removed from the FileManager wrapper. |
| MediaPlayer | `k-widget` | Removed from the MediaPlayer wrapper. |
| TabStrip | `k-rounded-none` | Removed from the TabStrip scroll buttons. |
| TreeMap | `k-widget` | Removed from the TreeMap wrapper. |

#### Shared Adaptive ActionSheet Titlebar Changes

The ActionSheet titlebar changes propagate to all components that use the shared adaptive ActionSheet implementation. In adaptive mode, the `k-text-center` and `k-hbox` classes are removed for the following components:

- AutoComplete
- ColorPicker
- ComboBox
- DatePicker
- DateRangePicker
- DateTimePicker
- DropDownList
- DropDownTree
- MultiColumnComboBox
- MultiSelect
- TimePicker

#### Other Structural Changes

The following breaking changes also alter the rendered structure:

| Component | Structural change |
|---------|---------|
| DockManager | A new `<span class="k-item-actions">` wrapper is added around the tab action buttons. |
| Splitter | Collapse handles and resize handles now render `<div>` elements instead of `<span>` elements. |
| TabStrip | The close button now adds the `k-remove-tab` class. |
| ToolBar | A new `k-toolbar-section` class is introduced for grouped sections. The overflow anchor button now adds the `k-rounded-none` class. Separator markup is also updated and overflow separators no longer render `role="separator"`. |

These changes are structural and may affect styling overrides or selectors that depend on removed classes, added wrappers, or previous element nesting.

### Scheduler - Enhanced Rendering (HTML and CSS)

Starting with the **2026 Q3** release, the Scheduler adopts enhanced rendering that updates the generated HTML and the CSS hooks used for styling. Custom CSS or DOM queries that target the previous markup must be updated.

#### Toolbar Markup Changed

The toolbar now uses `fillMode="flat"`, has a new element order, and adds a "New Event" primary button. The navigation buttons are restructured&mdash;"Today" is a standalone flat button and Prev/Next are a separate `ButtonGroup` with `fillMode="flat"`.

The view switcher remains a `SegmentedControl` at full width but collapses to a `MenuButton` at narrower widths. The toolbar progressively hides elements as available width decreases (responsive levels 0 through 3).

If you have custom CSS targeting the toolbar navigation `ButtonGroup` with solid fill, update it to target flat-styled buttons.

#### Event Element Structure Changed

The internal event structure now uses a flex layout with CSS Container Queries (`container-type: size`). The `k-event-actions` class has been removed.

Before:

```html
<div class="k-event">
  <span class="k-event-actions"><!-- recurrence icon --></span>
  <div>
    <div class="k-event-template k-event-time">8:00 AM</div>
    <div class="k-event-template">Event Title</div>
  </div>
  <span class="k-event-actions"><!-- delete link --></span>
  <span class="k-resize-handle k-resize-n"></span>
  <span class="k-resize-handle k-resize-s"></span>
</div>
```

After:

```html
<div class="k-event" style="container-type: size">
  <div>
    <div class="k-event-template k-event-title">Event Title</div>
    <div class="k-event-template k-event-time">
      <span class="k-event-recurrence-icon"><!-- icon --></span>
      10:00 AM - 10:30 AM
    </div>
  </div>
  <span class="k-event-recurrence-icon"><!-- icon --></span>
  <span class="k-resize-handle k-resize-n"></span>
  <span class="k-resize-handle k-resize-s"></span>
</div>
```

Key differences:

- Title renders before time (order reversed).
- `k-event-actions` replaced by `k-event-recurrence-icon` and `k-event-continuation` spans.
- Delete action removed from static rendering.
- Multi-day events use `k-event-continuation` spans with directional chevron icons.
- Layout uses `display: flex; overflow: visible` instead of `overflow: hidden`.

If you have custom CSS or jQuery selectors targeting `.k-event-actions`, replace them with `.k-event-recurrence-icon` or `.k-event-continuation`.

#### Header Cell Markup Changed

Day and Week view header cells now render two separate elements instead of a single combined text span.

Before:

```html
<th class="k-scheduler-cell k-heading-cell">
  <span class="k-link k-nav-day">Mon 6/13</span>
</th>
```

After:

```html
<th class="k-scheduler-cell k-heading-cell">
  <span class="k-scheduler-date-day">Mon</span>
  <span class="k-link k-nav-day">13</span>
</th>
```

If you have custom CSS targeting `.k-nav-day` content format, update it to account for the separate `.k-scheduler-date-day` element.

#### Edit Dialog Markup Changed

The quick create and quick edit flows now use a **Popover** (no overlay) instead of a full `Dialog`. Form labels use icons instead of text. Actions use the `k-popover-actions` class.

The full edit dialog date/time section has the following changes:

- Date and time pickers are now wrapped in `.k-scheduler-edit-form-row` containers instead of being direct grid children.
- The `from`/`to` separator text uses a `.k-scheduler-datetime-label` class.
- The grid changes from a 5-column layout to 3 columns (`2.5fr 1fr min-content`).
- All-day toggle uses a `Switch` component instead of a checkbox.

If you have custom CSS targeting date/time picker layout inside `.k-scheduler-datetime-grid`, update selectors to account for the new `.k-scheduler-edit-form-row` wrapper.

#### Month View "More Events" Tooltip Replaced with Popover

The month-view overflow indicator now renders a `Popover` instead of the legacy tooltip. All tooltip-specific class names have been renamed:

| Before | After |
|--------|-------|
| `.k-tooltip.k-scheduler-tooltip` | `.k-popover.k-scheduler-popover` |
| `.k-tooltip-title` | `.k-popover-header` |
| `.k-tooltip-events-container` / `.k-tooltip-events` | `.k-popover-events` |
| `.k-tooltip-event` | `.k-popover-event` |

If you have custom CSS targeting `.k-scheduler-tooltip` or its child classes, update them to the corresponding `.k-scheduler-popover` equivalents.

## Kendo UI 2026 Q2

### New Meridian Theme - Default Theme Moved to Maintenance

Starting with the **2026 Q2** release, a new theme called **Meridian** is introduced as the recommended default theme for all Kendo UI products. The previous Default theme is moved to **maintenance mode**.

- The Meridian theme is now the default theme used across all demos, documentation, and templates.
- The Default theme will continue to be available but will receive only critical bug fixes. No new features or visual updates will be added.
- Customers can migrate to the Meridian theme on their own schedule.
- This constitutes a major version bump for Kendo Themes due to visual breaking changes.

To switch to the Meridian theme, update your stylesheet reference:

```html
<!-- Before -->
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/13.0.0/default/default-main.css" />

<!-- After -->
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/14.0.0/meridian/meridian-main.css" />
```

### Kendo UI Icons Package Version

The **2026 Q2** release ships with Kendo UI Icons version **4.9.2** in the source package and wrappers. However, there is also Icons version **5.0.0** available, which includes new icons and updates aligned with the Meridian theme. Icons v5.0.0 is currently in preview mode in the demos and will be officially included in the source packages in an upcoming release.

> If you are referencing icons from the Kendo CDN or npm and want to stay aligned with the demos, you can use version 5.0.0. If you prefer to stay aligned with the distributed source, continue using version 4.9.2 until the next official update.

### Dialog and Window - themeColor Option Removed

The `themeColor` configuration option has been **entirely removed** from the Dialog and Window components. Previously available values (`primary`, `dark`, `light`, `none`) are no longer accepted.

**Before (2026 Q1 and earlier):**

```javascript
$("#dialog").kendoDialog({
    themeColor: "primary"
});

$("#window").kendoWindow({
    themeColor: "dark"
});
```

**After (2026 Q2 and later):**

```javascript
// themeColor is no longer a valid option
$("#dialog").kendoDialog({});

$("#window").kendoWindow({});
```

### Light and Dark Theme Colors Removed Globally

The `light` and `dark` values have been **removed** from the `themeColor` option across all components that previously supported them. This is a breaking change for consumers explicitly using `themeColor: "light"` or `themeColor: "dark"`.

#### Updated themeColor Value Sets Per Component

| Component | New Allowed themeColor Values |
|-----------|------------------------------|
| Button | `base`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `inverse` |
| FloatingActionButton | `base`, `primary`, `secondary`, `tertiary` |
| Icon / SVGIcon | `inherit`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `inverse` |
| Badge | `base`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error` |
| Loader | `base`, `primary`, `secondary`, `tertiary` |
| Avatar | `base`, `primary`, `secondary`, `tertiary` |
| AppBar | `base`, `primary`, `secondary`, `tertiary`, `inverse` |
| BottomNavigation | `base`, `primary`, `secondary`, `tertiary`, `inverse` |

**Migration:** Replace any usage of `themeColor: "light"` or `themeColor: "dark"` with the closest available value (for example, `"base"` or `"inverse"`).

### Button Size Option Type Change

The Button `size` option now accepts the additional value `"xsmall"` (rendered as `k-button-xs`). In the ASP.NET wrappers, the `Size` property enum type has changed from `ComponentSize` to `ButtonSize` to accommodate this new value. The `ComponentSize` enum does not include `XSmall`, so the new `ButtonSize` enum is used instead.

### New XS (Extra Small) Button Size

The Button component now supports an extra small size (`"xsmall"` / `"xs"`). This size is intended for use in complex, multi-layered components such as close buttons in component headers.

The following components now use XS-sized buttons internally:

- Dialog - close button
- Window - close, minimize, maximize buttons
- Chat - attachment actions, pinned toolbar close button, message actions, quick reply remove button, failed message retry button
- Upload - remove and retry buttons
- TabStrip - close button
- Timeline - card expand/collapse button
- Spreadsheet - sheet bar buttons

```javascript
$("#button").kendoButton({
    size: "xsmall"
});
```

### Caret Icons Replaced with Chevron Icons

The `caret-alt-down`, `caret-alt-up`, `caret-alt-left`, and `caret-alt-right` icons (and their SVG counterparts `caretAltDownIcon`, `caretAltUpIcon`, etc.) have been replaced with `chevron-down`, `chevron-up`, `chevron-left`, and `chevron-right` respectively across all components.

Similarly, `caret-double-alt-left` and `caret-double-alt-right` are replaced with their `chevron-double` equivalents.

> **Note:** `caret-alt-to-*`, `caret-alt-expand`, and sort indicator icons (`caretBl*`, `caretTr*`) remain unchanged.

#### Affected Components

| Component | Changed Icon(s) |
|-----------|------------------|
| SplitButton | Default `arrowButtonIcon` changed from `caret-alt-down` to `chevron-down` |
| SplitButton (Toolbar) | Default `arrowButtonSvgIcon` changed from `caretAltDownIcon` to `chevronDownIcon` |
| DropDownList, ComboBox, MultiColumnComboBox, DropDownTree | Dropdown arrow icon |
| DateInput, DateTimePicker, TimePicker | Navigation icons |
| NumericTextBox, Slider, ColorPicker | Spinner/navigation icons |
| Grid (group headers), TreeList | Expand/collapse icons |
| Scheduler, Gantt | Toolbar navigation icons |
| TabStrip, Splitter | Scroll/navigation icons |
| ListBox, Menu, Pager | Navigation icons |
| Spreadsheet, Toolbar | Various action icons |

If you have custom CSS or JavaScript targeting the old `caret-alt-*` icon class names, update them to the corresponding `chevron-*` names.

### Scheduler and Gantt - View Selector Markup Changed

The toolbar view selector in the Scheduler and Gantt components is now rendered with a **SegmentedControl** instead of a ButtonGroup. Custom CSS or DOM queries that targeted the previous ButtonGroup markup must be updated.

The DateTimePicker also now uses a SegmentedControl for its date/time toggle.

### Tooltip - New themeColor Option

The Tooltip component now supports a `themeColor` option. Available values are: `base`, `inverse`, `info`, `success`, `warning`, `error`.

```javascript
$("#tooltip").kendoTooltip({
    themeColor: "info"
});
```

### LoaderContainer - Overlay Class Changed

The LoaderContainer now uses the standard `k-overlay` CSS class instead of the deprecated `k-overlay-light` variant. The `k-overlay-{overlayColor}` classes have been removed.

If you have custom CSS targeting `k-overlay-light` on the LoaderContainer, update it to target `k-overlay`.

### PDFViewer - Loader Overlay Class Changed

The PDFViewer loader overlay now uses the standard `k-overlay` CSS class instead of `k-overlay-light`. Custom CSS targeting `k-overlay-light` on the PDFViewer loader will no longer apply.

### Icon Component - New fillMode Property

The Icon and SVGIcon components now support a `fillMode` property with the following values: `solid`, `outline`, `duotone`. The property applies a `k-{fillMode}` CSS class to the icon element.

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

>tip The ButtonGroup's [`items.badge.themeColor`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/buttongroup/configuration/items#itemsbadgethemecolor) no longer render default appearance classes as well. It defaults to `undefined` which enforces the theme to control the default color

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

 >tip Starting with **2026 Q1** version when no `type` parameter is passed the the [`show()`](/api/javascript/ui/notification/methods/show) method, the Notification will be displayed with default colors. Previously, the default value of the `type` property was `info`. If you need to acheive the previous behavior you can use the approaches demonstrated below:

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


### Virtual List Rendering Changes

Starting with the **2026 Q1** release, the Virtual List introduces changes to its HTML rendering.

| Aspect | Before (2025 and earlier) | After (2026 Q1 and later) |
|--------|--------------------------|---------------------------|
| List element class | `k-virtual-content k-list-ul` | `k-list-ul` |
| Grouped data | All group labels and items in a single `<ul>` | Separate `<ul>` per group, each with its own group label |

**Before:**

```html
<ul class="k-virtual-content k-list-ul">
    <li class="k-list-item-group-label">Group A</li>
    <li class="k-list-item">Item 1</li>
    <li class="k-list-item">Item 2</li>
    <li class="k-list-item-group-label">Group B</li>
    <li class="k-list-item">Item 3</li>
</ul>
```

**After:**

```html
<ul class="k-list-ul">
    <li class="k-list-item-group-label">Group A</li>
    <li class="k-list-item">Item 1</li>
    <li class="k-list-item">Item 2</li>
</ul>
<ul class="k-list-ul">
    <li class="k-list-item-group-label">Group B</li>
    <li class="k-list-item">Item 3</li>
</ul>
```

If you have custom CSS or jQuery selectors targeting `k-virtual-content`, update them to use `.k-list-ul`.

### MultiColumnComboBox Sticky Group Header Rendering Changes

Starting with the **2026 Q1** release, the MultiColumnComboBox component introduces a change to how the sticky group header is rendered when the data is grouped.

| Aspect | Before (2025 and earlier) | After (2026 Q1 and later) |
|--------|--------------------------|---------------------------|
| CSS class | `.k-list-group-sticky-header` | `.k-table-group-sticky-header` |
| Element | `<tr>` inside `<table>` | `<div>` outside `<table>` |

**Before:**

```html
<table class="k-table">
    <tr class="k-list-group-sticky-header">
        <td colspan="...">Group Name</td>
    </tr>
    <!-- table rows -->
</table>
```

**After:**

```html
<div class="k-table-group-sticky-header">Group Name</div>
<table class="k-table">
    <!-- table rows -->
</table>
```

If you have custom CSS or jQuery selectors targeting `.k-list-group-sticky-header` for the MultiColumnComboBox, update them to use `.k-table-group-sticky-header`:

```css
/* Before */
.k-multicolumncombobox .k-list-group-sticky-header { /* ... */ }

/* After */
.k-multicolumncombobox .k-table-group-sticky-header { /* ... */ }
```
