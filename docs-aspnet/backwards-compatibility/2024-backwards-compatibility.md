---
title: 2024 Releases
page_title: 2024 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2024."
slug: breakingchanges_2024
position: 1
---

# 2024 Releases

This article lists the breaking or important changes in the 2024 releases of {{ site.product }}.

## {{ site.product }} Q4 2024

### Kendo UI Themes

For a while, the [CSS Utilities](https://www.telerik.com/design-system/docs/utils/get-started/introduction/) were bundled with the Kendo UI themes. Starting with version Q4 2024, the CSS Utilities are no longer included in the [Kendo UI themes]({% slug sassbasedthemes_overview %}).
The Kendo UI theme stylesheet still contains all the necessary styles. However, in case you need to create an additional layout, dependent on the utility classes, you need to include the additional stylesheet `kendo-theme-utils.css`, which is available in the `styles` folder of the {{ site.product }} distribution and through the Kendo CDN service.

```LocalFiles
    <link rel="stylesheet" href="~/lib/kendo/styles/default-ocean-blue.css" />
    <link rel="stylesheet" href="~/lib/kendo/styles/kendo-theme-utils.css" />
```
```CDN
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-ocean-blue.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/utils/all.css"/>
```

{% if site.core %}
### Target Framework

With the Q4 2024 release, {{ site.product }} support for .NET 7 has been dropped as it has reached EOL on May 14, 2024. You can update to a supported [LTS and STS versions of .NET Core](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core#lifecycle).

### Checkbox

The `Rounded` configuration for the HTML Helpers now expects [`Kendo.Mvc.UI.Rounded`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui/rounded) enum instead of [`Kendo.Mvc.UI.BasicRounded`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui/basicrounded), exposing an additional `Full` option.

### PanelBar TagHelper

The `PanelBarItemBase(ViewContext)` constructor of the `PanelBarItemBase.cs` class is now obsolete. Use the parameterless constructo instead.

### Form TagHelper

The `Size` attribute now expects [`Kendo.Mvc.UI.ComponentSize`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui/componentsize) enum instead of a string.
{% endif %}

### Deprecated APIs

The `<WidgetName>.AsChildComponent()` method has been deprecated.

#### Content browsing APIs

The following interfaces, classes and their methods have been depreceted and removed from the `Kendo.Mvc` dll:

{% if site.mvc %}
| Component        | Class                      |
| -----------      | -----------                |
| Editor           | `DirectoryBrowser.cs`      |
| Editor           | `DirectoryPermission.cs`   |
| Editor           | `IDirectoryBrowser.cs`     |
| Editor           | `IDirectoryPermission.cs`  |
| Editor           | `FitImageResizer.cs`       |
| Editor           | `IImageResizer.cs`         |
| Editor           | `ImageResizer.cs`          |
| Editor           | `ImageSize.cs`             |
| Editor           | `IThumbnailCreator.cs`     |
| Editor           | `ThumbnailCreator.cs`      |
| FileManager      | `ContentBrowser.cs`        |
| FileManager      | `ContentPermission.cs`     |
| FileManager      | `IContentBrowser.cs`       |
| FileManager      | `IContentPermission.cs`    |
{% else %}
| Component        | Class                      |
| -----------      | -----------                |
| Editor           | `DirectoryBrowser.cs`      |
| Editor           | `DirectoryPermission.cs`   |
| Editor           | `IDirectoryBrowser.cs`     |
| Editor           | `IDirectoryPermission.cs`  |
| FileManager      | `ContentBrowser.cs`        |
| FileManager      | `ContentPermission.cs`     |
| FileManager      | `IContentBrowser.cs`       |
| FileManager      | `IContentPermission.cs`    |
{% endif %}

The code is moved to the demo application, where it is used for demo purposes only, demonstrating a possible implementation of the directory and file access functionality{% if site.mvc %}, and thumbnail creation{% endif %}. It is advisable to follow the best practices of your company/organisation when implementing the read/write access for the backend required for the above-listed components.

#### Editor APIs

| Old                            | New                              |
| -----------                    | -----------                      |
| `Editor.Messages.Styles()`     | [`Editor.Messages.Formatting()`](/api/kendo.mvc.ui.fluent/editormessagessettingsbuilder#formattingsystemstring)   |
| `Editor.Messages.FormatBlock()`| [`Editor.Messages.Formatting()`](/api/kendo.mvc.ui.fluent/editormessagessettingsbuilder#formattingsystemstring)   |
| `EditorToolFactory.FontColor()`| [`EditorToolFactory.ForeColor()`](/api/kendo.mvc.ui.fluent/editortoolfactory#forecolor)  |

#### TextArea APIs

| Old                            | New                              |
| -----------                    | -----------                      |
| `Resizable(String)`            | [`Resize(TextAreaResize)`](/api/kendo.mvc.ui.fluent/textareabuilder#resizekendomvcuitextarearesize)         |

### Class Changes in Components

**AIPrompt**

* The `k-button-flat-primary` class is now replaced with `k-button-flat-base` class.
* Added `k-prompt-view` and `k-prompt-popup`.

**ComboBox**

* The loading icon is now rendered as a separate `span` element with classes `k-input-loading-icon k-icon k-i-loading` before the button `k-input-button`.

**ContextMenu**

* The `k-widget` class is now removed.
* The `k-menu-expand-arrow-icon` class has also been removed.
* The `k-state-default` class is now removed.
* The text of menu items is now wrapped in a `span` element with the `k-menu-link-text` class

**DockManager**

* Buttons in the vertical toolbar are now size `k-button-sm`, instead of `k-button-md`.
* Unpinned pane has now class `k-pane-unpinned` instead of `k-pane-pinned`.
* Pin and close button of not active TabStrip Tabs now have `k-button-flat-primary`, instead of `k-button-flat-base`.

**DropDownList**

* The loading icon is now rendered as a separate `span` element with classes `k-input-loading-icon k-icon k-i-loading` before the button `k-input-button`.

**Grid**

* Added `k-button-icon.k-icon.k-svg-i-arrow-rotate-cw.k-svg-icon` to the refresh button in the pager.
* Added `k-drag-col` to the draggable of the grid.
* Added `k-filtercell-operator` div wrapper on the filter dropdown and clear button.
* Added `k-grid-add-row`.
* Added `k-table-group` class to `k-group-cell.k-table-group-td.k-table-td`.
* Added `k-input-icon`.
* Removed `k-label` class from extra class on `k-pager-info`.
* Removed `k-reorderable` class from `tbody` of a reorderable grid.
* Removed `k-editable` class.
* Use `k-grid-columnmenu-popup` instead of `k-columnmenu-popup`.

**GridLayout**

* The `k-widget` class has been removed.
* The `k-justify-content-` classes were substituted with `k-justify-items-`.

**ImageEditor**

* The `k-widget` class is now removed.
* The `k-imageeditor-pane-confirm-button` and `k-imageeditor-pane-button` classes have been removed from the resize/crop pane buttons.
* The `k-colspan-1` class is removed from the `k-col-span-1` element.
* The `k-colspan-2` class is removed from the `k-col-span-2` element.

**Map**

* The following classes have been substituted:

|Versions prior to 2024 Q4| Versions 2024 Q4 and later
|:---   |:---
|`k-navigator-up`| `k-navigator-n` |
|`k-navigator-right`| `k-navigator-e` |
|`k-navigator-down`| `k-navigator-s` |
|`k-navigator-left`| `k-navigator-w` |

* The `k-widget` class is now removed.
* The `km-widget` class has also been removed.
* Added `k-button-group-solid` class on the Zoom button group.

**Menu**

* The `k-vertical` class is removed from the scroll wrapper when the Menu is scrollable.
* The `k-horizontal` class is removed from the scroll wrapper when the Menu is scrollable.
* The `k-widget` is now removed.
* The `k-menu-expand-arrow-icon` is now removed.
* The `k-group` class has also been removed.
* With the latest theme changes the following classes of the scroll buttons are removed: `k-scroll-up`, `k-scroll-down`, `k-scroll-left`, `k-scroll-right`, `k-rounded`
* Changed `k-button-solid` to `k-button-flat` on the scroll buttons
* Changed `k-button-solid-base` to `k-button-flat-base` on the scroll buttons
* Added `k-menu-scroll-wrapper-vertical` to the `div.k-menu-scroll-wrapper` only when the orientation is vertical, not applicable for the horizontal orientation

**PanelBar**

* Removed wrong classes `k-level-0` and `k-panelbar-header` from child items.
* Removed duplicate class `k-panelbar-item` on items initialized via Items(), which are not k-level-0.
* Removed extra class `k-content` applied to `k-panelbar-content` div wrapper.

**PDFViewer**

* The PDFViewer starts using the [Pager](https://demos.telerik.com/{{ site.platform }}/pager/index) component internally and follows its specification. 
* Added `k-icon` class to the `k-dropzone-icon` in the center of the viewer.
* Added `k-toolbar-combobox` to the combobox for zoom options.
* Removed `k-widget`.
* Removed `k-zoom-in-out-group` on the zoom tools buttongroup.
* Removed `k-toggle-selection-group` on selection buttongroup. 

**PivotGridV2**

The following classes are now removed:

* The `k-pivotgrid-header-total` class rendered in the total row of PivotGrid aggregates is replaced by `k-pivotgrid-total`.
* The `k-grid-header-table` class is now removed.
* The `k-table-md` class is removed from the `.k-pivotgrid-table` tables.
* The `k-table-tbody` has been removed from the `.k-pivotgrid-tbody` elements.
* The `k-table-row` class is now removed from the `.k-pivotgrid-row` elements.
* The `k-grid-table` class has been removed from the `.k-pivotgrid-table` values table.
* The `k-table-th` has been removed from the `th.k-pivotgrid-cell` elements. 
* The `k-table-td` has been removed from the `td.k-pivotgrid-cell` elements. 
* The `k-pos-relative` and `k-widget` classes are now removed from the Configurator.
* The `k-rounded-full` class is substituted by `k-round-md`.
* Added `k-pivotgrid-expanded` on an expanded header.
* The text of a header is now rendered in a span element with `k-pivotgrid-header-title` class.
* The content of a cell is rendered in a span element with this `k-pivotgrid-content` class.
* The form in the configurator has `k-form-md` class added to its `k-form` class.
* Added `k-chip-more-action` class on the more action span in configurator chip.

**Scheduler**

* The following classes are substituted as follows:

|Versions prior to 2024 Q4| Versions 2024 Q4 and later
|:---   |:---
|`k-nav-today`| `[data-selector='today']`
|`k-nav-prev`| `[data-selector='previous']`
|`k-nav-next`| `[data-selector='next']`
|`k-view-month`| `[data-selector='month']`
|`k-view-week`| `[data-selector='week']`
|`k-view-day`| `[data-selector='day']`
|`k-view-agenda`| `[data-selector='agenda']`
|`k-view-timeline`| `[data-selector='timeline']`  
|`k-svg-i-arrow-left`| `k-i-caret-alt-left`
|`k-svg-i-arrow-right`| `k-i-caret-alt-right`

* The `k-button-rectangle` is removed from the buttons in views ButtonGroup.
* The`k-heading-cell` is removed from the Scheduler first column. 
* The `k-scheduler-table-auto` is removed from the Month view.
* The `k-scheduler-group-cell` is removed from grouped Scheduler.
* Added `k-scheduler-navigation` class to Today, Previous and Next buttongroup.
* Added `k-scheduler-views` class to views buttongroup.
* Added `k-scheduler-cell` class to Weekview, dayview, timelineview.
* Added `k-group-cell` class.
* Removed `k-event-top-actions` element from scheduler events.
* Removed `k-event-bottom-actions` element from scheduler events
* Removed `k-last` from inappropriate scenarios.
* Replaced `k-svg-i-arrow-` classes of Prev and Next buttons in RTL Scheduler with `k-svg-i-caret-alt`.

**Splitter**

The Splitter has received a rendering update. As a result, the below classes have been added:

* New `k-splitter-flex` and `k-splitter-vertical/horizontal` classes have been added to the `k-splitter` root `div` element.
* New `k-pane-static` class has been added to the non-resizable panes.
* New `k-hidden` class has been added to the collapsed panes.

Apart from that, we made changes in the positioning styles of the component. Until now, the panes had the `position:absolute` style. As of the 2024 Q4 release, the panes are positioned using flexbox.

**Spreadsheet**

* The tabs in the Spreadsheet are now rendered via [`Kendo Menu`](/api/javascript/ui/menu) instead of a [`Kendo TabStrip`](/api/javascript/ui/tabstrip).
* The rendering of the SheetsBar at the bottom is unified with the rendering of a [`Kendo UI TabStrip`](/api/javascript/ui/tabstrip).
* The `Add New Sheet` tool in the SheetsBar is now created from `<button>` element instead of `<a role="button"\>`.
* The `Quick Access` section in the top toolbar is removed and the `Undo` and `Redo` buttons are moved in the Home tab.
* The tools in the toolbar are now splitted into six separate tabs - File, Home, Insert, Format, Data and View.
* Replaced `k-icon k-i-undo` with `k-icon k-i-reset`.
* Replaced `k-icon k-i-redo` with `k-icon k-i-reload`.
* Default values for `RowHeight` and `HeaderHeight` were set to 30 pixels.

**StackLayout**

* The `k-widget` class has been removed.

**TabStrip**

* The `k-widget` class has been removed.
* The `k-tabstrip-item` class has been removed.
* The `k-tab-on-top` class has been removed.
* The `k-content` class has been removed.
* `k-link-text` is added.

**ToolBar**

* The following classes have been replaced or removed:

|Versions prior to 2024 Q4| Versions 2024 Q4 and later
|:---   |:---
|`k-toolbar-tool`| `[data-item-role='toolbar-tool']`

* The `k-toolbar-toggle-button` class has been removed.
* The `k-dropdown-button` class has also been removed.

This change is applied to all components that use the Toolbar internally, such as Grid, Gantt, Scheduler, etc.

**TreeList**

* The `k-i-none` class has been replaced with `ref-blank-icon` attribute.
* The `k-grid-display-block` class is now removed from `.k-treelist` element.
* Added `k-drag-col` to the col element for draggable column both in the header table and the body table.


## {{ site.product }} Q2 2024

### Target Framework

{% if site.core %}
As of the Q2 2024 release, {{ site.product }} supports only [LTS and STS versions of .NET Core](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core#lifecycle). You can update to a supported .NET Core version.
{% else %}
As of the Q2 2024 release, {{ site.product }} supports .NET Framework 4.6.2 and later versions. You can update to a [supported .NET Framework version](https://learn.microsoft.com/en-us/lifecycle/products/microsoft-net-framework).

**Telerik.Web.Captcha**
As of the Q2 2024 release, the `Telerik.Web.Captcha` package targets .NET Framework 4.6.2

**Telerik.Web.Spreadsheet**
As of the Q2 2024 release, the `Telerik.Web.Spreadsheet` package targets .NET Framework 4.6.2

**Kendo.Mvc.Export**
As of the Q2 2024 release, the `Kendo.Mvc.Export.dll` assembly targets .NET Framework 4.6.2
{% endif %}

### Chart

The default [`Theme`](/api/kendo.mvc.ui.fluent/chartbuilder#themesystemstring) configuration for the {{ site.product }} Charts is changed to `sass`. By default, the [Chart theme]({% slug htmlhelpers_charts_appearance_aspnetcore %}#sass-themes) will now match the loaded [Sass-based theme]({% slug sassbasedthemes_overview %}).

## {{ site.product }} Q1 2024

**Deprecated Controllers**

As of the Q1 2024 release, the following controllers will be deprecated.

* FileManager&mdash;`ContentProviderController`
* Editor&mdash;`EditorImageBrowserController`, `FileBrowserController`, `EditorFileBrowserController`

**Deprecated Interfaces**

As of the Q1 2024 release, the following interfaces will be deprecated.

* FileManager&mdash;`IContentProviderController`
* Editor&mdash;`IFileBrowserController`, `IImageBrowserController`

**Deprecated APIs**

As of the Q1 2024 release, the following APIs will be deprecated.


{% if site.core %}
* `ChartSeriesBuilder.Type(string)`

    ```Deprecated
        .Series(series => series
             .Bar(new double[] { 3.907 })
             .Type("bar")
        )
    ```
    ```Alternative
        .Series(series => series
           .Bar(new double[] { 3.907 }) // Type is determined by the declared Series builder.
        )
    ```

* `ChartSeriesLineSettingsBuilder.Width(string)`, `ChartSeriesLineSettingsBuilder.Style(ChartAreaStyle)`,
`ChartSeriesLineSettingsBuilder.Style(ChartPolarAreaStyle)`,
`ChartSeriesLineSettingsBuilder.Style(ChartRadarAreaStyle)`

    ```Deprecated
        .Series(series => series
           .Bar(new double[] { 3.907 })
           .Line(line => line
                   .Width("100px")
                   .Style(ChartAreaStyle.Normal)
                   .Style(ChartPolarAreaStyle.Normal)
                   .Style(ChartRadarAreaStyle.Normal)
           )
        )
    ```
    ```Alternative
        .Series(series => series
           .Bar(new double[] { 3.907 })
           .Line(line => line
                   .Width(100)
                   .Style(ChartSeriesLineStyle.Normal)
           )
        )
    ```

* `ChartSeriesOverlaySettingsBuilder.Gradient`

    ```Deprecated
        .Series(series => series
           .Bar(new double[] { 3.907 })
           .Overlay(overlay => overlay.Gradient(ChartBarGradient.Glass))
        )
    ```
    ```Alternative
        .Series(series => series
           .Bar(new double[] { 3.907 })
           .Overlay(overlay => overlay.Gradient(ChartSeriesGradient.Glass))
        )
    ```

* `SplitterEventBuilder.LayoutChange`

    ```Deprecated
        .Events(events => events
           .LayoutChange("change")
           .LayoutChange(@<text>function () { return; }</text>)
        )
    ```
    ```Alternative
        .Events(events => events
           .Render("change")
           .Render(@<text>function () { return; }</text>)
        )
    ```

{% else %}


* `ChartSeriesBuilderBase.GroupNameTemplate`

    ```Deprecated
        .Series(series => series.Bar(s => s.Sales)
            .Name("Sales")
            .GroupNameTemplate("#= series.name # for #= group.field #   #=    group.value #")
        )
    ```
    ```Alternative
        .Series(series => series.Bar(s => s.Sales)
            .Name("#= series.name # for #= group.field #   #=    group.value #")
        )
    ```

* `EditorMessages.FormatBlock`, `EditorMessages.Styles`
    ```Deprecated
        .Messages(messages => messages
            .FormatBlock("Format")
            .Styles("Style")
        )
    ```
    ```Alternative
        .Messages(messages => messages
               .Formatting("Format")
               .Style("Style")
        )
    ```

{% endif %}

{% if site.core %}

**Deprecated Extensions**

* `ApplicationBuilderExtensions`

{% endif %}
