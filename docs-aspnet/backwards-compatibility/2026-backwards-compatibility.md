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

## {{ site.product }} 2026 Q3

### New SummarizeAfter behavior for MultiSelect

Starting with the **2026 Q3** release, the default value of the MultiSelect `SummarizeAfter` configuration is `10`. When users select more than 10 items, the first 10 tags are displayed and the remaining selections are summarized in an overflow tag.

To retain the previous behavior and render every selected item as an individual tag, set `SummarizeAfter` to `null`.

```HtmlHelper
@(Html.Kendo().MultiSelect()
    .Name("multiselect")
    .SummarizeAfter(null)
)
```

{% if site.core %}
```TagHelper
<kendo-multiselect name="multiselect" summarize-after="@((double?)null)"></kendo-multiselect>
```
{% endif %}

### Document Processing and Spreadsheet Package Changes

The following package versions apply:

| Package | Version | Notes |
|---------|---------|-------|
| [Telerik.Spreadsheet.Web](https://www.nuget.org/packages/Telerik.Spreadsheet.Web) | `1.2.0` | Spreadsheet server-side processing package |
| [Telerik.Pdf.Web](https://www.nuget.org/packages/Telerik.Pdf.Web) | `1.2.0` | Required for Telerik UI for ASP.NET Core PDFViewer and Telerik UI for ASP.NET MVC PDFViewer when using Document Processing-based PDF support |
| [Telerik.Export.Core](https://www.nuget.org/packages/Telerik.Export.Core) | `1.2.0` | Enables exporting `IEnumerable` data sources to Excel, CSV, PDF, DOCX, RTF, and TXT |

#### Spreadsheet Assembly Renamed

The Spreadsheet dependency assembly has been renamed from `Telerik.Web.Spreadsheet` to `Telerik.Spreadsheet.Web`.

#### PDF Processing Package Renamed

The PDF processing dependency package has been renamed from `Telerik.Web.PDF` to `Telerik.Pdf.Web`.

#### Server-Side Export Package Renamed

The server-side export dependency package has been renamed from `Telerik.Core.Export` to `Telerik.Export.Core`.

#### Migration

- Update project references from `Telerik.Web.Spreadsheet` to `Telerik.Spreadsheet.Web`.
- Add the [Telerik.Spreadsheet.Web](https://www.nuget.org/packages/Telerik.Spreadsheet.Web) package explicitly to projects that use Spreadsheet server-side import, export, or processing features.
- Replace `Telerik.Web.PDF` with [Telerik.Pdf.Web](https://www.nuget.org/packages/Telerik.Pdf.Web) in applications that use PDFViewer Document Processing integration.
- Replace `Telerik.Core.Export` with [Telerik.Export.Core](https://www.nuget.org/packages/Telerik.Export.Core) in applications that use server-side export helpers.

Applications that still reference the old assembly or package names must update their project references to restore Spreadsheet, PDF processing, or export functionality.

### Accessibility Package Adoption Rendering Changes

Starting with the **2026 Q3** release, several components adopt the new accessibility package. As a result, their rendered HTML structure and CSS class hooks change to align with the updated accessibility implementation.

If your application uses custom CSS, DOM queries, snapshot tests, or automation that target the previous markup, review the following changes and update those integrations accordingly. The {{ site.product }} wrappers render the underlying Kendo UI for jQuery components, so these markup changes apply to wrapper scenarios as well.

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

#### Edit Dialog Uses Dialog Instead of Window

The Scheduler edit dialog now uses a `Dialog` component instead of a `Window`. The `Window` configuration method on the Scheduler's `Editable` settings now accepts `Action<DialogBuilder>` instead of `Action<WindowBuilder>`.

**Before (2026 Q2 and earlier):**

```HtmlHelper
@(Html.Kendo().Scheduler<TaskViewModel>()
    .Name("scheduler")
    .Editable(e => e.Window(w => w
        .Title("Edit Event")
        .Width(600)
        .Height(400)
        .Draggable()
        .Resizable()
    ))
)
```

{% if site.core %}
```TagHelper
<kendo-scheduler name="scheduler">
    <editable>
        <editable-window title="Edit Event" width="600" height="400" draggable="true" resizable="true" />
    </editable>
</kendo-scheduler>
```
{% endif %}

**After (2026 Q3 and later):**

```HtmlHelper
@(Html.Kendo().Scheduler<TaskViewModel>()
    .Name("scheduler")
    .Editable(e => e.Window(w => w
        .Title("Edit Event")
        .Width("600px")
        .Modal(m => m.Enabled(true))
    ))
)
```

{% if site.core %}
```TagHelper
<kendo-scheduler name="scheduler">
    <editable>
        <editable-window title="Edit Event" width="600px">
            <modal enabled="true" />
        </editable-window>
    </editable>
</kendo-scheduler>
```
{% endif %}

The `Window` method name and `<editable-window>` tag name are preserved for backward compatibility, but the configurator now exposes `DialogBuilder` options instead of `WindowBuilder` options.

**New `DialogBuilder` options available:**

- `Actions` &ndash; configures the dialog action buttons
- `ButtonLayout` &ndash; sets the layout of the action buttons (`Normal`, `Stretched`)
- `Closable` &ndash; whether the dialog shows a close button
- `Modal` &ndash; configures the modal overlay settings
- `Size` &ndash; sets the dialog size (`Small`, `Medium`, `Large`)
- `Content` &ndash; sets the dialog content
- `Visible` &ndash; controls initial visibility
- `Messages` &ndash; configures the dialog messages

**Previous `WindowBuilder` options no longer available:**

- `Draggable` &ndash; the dialog is not draggable
- `Resizable` &ndash; the dialog is not resizable
- `Pinned` &ndash; no pinned mode
- `AppendTo` &ndash; no custom append target
- `LoadContentFrom` &ndash; no remote content loading
- `Position` &ndash; no custom positioning
- `Actions` (window-style) &ndash; the title bar action buttons (`Minimize`, `Maximize`, `Close`) are replaced by dialog action buttons

#### Month View "More Events" Tooltip Replaced with Popover

The month-view overflow indicator now renders a `Popover` instead of the legacy tooltip. All tooltip-specific class names have been renamed:

| Before | After |
|--------|-------|
| `.k-tooltip.k-scheduler-tooltip` | `.k-popover.k-scheduler-popover` |
| `.k-tooltip-title` | `.k-popover-header` |
| `.k-tooltip-events-container` / `.k-tooltip-events` | `.k-popover-events` |
| `.k-tooltip-event` | `.k-popover-event` |

If you have custom CSS targeting `.k-scheduler-tooltip` or its child classes, update them to the corresponding `.k-scheduler-popover` equivalents.

## {{ site.product }} 2026 Q2

### New Meridian Theme - Default Theme Moved to Maintenance

Starting with the **2026 Q2** release, a new theme called **Meridian** is introduced as the recommended default theme for all {{ site.product }} products. The previous Default theme is moved to **maintenance mode**.

- The Meridian theme is now the default theme used across all demos, documentation, and templates.
- The Default theme will continue to be available but will receive only critical bug fixes. No new features or visual updates will be added.
- Customers can migrate to the Meridian theme on their own schedule.
- This constitutes a major version bump for Kendo Themes due to visual breaking changes.

### Kendo UI Icons Package Version

The **2026 Q2** release ships with Kendo UI Icons version **4.9.2** in the source package and wrappers. However, there is also Icons version **5.0.0** available, which includes new icons and updates aligned with the Meridian theme. Icons v5.0.0 is currently in preview mode in the demos and will be officially included in the source packages in an upcoming release.

> If you are referencing icons from the Kendo CDN or npm and want to stay aligned with the demos, you can use version 5.0.0. If you prefer to stay aligned with the distributed source, continue using version 4.9.2 until the next official update.

### Dialog and Window - ThemeColor Option Removed

The `ThemeColor` configuration option has been **entirely removed** from the Dialog and Window components. The `ThemeColor` property and its associated `DialogThemeColor` / `WindowThemeColor` types are no longer available.

**Before (2026 Q1 and earlier):**

```HtmlHelper
@(Html.Kendo().Dialog()
    .Name("dialog")
    .ThemeColor("primary")
)

@(Html.Kendo().Window()
    .Name("window")
    .ThemeColor("dark")
)
```

{% if site.core %}
```TagHelper
<kendo-dialog name="dialog" theme-color="primary"></kendo-dialog>
<kendo-window name="window" theme-color="dark"></kendo-window>
```
{% endif %}

**After (2026 Q2 and later):**

```HtmlHelper
@(Html.Kendo().Dialog()
    .Name("dialog")
)

@(Html.Kendo().Window()
    .Name("window")
)
```

{% if site.core %}
```TagHelper
<kendo-dialog name="dialog"></kendo-dialog>
<kendo-window name="window"></kendo-window>
```
{% endif %}

### Light and Dark Theme Colors Removed Globally

The `Light` and `Dark` values have been **removed** from the `ThemeColor` option across all components that previously supported them. This is a breaking change for consumers explicitly setting `ThemeColor` to `Light` or `Dark`.

#### Updated ThemeColor Value Sets Per Component

| Component | New Allowed ThemeColor Values |
|-----------|------------------------------|
| Button | `Base`, `Primary`, `Secondary`, `Tertiary`, `Info`, `Success`, `Warning`, `Error`, `Inverse` |
| FloatingActionButton | `Base`, `Primary`, `Secondary`, `Tertiary` |
| Icon / SVGIcon | `Inherit`, `Primary`, `Secondary`, `Tertiary`, `Info`, `Success`, `Warning`, `Error`, `Inverse` |
| Badge | `Base`, `Primary`, `Secondary`, `Tertiary`, `Info`, `Success`, `Warning`, `Error` |
| Loader | `Base`, `Primary`, `Secondary`, `Tertiary` |
| Avatar | `Base`, `Primary`, `Secondary`, `Tertiary` |
| AppBar | `Base`, `Primary`, `Secondary`, `Tertiary`, `Inverse` |
| BottomNavigation | `Base`, `Primary`, `Secondary`, `Tertiary`, `Inverse` |

**Migration:** Replace any usage of `ThemeColor.Light` or `ThemeColor.Dark` with the closest available value (for example, `ThemeColor.Base` or `ThemeColor.Inverse`).

### Enum Type Changes

The following enum type changes have been made in the {{ site.product }} wrappers. Components that previously used the generic `ThemeColor` enum now use component-specific enums with restricted value sets (removing `Light` and `Dark`). Similarly, the Button `Size` property now uses a dedicated `ButtonSize` enum.

| Component | Property | Previous Enum Type | New Enum Type | New Allowed Values |
|-----------|----------|--------------------|---------------|--------------------|
| Avatar | ThemeColor | `ThemeColor` | `AvatarThemeColor` | `Base`, `Primary`, `Secondary`, `Tertiary` |
| Button | Size | `ComponentSize` | `ButtonSize` | `XSmall`, `Small`, `Medium`, `Large` |
| FloatingActionButton | ThemeColor | `ThemeColor` | `FloatingActionButtonThemeColor` | `Base`, `Primary`, `Secondary`, `Tertiary` |
| AppBar | ThemeColor | `ThemeColor` | `AppBarThemeColor` | `Base`, `Primary`, `Secondary`, `Tertiary`, `Inverse` |
| BottomNavigation | ThemeColor | `ThemeColor` | `BottomNavigationThemeColor` | `Base`, `Primary`, `Secondary`, `Tertiary`, `Inverse` |

#### Migration

**Before (2026 Q1 and earlier):**

```csharp
@(Html.Kendo().Avatar()
    .Name("avatar")
    .ThemeColor(ThemeColor.Primary)
)

@(Html.Kendo().Button()
    .Name("btn")
    .Size(ComponentSize.Small)
)
```

**After (2026 Q2 and later):**

```csharp
@(Html.Kendo().Avatar()
    .Name("avatar")
    .ThemeColor(AvatarThemeColor.Primary)
)

@(Html.Kendo().Button()
    .Name("btn")
    .Size(ButtonSize.Small)
)
```

### New XS (Extra Small) Button Size

The Button component now supports an extra small size (`XSmall`). This size is intended for use in complex, multi-layered components such as close buttons in component headers.

```HtmlHelper
@(Html.Kendo().Button()
    .Name("btn")
    .Content("Close")
    .Size(ButtonSize.XSmall)
)
```

{% if site.core %}
```TagHelper
<kendo-button name="btn" size="ButtonSize.XSmall">Close</kendo-button>
```
{% endif %}

### Caret Icons Replaced with Chevron Icons

The `caret-alt-down`, `caret-alt-up`, `caret-alt-left`, and `caret-alt-right` icons have been replaced with `chevron-down`, `chevron-up`, `chevron-left`, and `chevron-right` respectively across all components. This includes the SplitButton default arrow icon.

If you have custom CSS or JavaScript targeting the old `caret-alt-*` icon class names, update them to the corresponding `chevron-*` names.

### Scheduler and Gantt - View Selector Markup Changed

The toolbar view selector in the Scheduler and Gantt components is now rendered with a **SegmentedControl** instead of a ButtonGroup. Custom CSS or DOM queries that targeted the previous ButtonGroup markup must be updated.

The DateTimePicker also now uses a SegmentedControl for its date/time toggle.

### LoaderContainer - Overlay Class Changed

The LoaderContainer now uses the standard `k-overlay` CSS class instead of the deprecated `k-overlay-light` variant. The `k-overlay-{overlayColor}` classes have been removed.

If you have custom CSS targeting `k-overlay-light` on the LoaderContainer, update it to target `k-overlay`.

### PDFViewer - Loader Overlay Class Changed

The PDFViewer loader overlay now uses the standard `k-overlay` CSS class instead of `k-overlay-light`. Custom CSS targeting `k-overlay-light` on the PDFViewer loader will no longer apply.

### Icon Component - New FillMode Property

The Icon and SVGIcon components now support a `FillMode` property with the following values: `Solid`, `Outline`, `Duotone`.

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

### TabStrip Rendering Changes (HTML and CSS)

Starting with the **2026 Q1** release, the TabStrip no longer renders the `k-item` class on tab items. Tab elements now use `k-tabstrip-item` as the primary class.

#### Key HTML Structure Changes

**Tab item class removed**

Before: Tab items rendered both classes:

- `k-item`
- `k-tabstrip-item`

After: Tab items render only:

- `k-tabstrip-item`

If you have custom CSS or jQuery selectors targeting `.k-item` inside TabStrip, replace them with `.k-tabstrip-item`.

Example:

```html
<!-- Before -->
<li class="k-item k-tabstrip-item k-active">Tab 1</li>

<!-- After -->
<li class="k-tabstrip-item k-active">Tab 1</li>
```

**State selectors update**

Before: State selectors often targeted `.k-item`.

After: State selectors should target `.k-tabstrip-item`.

Update any custom selectors accordingly, for example:

```css
/* Before */
.k-tabstrip .k-item.k-active {
    /* ... */
}

/* After */
.k-tabstrip .k-tabstrip-item.k-active {
    /* ... */
}
```

**Sortable integration selectors**

If you use Sortable to reorder TabStrip tabs, update the Sortable `filter` selector from `li.k-item` to `li.k-tabstrip-item`.

```js
// Before
filter: "li.k-item"

// After
filter: "li.k-tabstrip-item"
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

>tip The ButtonGroup's `Items.Badge.ThemeColor` no longer render default appearance classes as well. It defaults to `undefined` which enforces the theme to control the default color

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

> tip Starting with **2026 Q1** version when no `type` parameter is passed the the [`show()`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/notification/methods/show) method, the Notification will be displayed with default colors. Previously, the default value of the `type` property was `info`. If you need to acheive the previous behavior you can use the approaches demonstrated below:

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
